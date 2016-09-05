const express = require('express');
const router = new express.Router();

module.exports = function () {
  router.get('/', (req, res) => {
    res.render('confirmation', { pageId: 'confirmation' });
  });
  return router;
};
