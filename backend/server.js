const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 5000;

app.get('/api', (req, res) => {
  res.json({ message: 'backend message' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
