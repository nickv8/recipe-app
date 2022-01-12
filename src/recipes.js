import uuidv4 from 'uuid'
import moment from 'moment'

let recipes = []

//read existing recipes from storage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

//save the recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

//expose recipes from module
const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()

    recipes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        editedAt: timeStamp
    })
    saveRecipes()
    return id
}

//remove a recipe from the list
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

//sort recipes
const sortRecipes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return recipes.sort( (a, b) => {
            if (a.editedAt > b.editedAt) {
                return -1
            } else if (a.editedAt < b.editedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return recipes.sort( (a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return recipes.sort( (a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return recipes
    }
}

//update recipe
const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
        recipe.editedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body
        recipe.editedAt = moment().valueOf()
    }

    saveRecipes()
    return recipe
}

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, sortRecipes, updateRecipe }