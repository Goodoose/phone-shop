// eslint-disable-next-line import/extensions
import Component from './components.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '[data-button-cart]', (e) => {
      const phoneIdClick = e.target.closest('[data-phone-id]');
      this.emit('add-to-cart', phoneIdClick.dataset.phoneId);
    });

    this.on('click', '[data-element="phone-link"]', (e) => {
      const phoneIdClick = e.target.closest('[data-phone-id]');
      this.emit('phone-selected', phoneIdClick.dataset.phoneId);
      this._element.hidden = true;
    });
  }

  show(phones) {
    this._phones = phones;
    this._render();
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
