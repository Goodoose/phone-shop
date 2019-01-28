export default class PhoneSearch {
  constructor({ element, phones, findByName }) {
    this._element = element;
    this._phones = phones;
    this._findByName = findByName;
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

    const clickAllBtn = clickEveryButton(() => findByName(filterPhoneByName()), 500);

    this._element.addEventListener('keydown', (e) => {
      const inputSearch = e.target.closest('[data-input-search]');
      if (inputSearch) {
        clickAllBtn();
      }
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
