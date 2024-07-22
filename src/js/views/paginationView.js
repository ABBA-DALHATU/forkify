import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  goto;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupPreviousButton() {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
  }
  _generateMarkupNextButton() {
    return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton();
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupPreviousButton();
    }

    // Other page
    if (curPage < numPages) {
      return `
      ${this._generateMarkupPreviousButton()}${this._generateMarkupNextButton()}`;
    }
    // Page 1, and there are NO other pages
    return '';
  }

  //   addHandlerNextPage(handler) {
  //     document
  //       .querySelector('.pagination__btn--next')
  //       .addEventListener('click', handler);
  //   }
}

export default new PaginationView();
