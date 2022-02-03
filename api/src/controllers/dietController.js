const {Diet} = require('../db');
const axios= require('axios');
const {API_KEY}= process.env;
require('dotenv').config();

    const preCharge= async()=>{

        try{
            let diets= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

            //mapeo la informacion ingresando primero a data, y luego a result, de ahi tomo solo los name dentro de mi JSON
                let response= diets.data.results?.map((e)=>{
                    return{

                        name: e.diets.toString(),//pasamos de array a string
                    }
                    
                })
                //seteo el response para quitar los obj repetidos,lo mapeo y lo convierto a JSON
                response=new Set(response.map(JSON.stringify))
                //con Array.from lo paso a array y lo mapeo y convierto a obj de JS
                response=Array.from(response).map(JSON.parse)
                //vuelvo a aplicar un map y a el value=nombre lo separo en donde se encuentran las comas
                response=response.map(e=>e.name.split(','))
                //aplano el array para q no sea multidimensional
                response=response.flat()
                //quito todos los repetidos,y set devuelve un array
                response=new Set(response)
                // response=response.add('ketogenic')
                //convierto el obj de valores unicos a un array
                 response=Array.from(response)
             
                 console.log(response)
               // recorro el array y espero a q el modelo Diet cree las instancias con el nombre y el valor unico que contenia mi array,un valor por cada name
                for (el of response) {
                    if (el) await Diet.findOrCreate({
                      where: { name: el }})
                }
            
               return 'datos diets cargados'
        }
        catch(error){
            console.error(error,'error de la precarga')
        }

    }
 //espero a q mi funcion encuentre todo lo q esta cargado en el model Diet y me lo devuelva
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