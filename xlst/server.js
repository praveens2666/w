import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve the XML + XSL files
app.use('/xslt', express.static(join(__dirname, 'xslt')));

// Default route
app.get('/', (req, res) => {
  res.send(`<h2>Visit <a href="/xslt/student.xml">Student XML</a> to see XSLT transformation</h2>`);
});

app.listen(port, () => {
  console.log(`✅ Server running at: http://localhost:${port}`);
});
