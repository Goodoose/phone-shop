// eslint-disable-next-line import/extensions
import PhoneServices from './services/phone-services.js';
// eslint-disable-next-line import/extensions
import PhoneCatalog from './components/phone-catalog.js';
// eslint-disable-next-line import/extensions
import PhoneViewer from './components/phone-viewer.js';
// eslint-disable-next-line import/extensions
import ShoppingCart from './components/shopping-cart.js';
// eslint-disable-next-line import/extensions
import PhoneFilter from './components/phone-filter.js';
// eslint-disable-next-line import/extensions
import PhoneSearch from './components/phone-search.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._render();

    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneServices.getAllPhones(),
      phoneSelected: (phoneId) => {
        const phoneDetails = PhoneServices.getDetails(phoneId);
        this._viewer.show(phoneDetails);
      },
      addToCart: (phoneId) => {
        const phoneDetails = PhoneServices.getDetails(phoneId);
        this._cart.addPhone(phoneDetails);
      },
    });
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      addToCart: (phoneId) => {
        const phoneDetails = PhoneServices.getDetails(phoneId);
        this._cart.addPhone(phoneDetails);
      },
      showCatalog: () => {
        this._catalog._element.hidden = false;
        this._catalog._render();
        this._viewer._element.hidden = true;
      },
    });
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="phone-cart"]'),
    });
    this._find = new PhoneFilter({
      element: this._element.querySelector('[data-component="phone-filter"]'),
      sortBy: (typeSort) => {
        if (typeSort === 'age') {
          this._catalog._phones.sort((a, b) => a.age - b.age);
        } else {
          this._catalog._phones.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        }
        this._catalog._render();
      },
    });

    this._search = new PhoneSearch({
      element: this._element.querySelector('[data-component="phone-search"]'),
      phones: PhoneServices.getAllPhones(),
      findByName: (phoneSelect) => {
        this._catalog._phones = phoneSelect;
        this._catalog._render();
      },
    });
  }

  _render() {
    this._element.innerHTML = `

    <div class="col-md-2">
      <section data-component="phone-search"></section>
      <section data-component="phone-filter"></section>
      <section data-component="phone-cart"></section>
    </div>    

    <div class="col-md-10">
      <div data-component="phone-catalog" ></div>
      <div data-component="phone-viewer" hidden></div>       
    </div>

    `;
  }
}
