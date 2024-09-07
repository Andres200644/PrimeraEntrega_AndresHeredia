const express = require('express');
const app = express();
const productsRouter = require('./components/products');
const cartsRouter = require('./components/carts');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
