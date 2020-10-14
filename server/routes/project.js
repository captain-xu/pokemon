const express = require('express');
const router = express.Router();

const project = require('../controllers/project.controller');

router.get('/', project.list);

router.post('/', project.insert);

router.delete('/', project.delete);


module.exports = router;