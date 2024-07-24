import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import AddRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlBookmarks = async function () {
  const bookmarks = model.state.bookmarks;
  localStorage.setItem('bookmark', JSON.stringify(bookmarks));
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmark'));
  bookmarkView.render(storedBookmarks);
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    // 1) Load recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons

    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError('No serch found');
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  // Update the recipe servings (in state)
  model.updateServings(servings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

//
// const controlBookmark = function (recipe) {
//   // Update the bookmark(in state)
//   model.updateBookmark(recipe);

//   // Render bookmark image
//   recipeView.renderBookmark(model.state.bookmarks);

//   console.log(model.state.bookmarks);

//   // Update recipeUi

//   recipeView.update(model.state.recipe);
// };

const controlAddBookmark = function () {
  // Calling addBookmark to add a recipe to the bookmark array
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  console.log(model.state.bookmarks);

  // Update UI to reflect bookmarked recipe
  recipeView.update(model.state.recipe);
  // bookmarkView.renderBookmarks(model.state.bookmarks);
  controlBookmarks();
  bookmarkView.update(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();

    // Uppload the new recipe
    const recipe = Object.fromEntries(newRecipe);
    await model.uploadRecipe(recipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderSuccessMessage();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    // render in bookmark window
    controlBookmarks();

    // Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmark'));
  if (storedBookmarks) model.loadBookmarks(storedBookmarks);

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  // recipeView.addHandlerBookmark(controlBookmark);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerSubmitRecipe(controlAddRecipe);
  controlBookmarks();
};
init();
