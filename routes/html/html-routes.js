const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, ''));
});

router.get('/add-pizza', (req, res) => {
  res.sendFile(path.join(__dirname, ''));
});

router.get('/pizza', (req, res) => {
  res.sendFile(path.join(__dirname, ''));
});

module.exports = router;
