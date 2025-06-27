const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/kev', async (req, res) => {
  try {
    const response = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CISA KEV catalog' });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`)); 