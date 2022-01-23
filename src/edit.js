import { generateLastEdited, initializedEditPage, renderIndgredients } from './views'
import { updateRecipe, removeRecipe, saveRecipes } from './recipes'
import { createIngredient } from './ingredients'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const dateElement = document.querySelector('#time-stamp')
const removeElement = document.querySelector('#remove-recipe')
const recipeId = location.hash.substring(1)

initializedEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(recipe.editedAt) 
    
})

bodyElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(recipe.editedAt) 
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializedEditPage(recipeId)
    }
})

//select input and button for add ingredient
const newIngredient = document.querySelector('#new-ingredient')

//add new ingredient text into input and save to ingredients array in Recipes
newIngredient.addEventListener('submit', (e) => {
    e.preventDefault()
    
    //entered text will be saved to text, if no text entered alert a message
    const text = e.target.elements.text.value.trim()
    if (text.length > 0) {
        createIngredient(text)
        renderIndgredients(recipeId)
        e.target.elements.text.value = ''
    } else {
        return alert("Please add an ingredient")
    }
    saveRecipes(recipeId)
})
