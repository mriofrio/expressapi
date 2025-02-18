const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < size; index++) {
    products.push({
      name: faker.commerce.productName(), 
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  };
  res.json(products);
});

//GET: Recibir parámetros
//Los EndPoints específicos deben ir antes que los dinámicos
router.get('/filter', (req, res) => {
  res.send('Filter activado');
})


router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Laptop',
    price: 1500
  })
});

module.exports = router;
