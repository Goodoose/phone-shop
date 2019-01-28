// eslint-disable-next-line import/extensions
import Component from './components.js';

export default class PhoneCatalog extends Component {
  constructor({
    element, phones, phoneSelected = () => {}, addToCart,
  }) {
    super({ element });
    this._phones = phones;
    this._phoneSelected = phoneSelected;
    this._addToCart = addToCart;
    this._render();

    this._element.addEventListener('click', (e) => {
      const phoneDetailsClick = e.target.closest('[data-element="phone-link"]');

      if (!phoneDetailsClick) { return; }

      const phoneIdClick = e.target.closest('[data-phone-id]');
      this._phoneSelected(phoneIdClick.dataset.phoneId);
      this._element.hidden = true;
    });
    this._element.addEventListener('click', (e) => {
      const btnAddToCart = e.target.closest('[data-button-cart]');
      if (!btnAddToCart) { return; }
      const phoneIdClick = e.target.closest('[data-phone-id]');
      this._addToCart(phoneIdClick.dataset.phoneId);
    });
  }

  _render() {
    this._element.innerHTML = `
    
    <ul class="phones">
      
      ${this._phones.map(phone => `
      
        <li class="thumbnail" data-phone-id="${phone.id}">
          <a href="#!phones/${phone.id}" class="thumb" data-element="phone-link">
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>

          <div class="phones__btn-buy-wrapper" data-button-cart>
            <a class="btn btn-success" >
              Add 
            </a>
          </div>

          <a href="#!phones/${phone.id}" data-element="phone-link">${phone.name}
          </a>
          <p>${phone.snippet}</p>
        </li>
      
      `).join('')}
          
    </ul>
    
    `;
  }
}
