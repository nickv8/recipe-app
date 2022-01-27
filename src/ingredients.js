import uuidv4 from 'uuid'
import { getRecipes, saveRecipes } from './recipes'

const recipeId = location.hash.substring(1)
const recipes = getRecipes()
const recipe = recipes.find((recipe) => recipe.id === recipeId)



const loadIngredients = () => {
    const ingredientsJSON = localStorage.getItem('recipes.ingredients')

    try {
        recipes.ingredients = ingredientsJSON ? JSON.parse(ingredientsJSON) : []
    } catch {
        return []
    }
}


const getIngredients = () => recipe.ingredients


const createIngredient = (text) => {
    const id = uuidv4()

    if (text.length > 0) {
        getIngredients().push({
            id: id,
            text,
            owned: false
        })
    } else {
        return alert('Please add an ingredient')
    }
}

const toggleIngredient = (ingredient) => {

    if (ingredient) {
        ingredient.owned = !ingredient.owned
    }
    saveRecipes()
}

const deleteIngredient = (id) => {
    const ingredientIndex = recipe.ingredients.findIndex(function (ingredient) {
        return ingredient.id === id
    })

    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
        
    }
    saveRecipes()
    
}

//figure out if this will work
const getOwnedIngredients = (recipe) => {
   const ingredients = recipe.ingredients
    const ownedIngredients = []
    const owned = ingredients.forEach((ingredient) => {
        if (ingredient.owned === true) {
            ownedIngredients.push(ingredient)
        }
        
    })
    return ` You have ${ownedIngredients.length} ingredients out of ${ingredients.length}`
}


 


export { createIngredient, getIngredients, toggleIngredient, deleteIngredient, getOwnedIngredients}

