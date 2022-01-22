import moment from 'moment'
import { getFilters } from './filters'
import { createIngredient, getIngredients, toggleIngredient } from './ingredients'
import { sortRecipes, getRecipes, saveRecipes } from './recipes'

//Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')


    //Setup the recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed recipe'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)
    

    //setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')
    
    //setup status message
    statusEl.textContent = generateLastEdited(recipe.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}

//Render application recipes
const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = sortRecipes(filters.sortBy)
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    )

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
            
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}
//figure out why ingredients aren't staying displayed after closing window
const initializedEditPage = (recipeId) => {

    const titleElement = document.querySelector('#recipe-title')
    const bodyElement = document.querySelector('#recipe-body')
    const dateElement = document.querySelector('#time-stamp')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredientsElement = document.querySelector('#ingredients-list')
    
    if (!recipe) {
        location.assign('/index.html')
    }
    
    ingredientsElement.value = renderIndgredients(recipeId)
    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    dateElement.textContent = generateLastEdited(recipe.editedAt) 
    }
    
    //Generate the last edited message with time stamp
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
    

//setup ingredient DOM
const generateIngredientDOM = (ingredient) => {
    const textEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const buttonEl = document.createElement('button')
    const ingredientText = document.createElement('span')
    const checkBox = document.createElement('input')

    //setup ingredient check box
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = ingredient.owned
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', () => {
        toggleIngredient(ingredient)
        renderIndgredients()
    })
    //setup ingredient text
        ingredientText.textContent = ingredient.text
        containerEl.appendChild(ingredientText)

    //setup container
        textEl.appendChild(containerEl)
        
    //setup delete button
        buttonEl.textContent = 'delete'
        textEl.appendChild(buttonEl)
        buttonEl.addEventListener('click', () => {
            removeIngredient(ingredient.id)
            renderIndgredients()

        })
        saveRecipes()
        return textEl

}

//create renderIngredients 
const renderIndgredients = () => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id)
    const ingredients = recipe.ingredients
    document.querySelector('#ingredients-list').innerHTML = ''

    

    if (ingredients.length > 0) {
        ingredients.forEach((ingredient) => {
            document.querySelector('#ingredients-list').appendChild(generateIngredientDOM(ingredient))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No Ingredients to list'
        document.querySelector('#ingredients-list').appendChild(messageEl)
    }
}

//create removeIngredients in ingredients

//create toggleIngredients in ingredients

//create ingredientFilters: searchText, owned

    
    export { generateRecipeDOM, renderRecipes, generateLastEdited, initializedEditPage, generateIngredientDOM, renderIndgredients }