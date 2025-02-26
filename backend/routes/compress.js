import express from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const router = express.Router();
const upload = multer({ dest: "backend/uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



router.post("/", upload.single("pdfFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required." });
    }

    const inputFilePath = path.join(req.file.path);
    const outputFilePath = path.join(__dirname, "../uploads/compressed.pdf");

    try {
        console.log("Starting PDF compression...");
        console.log("Input file:", inputFilePath);
        console.log("Output file:", outputFilePath);

        const pythonProcess = spawn("python", ["backend/services/compresspdf.py", inputFilePath, outputFilePath]);

        pythonProcess.stdout.on("data", (data) => {
            console.log(`Python output: ${data}`);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python error: ${data}`);
        });

        pythonProcess.on("close", async (code) => {
            console.log("Python process exited with code:", code);
            if (code !== 0) {
                return res.status(500).json({ message: "PDF compression failed." });
            }

            res.download(outputFilePath, "compressed.pdf", async (err) => {
                if (err) {
                    console.error("Download error:", err);
                } else {
                    console.log("File successfully downloaded. Cleaning up...");
                    await fs.unlink(inputFilePath);
                    await fs.unlink(outputFilePath);
                }
            });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
