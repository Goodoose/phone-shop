// eslint-disable-next-line import/extensions
import Components from './components.js';

export default class PhoneSearch extends Components {
  constructor({ element }) {
    super({ element });
    this._render();
    this.inputSearch = '';

    function clickEveryButton(fun, ms) {
      let timer = null;
      // eslint-disable-next-line func-names
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // eslint-disable-next-line prefer-rest-params
          fun.apply(this, arguments);
        }, ms);
      };
    }

    this.on('keydown', '[data-input-search]', clickEveryButton(() => {
      this.inputSearch = document.querySelector('[data-input-search]').value;
      this.emit('find-by-name');
    }, 500));
  }

  _render() {
    this._element.innerHTML = `
    
    <p>
        Search:
        <input data-input-search>
    </p>
    
    `;
  }

  _getInputSearch() {
    return this.inputSearch;
  }
}
