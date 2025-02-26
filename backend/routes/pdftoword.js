import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Store uploaded files in backend/uploads
const upload = multer({ dest: "backend/uploads/" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //routes

router.post("/", upload.single("pdfFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required." });
    }

    let inputFilePath = path.join(req.file.path); // Full path to the uploaded file
    let outputFilePath = path.join(__dirname, "../uploads/converted.docx");

    // Spawn the Python process to convert Word to PDF
    const pythonProcess = spawn("python", ["backend/services/pdftoword.py", inputFilePath, outputFilePath]);

    pythonProcess.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", () => {
        // Send the converted PDF file to the client
        res.download(outputFilePath, "converted.docx", () => {
            fs.unlinkSync(inputFilePath);  
            fs.unlinkSync(outputFilePath); 
        });
    });
});

export default router;
