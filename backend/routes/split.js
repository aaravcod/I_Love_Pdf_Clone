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
    if (!req.file || !req.body.pages) {
        return res.status(400).json({ message: "File and pages required." });
    }
    let inputFilePath = path.join(req.file.path); // Full path to the uploaded file
    let pages = req.body.pages;
    let outputFilePath = path.join(__dirname, "../uploads/split.pdf");
    const pythonProcess = spawn("python", ["backend/services/split.py", inputFilePath, pages]);

    pythonProcess.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", () => {
        // Send the split PDF file to the client
        res.download(outputFilePath, "split.pdf", () => {
            fs.unlinkSync(inputFilePath);  
            fs.unlinkSync(outputFilePath); 
        });
    });
});

export default router;
