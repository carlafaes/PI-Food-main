export function Validate(diet){
    let err={};

    if(!diet.name || diet.name < 0){
        err.name= 'A name is required'
    }
    else if(diet.name.length > 30 || diet.name.length < 3){
        err.name = 'The recipe name must contain 3 to 30 characters'
    }

    if(!diet.summary){
        err.summary= 'The summary is required'
    }

    if(!diet.score){
        err.score='The score is required'
    }
    else if(diet.score < 1 || diet.score > 100){
        err.score='the score cannot be less than 1 or greater than 100 '
    }

    if(!diet.healthScore){
        err.healthScore='The health Score is required'
    }
    else if(diet.healthScore < 1 || diet.healthScore > 100){
        err.score='the health Score cannot be less than 1 or greater than 100 '
    }

    if(!diet.steps){
        err.steps='The steps are required'
    }

    if(!diet.diets){
        err.diets='The diets are required'
    }
    return err;
}