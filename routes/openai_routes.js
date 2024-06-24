const express = require('express');
const router = express.Router();
const {generateImage,editImage,createImageVariation,generateFreeImage} = require('../controllers/openaiController');


router.post('/createFreeImage',generateFreeImage);

router.post('/createImage',generateImage);
router.post('/editImage',editImage);
router.post('/generateImageVariation',createImageVariation);

module.exports= router;