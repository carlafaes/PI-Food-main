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
        //hago el pedido a la api del name de la receta
        
        api=(await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${name}&addRecipeInformation=true&number=100`)).data.results;
        // console.log(api)
        //busco en la db el nombre
        db= await Recipe.findAll({
            where:{
                name:{
                    [Op.iLike]: '%' + name + '%' 
                }
            },
            include:{
                model:Diet
            }
            
        })

        // api= await api.filter(e=> e.name.toLowerCase())
        //si existen mapeo la info que quiero obtener
        if(api || db){
            let apiResponse= api.map((ch)=>{
                return{
                    id:ch.id,
                    name:ch.title,
                    summary:ch.summary,
                    score:ch.spoonacularScore,
                    healthScore:ch.healthScore,
                    image:ch.image,
                    steps:ch.analyzedInstructions,//analayzedInstruccions[{name:}]
                    diets: ch.diets.map((d) => { return { name: d } }),//mapeo el name del tipo de dieta

                }
                
            })
            //concateno info de api y db, y le aplico el metodo flat para que aplane arrays anidados
            response=[...db,apiResponse].flat();
             console.log(apiResponse)
        }
        
        
    }else{
        //pedido a la api
        api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            //espero la informacion que tiene el model Recipe e incluyo la del model Diet
        db= await Recipe.findAll({include:Diet})
        // console.log('este es el db de el else',db)
        //mapeo la info que necesito,y les pongo el nombre/value que quiero que tengan,para luego accederlos
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
            console.log(db,'db')
            response=[...apiResponse,db];
            // const resF=response.flat();
            // console.log('este es el response',resF)
            //  let responseWithOutEmptys=  resF.filter((e => e.find(a => a.includes([]))))
            //  console.log(responseWithOutEmptys)
            //  res.status(200).json(response);

            // resF? res.status(200).send(resF) : res.status(404).send('No hay paginas')
        }
        

    }
     response=response.flat()
     response ? res.status(200).send(response) : res.status(404).send('No hay paginas')

        
    
           

 }
 catch(err){
    console.error(err,'error en la funcion allRecipes,de recipeController')
    }
}

const postRecipes= async (req,res,next)=>{
    try{
        const aRecipe= req.body;//informacion que me llega del body la guardo en la variable
         console.log(aRecipe)

        let [newRecipe,rec]= await Recipe.findOrCreate({
             //busca una receta con las caracteristicas especificadas en el where, y si no lo encuentra lo crea
           
            where:{
                //id:aRecipe.id,
                name: aRecipe.name,
                summary: aRecipe.summary,
                score: aRecipe.score,
                healthScore: aRecipe.healthScore,
                steps: aRecipe.steps.toString(),//paso de array a string
                image:aRecipe.image,
                //created:true,
            }
        })

        //espero la informacion del findORCreate y le seteo las dietas
        await newRecipe.setDiets(aRecipe.diets.flat())
        console.log(newRecipe)
        //retorno la nueva receta creada
        return res.send(newRecipe)
    }
    catch(err){
        next(err,'este error viene desde postRecipes')
    }
}

const idRecipes= async (req,res)=>{
const {id}= req.params;//recibo el id por parametros

let recipes;//declaro una variable vacia que luego llenare con la informacion que sea necesaria en cualquiera sea el caso
try{
    //busqueda de id alfanumerico, en los casos en los que los modelos tienen id UUID
    if(isNaN(id)){
        recipes= await Recipe.findAll({//espero encontrar en el modelo Recipe el id coincidente
            where:{
                id:{
                    [Op.eq]: id
                }
            },
            include:[{
                model:Diet
            }]
        })    
    }
    else{
        //busqueda id de la api
        recipes= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        //accedo al data que es donde se guarda la info axios
        recipes= recipes.data;

    }
    recipes?//si existe lo envio por medio de un json,sino envio un status 404 con el err
    res.status(200).json(recipes):
    res.status(404).send("the recipes doesn't exist")
}
catch(error){
    console.log(error,'error catch del id')
}

}




module.exports= {
    allRecipes,
    postRecipes,
    idRecipes,
    
}