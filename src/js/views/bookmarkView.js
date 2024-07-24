import View from './View.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet';
  _successMessage = '';

  _generateMarkup() {
    const data = this._data;
    // console.log(data);

    return data.map(bookmark => PreviewView.render(bookmark, false)).join('');
  }
}

export default new bookmarkView();
