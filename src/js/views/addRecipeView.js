import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'New Recipe Added Successfully';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnSubmit = document.querySelector('.upload__btn');

  constructor() {
    super();
    this.addHandlerOpenWindow();
    this.addHandlerCloseWindow();
    this.addHandlerSubmitRecipe();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addHandlerOpenWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerCloseWindow() {
    [this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this.toggleWindow.bind(this))
    );
  }

  addHandlerSubmitRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataObject = new FormData(this);
      const data = [...dataObject];

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
