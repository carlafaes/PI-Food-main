const {Diet} = require('../db');
const axios= require('axios');

const getDiets= async(req,res)=>{
    try{
        let typesPromise = await Diet.findAll();
        let types = typesPromise.map(type => type.dataValues.name)
        res.status(200).json(types);
    } catch (error){
        console.log(error);
    }
}

module.exports= {
    getDiets
}