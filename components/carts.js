const express = require('express');
const router = express.Router();

let carts = [];

router.post('/', (req, res) => {
  const id = carts.length + 1;
  const newCart = { id, products: [] };
  carts.push(newCart);
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send('Cart not found');
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const product = cart.products.find(p => p.product === req.params.pid);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    res.status(201).json(cart);
  } else {
    res.status(404).send('Cart not found');
  }
});

router.put('/:cid/product/:pid', (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const product = cart.products.find(p => p.product === req.params.pid);
    if (product) {
      Object.assign(product, req.body);
      res.json(product);
    } else {
      res.status(404).send('Product not found in cart');
    }
  } else {
    res.status(404).send('Cart not found');
  }
});

router.delete('/:cid/product/:pid', (req, res) => {
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const index = cart.products.findIndex(p => p.product === req.params.pid);
    if (index !== -1) {
      cart.products.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send('Product not found in cart');
    }
  } else {
    res.status(404).send('Cart not found');
  }
});

module.exports = router;
