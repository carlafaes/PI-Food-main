const {Diet} = require('../db');
const axios= require('axios');


    const preCharge= async()=>{

        try{
            let diets= await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=24798308e2c84087a7c1eef0a70ef04d&addRecipeInformation=true&number=100');

            
                let response= diets.data.results?.map((e)=>{
                    return{
                        id:e.id,
                        name: e.diets.toString(),
                    }
                    
                })
                
                // console.log(response)
                let responseFlat=response.flat();
            
            

            let responseFlat2= await Promise.all(responseFlat.map(e => Diet.findOrCreate({where: e})))
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