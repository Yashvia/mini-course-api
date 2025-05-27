const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'modules.json';

app.use(bodyParser.json());

// Load modules from file or create empty object
const loadModules = () => {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save modules to file
const saveModules = (modules) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(modules, null, 2));
};

// GET /modules → return all modules
app.get('/modules', (req, res) => {
  const modules = loadModules();
  console.log('Modules:', modules);
  res.json(modules);
});

// POST /modules → add a new resource to a week
app.post('/modules', (req, res) => {
  const { week, resource } = req.body;
  if (!week || !resource?.title || !resource?.type || !resource?.url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const modules = loadModules();
  if (!modules[week]) {
    modules[week] = [];
  }
  modules[week].push(resource);
  saveModules(modules);

  res.json({ message: 'Resource added', modules });
});

// BONUS: DELETE /modules/:week/:title → remove by title
app.delete('/modules/:week/:title', (req, res) => {
  const { week, title } = req.params;
  const modules = loadModules();

  if (!modules[week]) {
    return res.status(404).json({ error: 'Week not found' });
  }

  const originalLength = modules[week].length;
  modules[week] = modules[week].filter(r => r.title !== title);

  if (modules[week].length === originalLength) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  saveModules(modules);
  res.json({ message: `Deleted '${title}' from ${week}` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
