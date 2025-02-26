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

router.post("/", upload.single("wordFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required." });
    }

    const inputFilePath = path.join(req.file.path);
    const outputFilePath = path.join(__dirname, "../uploads/converted.pdf");

    // Call the Python script for Word to PDF
    const pythonProcess = spawn("python", ["backend/services/wordtopdf.py", inputFilePath, outputFilePath]);

    pythonProcess.stdout.on("data", (data) => console.log(`stdout: ${data}`));
    pythonProcess.stderr.on("data", (data) => console.error(`stderr: ${data}`));

    pythonProcess.on("close", () => {
        res.download(outputFilePath, "converted.pdf", () => {
            fs.unlinkSync(inputFilePath);
            fs.unlinkSync(outputFilePath);
        });
    });
});

export default router;
