const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/search', (req, res) => {
  const { name, city, address } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'يرجى إدخال الاسم على الأقل' });
  }

  const locationQuery = [city, address].filter(Boolean).join(' ');
  const fullQuery = locationQuery ? `${name} ${locationQuery}` : name;

  const fbPeopleUrl = `https://www.facebook.com/search/people/?q=${encodeURIComponent(fullQuery)}`;
  const googleFbUrl = `https://www.google.com/search?q=${encodeURIComponent(`site:facebook.com "${name}" "${city || ''}"`)}`;

  res.json({
    success: true,
    query: fullQuery,
    links: {
      facebook: fbPeopleUrl,
      google: googleFbUrl
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
