import express from "express";
import cors from "cors";
import splitRoutes from "./routes/split.js";
import pdftowordroutes from "./routes/pdftoword.js"
import pdftopptRoutes from "./routes/pdftoppt.js";
import pdftoexcelRoutes from "./routes/pdftoexcel.js";
import mergeroutes from "./routes/merge.js";
import compressroutes from "./routes/compress.js";
import lockroutes from "./routes/lock.js";
import unlockroutes from "./routes/unlock.js";
import wordtopdfroutes from "./routes/wordtopdf.js";
import exceltopdfroutes from "./routes/exceltopdf.js";  
import ppttopdfroutes from "./routes/ppttopdf.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url); //server.js
const __dirname = path.dirname(__filename); //backend
const frontendPath = path.join(__dirname, "../frontend"); //frontend
app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));
app.use(express.static(path.join(frontendPath, "css")));
app.use(express.static(path.join(frontendPath, "js")));
app.use(express.static(path.join(frontendPath, "images")));


app.use("/api/split", splitRoutes);
app.use("/api/pdftoword",pdftowordroutes);
app.use("/api/pdftoppt", pdftopptRoutes);
app.use("/api/pdftoexcel", pdftoexcelRoutes);
app.use("/api/merge", mergeroutes);
app.use("/api/compress", compressroutes);
app.use("/api/lock", lockroutes);
app.use("/api/unlock", unlockroutes);
app.use("/api/wordtopdf", wordtopdfroutes);
app.use("/api/exceltopdf", exceltopdfroutes);
app.use("/api/ppttopdf", ppttopdfroutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "index.html"));
});

app.get("/index", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "index.html"));
});

app.get("/header", (req, res) => {
    res.sendFile(path.join(frontendPath, "components", "header.html"));
});


app.get("/navbar", (req, res) => {
    res.sendFile(path.join(frontendPath, "components", "navbar.html"));
});

app.get("/style", (req, res) => {
    res.sendFile(path.join(frontendPath, "css", "style.css"));
});

app.get("/compress", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "compress.html"));
});

app.get("/merge", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "merge.html"));
});

app.get("/split", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "split.html"));
});

app.get("/pdftoword", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "pdftoword.html"));
});

app.get("/pdftoppt", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "pdftoppt.html"));
});

app.get("/pdftoexcel", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "pdftoexcel.html"));
});
app.get("/lock", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "lock.html"));
});
app.get("/unlock", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "unlock.html"));
});
app.get("/wordtopdf", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "wordtopdf.html"));
});
app.get("/exceltopdf", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "exceltopdf.html"));
});
app.get("/ppttopdf", (req, res) => {
    res.sendFile(path.join(frontendPath, "pages", "ppttopdf.html"));
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
