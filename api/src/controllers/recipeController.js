const {Recipe,Diet} = require('../db');
const {Op}= require('sequelize');
const axios= require('axios');
const {API_KEY}= process.env;
require('dotenv').config();

const allRecipes=async (req,res)=>{
console.log('entre a la fn')

//-----------search x name-----------
try{
    let {name}= req.query;
    let api;
    let db;
    let response=[];
    if(name){
        api=(await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8b3f2c5a0b0549f5ad1732284ec9716a&titleMatch=${name}&addRecipeInformation=true&number=100`)).data.results;
        db= await Recipe.findAll({

            
            include:Diet,
            where:{
                name:{
                    [Op.iLike]:`%{name}%`
                }
                
            }
        })
        console.log('este es el api del req title',api)
        console.log('este es el db',db)
        response=[...db,api];
        console.log('este es el response ',response)
        res.status(200).send(response.length ? response : 'info title not found')
    }else{
        api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8b3f2c5a0b0549f5ad1732284ec9716a&addRecipeInformation=true&number=100`)
        db= await Recipe.findAll({include:Diet})
        console.log('este es el db de el else',db)

        if(api || db){
            let apiResponse= api.data.results?.map((ch)=>{
                return{
                    id:ch.id,
                    title:ch.title,
                    summary:ch.summary,
                    score:ch.spoonacularScore,
                    healthScore:ch.healthScore,
                    image:ch.image,
                    steps:ch.analyzedInstructions,//analayzedInstruccions[{name:}]
                    diets: ch.diets.map((d) => { return { name: d } }),

                }
                
            })
            response=[...apiResponse,db];
            console.log('este es el response',response)
             res.status(200).json(response);
        }
    }
}
catch(err){
    console.error(err,'error en la funcion allRecipes,de recipeController')
}
}

const postRecipes= async (req,res)=>{}

const idRecipes= async (req,res)=>{}


module.exports= {
    allRecipes,
    postRecipes,
    idRecipes
}