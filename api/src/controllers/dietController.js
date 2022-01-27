const {Diet} = require('../db');
const axios= require('axios');
const {API_KEY}= process.env;
require('dotenv').config();

    const preCharge= async()=>{

        try{
            let diets= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

            
                let response= diets.data.results?.map((e)=>{
                    return{
                        id:e.id,
                        name: e.diets.toString(),
                    }
                    
                })
                
                // console.log(response)
                let responseFlat=response.flat();
                console.log(responseFlat)
                const list= responseFlat.filter(e => e.name)
                 console.log(list,'list')
            

               let responseFlat2= await Promise.all(list.map(e => Diet.findOrCreate({where: e})))
               return 'datos diets cargados'
        }
        catch(error){
            console.error(error,'error de la precarga')
        }

    }

    const getDiets= async (req,res,next)=>{
        try{
            let diets= await Diet.findAll();
            res.json(diets)
        }
        catch(error){
            next(error);
        }
    }
module.exports= {
    getDiets,
    preCharge
   
}