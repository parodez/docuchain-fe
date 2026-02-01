const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, "uploads");
const publicDir = path.join(__dirname, "public");

// create folders if missing
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

// ✅ SERVE MOBILE PAGE + UPLOADS
app.use(express.static(publicDir));         // serves /mobile.html
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadsDir),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileUrl = `/uploads/${req.file.filename}`;
  io.to(sessionId).emit("image_uploaded", { fileUrl });

  res.json({ ok: true, fileUrl });
});

io.on("connection", (socket) => {
  socket.on("join", (sessionId) => socket.join(sessionId));
});

server.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
  console.log("✅ Mobile page: http://localhost:5000/mobile.html");
});
