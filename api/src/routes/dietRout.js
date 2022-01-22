const {Router} = require('express');
const {getDiets}= require('../controllers/dietController');

const dietRouter=Router();

dietRouter.get('/getDiets',getDiets);

module.exports= dietRouter;