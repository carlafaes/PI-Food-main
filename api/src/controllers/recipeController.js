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
        api=(await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=24798308e2c84087a7c1eef0a70ef04d&titleMatch=${name}&addRecipeInformation=true&number=100`)).data.results;
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
        api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=24798308e2c84087a7c1eef0a70ef04d&addRecipeInformation=true&number=100`)
        db= await Recipe.findAll({include:Diet})
        // console.log('este es el db de el else',db)

        if(api || db){
            let apiResponse= api.data.results?.map((ch)=>{
                return{
                    id:ch.id,
                    name:ch.title,
                    summary:ch.summary,
                    score:ch.spoonacularScore,
                    healthScore:ch.healthScore,
                    image:ch.image,
                    steps:ch.analyzedInstructions,//analayzedInstruccions[{name:}]
                    diets: ch.diets.map((d) => { return { name: d } }),

                }
                
            })
            response=[...apiResponse,db];
            // console.log('este es el response',response)
             res.status(200).json(response);
        }
    }
 }
    catch(err){
    console.error(err,'error en la funcion allRecipes,de recipeController')
    }
}

const postRecipes= async (req,res,next)=>{
    try{
        const aRecipe= req.body;
         console.log(aRecipe)

        let [newRecipe,rec]= await Recipe.findOrCreate({
             //busca una recetea con las caracteristicas especificadas en el where, y si no lo encuentra lo crea
            // 'rec' es un booleano que indica si lo tuvo que crear o no
            where:{
                //id:aRecipe.id,
                name: aRecipe.name,
                summary: aRecipe.summary,
                score: aRecipe.score,
                healthScore: aRecipe.healthScore,
                steps: aRecipe.steps.toString(),
                image:aRecipe.image,
                //created:true,
            }
        })

        
        await newRecipe.setDiets(aRecipe.diets)
        console.log(newRecipe)
        return res.send(newRecipe)
    }
    catch(err){
        next(err,'este error viene desde postRecipes')
    }
}

const idRecipes= async (req,res)=>{
const {id}= req.params;

let recipes;
try{
    if(isNaN(id)){
        recipes= await Recipe.findByPk(id,{
            include:{
                model:Diet,
                attributes:['name'],
                through:{
                    attributes:[],
                }
            }
        })
        console.log(recipes)
    }
    else{
        //API
        recipes= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=24798308e2c84087a7c1eef0a70ef04d`)
        recipes= recipes.data;
    }
    recipes?
    res.status(200).json(recipes):
    res.status(404).send("the recipes doesn't exist")
}
catch(error){
    console.log(error,'error catch del id')
}
console.log(idRecipes,'este es el idRecipes')
}


module.exports= {
    allRecipes,
    postRecipes,
    idRecipes
}