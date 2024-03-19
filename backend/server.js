import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.listen(port, () => {
    console.log(`Dev Server listening at http://localhost:${port}`);
});
