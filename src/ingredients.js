import uuidv4 from 'uuid'
import { getRecipes } from './recipes'

const recipeId = location.hash.substring(1)
const recipes = getRecipes()
let ingredients = recipes.ingredients



const loadIngredients = () => {
    const ingredientsJSON = localStorage.getItem('ingredients')

    try {
        ingredients = ingredientsJSON ? JSON.parse(ingredientsJSON) : []
    } catch {
        return []
    }
}

const getIngredients = () => ingredients

const createIngredient = (text) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
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



export { createIngredient }

