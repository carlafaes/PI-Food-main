const { Router } = require('express');
const axios = require('axios');  
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoutes= require('./recipeRoute');
const dietRoutes= require('./recipeRoute');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/recipe',recipeRoutes);
 router.use('/diet',dietRoutes)


module.exports = router;
