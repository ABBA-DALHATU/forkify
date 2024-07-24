import View from './View.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your search';
  _successMessage = '';

  _generateMarkup() {
    const data = this._data;

    return data.map(recipe => PreviewView.render(recipe, false)).join('');
  }
}
export default new ResultsView();
