const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.render('confirmation', { pageId: 'confirmation' });
});

module.exports = router;
