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

router.post("/", upload.array("pdfFiles", 10), async (req, res) => {
    if (!req.files || req.files.length < 2) {
        return res.status(400).json({ message: "At least two PDF files are required." });
    }

    let inputFiles = req.files.map(file => file.path); // Get paths of uploaded PDFs
    let outputFilePath = path.join(__dirname, "../uploads/merged.pdf");

    try {
        const pythonProcess = spawn("python", ["backend/services/mergepdf.py", ...inputFiles, outputFilePath]);

        pythonProcess.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on("close", async (code) => {
            if (code !== 0) {
                return res.status(500).json({ message: "PDF merge failed." });
            }

            res.download(outputFilePath, "merged.pdf", async (err) => {
                if (!err) {
                    await Promise.all(inputFiles.map(file => fs.unlink(file))); // Delete uploaded PDFs
                    await fs.unlink(outputFilePath); // Delete merged PDF after download
                }
            });
        });

    } catch (error) {
        console.error("Error merging PDFs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
