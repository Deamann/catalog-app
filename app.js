const express = require('express');
const path = require('path');

const app = express();
const port = 3001; // Different port to run alongside payment app

// Product data (simple array)
const products = [
  { id: 1, name: 'Product A', price: 50, description: 'Description of Product A' },
  { id: 2, name: 'Product B', price: 75, description: 'Description of Product B' },
  { id: 3, name: 'Product C', price: 100, description: 'Description of Product C' },
];

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to list all products
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Route to display product details
app.get('/product/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.render('product', { product });
  } else {
    res.status(404).send('Product not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Catalog app is running at http://localhost:${port}`);
});

