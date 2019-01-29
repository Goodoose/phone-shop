// eslint-disable-next-line import/extensions
import Components from './components.js';

export default class PhoneSearch extends Components {
  constructor({ element, phones }) {
    super({ element });
    this._phones = phones;
    this._render();

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

    let filteredList = [];
    function filterPhoneByName() {
      filteredList = [];
      const inputSearch = document.querySelector('[data-input-search]');
      phones.forEach((item) => {
        if (item.name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
          filteredList.push(item);
        }
      });
      return filteredList;
    }

    const clickAllBtn = clickEveryButton(() => this.emit('find-by-name', filterPhoneByName()), 500);

    this.on('keydown', '[data-input-search]', () => {
      clickAllBtn();
    });
  }

  _render() {
    this._element.innerHTML = `
    
    <p>
        Search:
        <input data-input-search>
    </p>
    
    `;
  }
}
