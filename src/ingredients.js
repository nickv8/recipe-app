import uuidv4 from 'uuid'
import { getRecipes, saveRecipes } from './recipes'

const recipeId = location.hash.substring(1)
const recipes = getRecipes()
const recipe = recipes.find((recipe) => recipe.id === recipeId)

// 01/19/22 changed this to getItem('recipes.ingredients') and try recipes.ingredients.
//origingal was just ingredients
const loadIngredients = () => {
    const ingredientsJSON = localStorage.getItem('recipes.ingredients')

    try {
        recipes.ingredients = ingredientsJSON ? JSON.parse(ingredientsJSON) : []
    } catch {
        return []
    }
}

//aslo changed this to recipes.ingredients instead of ingredients
const getIngredients = () => recipe.ingredients

const createIngredient = (text) => {
    const id = uuidv4()

    if (text.length > 0) {
        recipe.ingredients.push({
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
 


export { createIngredient, getIngredients, toggleIngredient, deleteIngredient }

