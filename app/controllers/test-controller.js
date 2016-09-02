const express = require('express');
const router = new express.Router({ mergeParams: true });

router.get('/500', () => {
  throw new Error('Some random error');
});

module.exports = router;
