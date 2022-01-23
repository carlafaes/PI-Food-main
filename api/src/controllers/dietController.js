const {Diet} = require('../db');
const axios= require('axios');


//const getDiets= async(req,res,next)=>{
    // try{
    //     //hacemos el pedido a la api
    //     // let diets= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=892fb186d9cb42c585622f696481982a&addRecipeInformation=true&number=100`);
    //     // // console.log('es el diets',diets)
       
   
    //     // if(diets){
    //     //    //mapeamos a la variable response para obtener solo el id y el name
    //     //    let response= diets.data.results?.map((e)=>{
    //     //        return{
    //     //         id:e.id,
    //     //          name:e.diets
    //     //        }
    //     //    })
        
    //     //  let responseFlat=response.flat()
    //     // //  console.log(responseFlat,'responseFlat')
         

    //     // //filtro los obj name y busco los que solo contengan arrays vacios para quitarlos de responseFlat
    //     //   const list= responseFlat.filter(el => el.name.find(a => a.includes([])))
    //     //   console.log(list,'list')
   
          
          
    //     //    return res.send(list);
        
    //     const diets = [
    //         "gluten free",
    //         "dairy free",
    //         "paleolithic",
    //         "ketogenic",
    //         "lacto ovo vegetarian",
    //         "vegan",
    //         "pescatarian",
    //         "primal",
    //         "fodmap friendly",
    //         "whole 30",
    //     ]
    
    //     diets.forEach(el => {
    //         Diet.findOrCreate({ 
    //             where: { name: el }  //por cada tipo de dieta
    //         })
    //     })
    
    //     const allTypes = await Diet.findAll()
    //     res.send(allTypes)
    
    // }
    //     // else{
    //     //     console.log('diets del else:',diets)
    //     // }
       
    //    catch(e){
    //     console.table(e)
    //    } 
    // }
    const preCharge= async()=>{

        try{
            let diets= await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=24798308e2c84087a7c1eef0a70ef04d&addRecipeInformation=true&number=100');

            //if(diets){
                let response= diets.data.results?.map((e)=>{
                    return{
                        id:e.id,
                        name: e.diets.toString(),
                    }
                    
                })
                // let resp=response.map((e)=>{
                //     e.name.toString()
                // })
                console.log(response)
                let responseFlat=response.flat();
            //}
            

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