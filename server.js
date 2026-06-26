const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from root directory
app.use(express.static(__dirname));

// Fallback jika halaman tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Portofolio berjalan lokal di: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
