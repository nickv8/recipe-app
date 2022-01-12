import { generateLastEdited, initializedEditPage } from './views'
import { updateRecipe, removeRecipe } from './recipes'

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
