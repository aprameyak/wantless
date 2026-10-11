const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(express.static('.'));

const dataFile = path.join(__dirname, 'data.json');

const initData = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({
      items: [],
      lists: [
        { id: 'inbox', name: 'Inbox', color: '#667eea' },
        { id: 'wishlist', name: 'Wishlist', color: '#10b981' },
        { id: 'archived', name: 'Archived', color: '#9ca3af' }
      ]
    }));
  }
};

const readData = () => JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

// Add item (instant capture)
app.post('/api/items', (req, res) => {
  try {
    const { name, url, price, image } = req.body;
    if (!name || name.trim().length === 0) throw new Error('Item name required');
    
    const data = readData();
    const item = {
      id: Date.now(),
      name: name.trim(),
      url: url || null,
      price: price ? parseInt(price) : null,
      image: image || null,
      listId: 'inbox',
      desireRating: 5,
      addedAt: new Date().toISOString(),
      daysOnWishlist: 0,
      priceHistory: price ? [{ price: parseInt(price), date: new Date().toISOString() }] : [],
      notes: '',
      purchased: false,
      archived: false
    };
    
    data.items.push(item);
    writeData(data);
    res.json({ success: true, item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items
app.get('/api/items', (req, res) => {
  try {
    const { listId } = req.query;
    const data = readData();
    let items = data.items.filter(i => !i.purchased && !i.archived);
    
    if (listId && listId !== 'all') {
      items = items.filter(i => i.listId === listId);
    }
    
    // Calculate days on wishlist
    items = items.map(i => ({
      ...i,
      daysOnWishlist: Math.floor((Date.now() - new Date(i.addedAt).getTime()) / (1000 * 60 * 60 * 24))
    }));
    
    res.json({ items });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Move item to list
app.put('/api/items/:id/list', (req, res) => {
  try {
    const { listId } = req.body;
    const data = readData();
    const item = data.items.find(i => i.id === parseInt(req.params.id));
    
    if (!item) throw new Error('Item not found');
    item.listId = listId;
    writeData(data);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark purchased
app.put('/api/items/:id/purchase', (req, res) => {
  try {
    const data = readData();
    const item = data.items.find(i => i.id === parseInt(req.params.id));
    
    if (!item) throw new Error('Item not found');
    item.purchased = true;
    writeData(data);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Archive item
app.put('/api/items/:id/archive', (req, res) => {
  try {
    const data = readData();
    const item = data.items.find(i => i.id === parseInt(req.params.id));
    
    if (!item) throw new Error('Item not found');
    item.archived = true;
    writeData(data);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  try {
    const data = readData();
    data.items = data.items.filter(i => i.id !== parseInt(req.params.id));
    writeData(data);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get lists
app.get('/api/lists', (req, res) => {
  try {
    const data = readData();
    res.json({ lists: data.lists });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update desire rating
app.put('/api/items/:id/desire', (req, res) => {
  try {
    const { rating } = req.body;
    const data = readData();
    const item = data.items.find(i => i.id === parseInt(req.params.id));
    
    if (!item) throw new Error('Item not found');
    item.desireRating = parseInt(rating);
    writeData(data);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3026;
initData();
app.listen(PORT, () => console.log(`WantLess on ${PORT}`));
