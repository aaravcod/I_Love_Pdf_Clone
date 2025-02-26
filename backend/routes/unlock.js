import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const upload = multer({ dest: "backend/uploads/" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/", upload.single("pdfFile"), (req, res) => {
    try {
        if (!req.file || !req.body.password) {
            return res.status(400).json({ error: "Missing file or password." });
        }

        const password = req.body.password;
        const inputPath = path.join(req.file.path);
        const outputPath = path.join(__dirname, "../uploads/unlocked.pdf");

        // Spawn a Python process to unlock the PDF
        const pythonProcess = spawn("python", [
            "backend/services/unlock.py",
            inputPath,
            outputPath,
            password
        ]);

        pythonProcess.stdout.on("data", (data) => {
            console.log(`Python stdout: ${data}`);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python stderr: ${data}`);
        });

        pythonProcess.on("error", (err) => {
            console.error("Failed to start Python process:", err);
            return res.status(500).json({ error: "Failed to run Python script." });
        });

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                res.download(outputPath, "unlocked.pdf", (err) => {
                    if (err) console.error("Error sending file:", err);
                    fs.unlinkSync(inputPath);
                    fs.unlinkSync(outputPath);
                });
            } else {
                res.status(500).json({ error: "Failed to unlock PDF." });
            }
        });

    } catch (error) {
        console.error("Error unlocking PDF:", error);
        res.status(500).json({ error: "Error processing file." });
    }
});

export default router;
