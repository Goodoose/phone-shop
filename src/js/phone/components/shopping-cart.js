// eslint-disable-next-line import/extensions
import Components from './components.js';

export default class ShoppingCart extends Components {
  constructor({ element }) {
    super({ element });
    this._cartItem = {};
    this._render();

    this.on('click', '[data-delete]', (event) => {
      const phoneDelete = event.target.closest('[data-delete]').dataset.delete;
      delete this._cartItem[phoneDelete];
      this._render();
    });

    this.on('click', '[data-delete-all]', () => {
      this._cartItem = {};
      this._render();
    });

    this.on('click', '[data-button-add]', (event) => {
      const phoneClickAdd = event.target.closest('[data-button-add]').dataset.buttonAdd;
      this._cartItem[phoneClickAdd]++;
      this._render();
    });

    this.on('click', '[data-button-remove]', (event) => {
      const phoneClickRemove = event.target.closest('[data-button-remove]').dataset.buttonRemove;
      if (this._cartItem[phoneClickRemove] > 1) {
        this._cartItem[phoneClickRemove]--;
      } else {
        delete this._cartItem[phoneClickRemove];
      }
      this._render();
    });
  }

  addPhone(phoneAdd) {
    if (phoneAdd in this._cartItem) {
      this._cartItem[phoneAdd]++;
    } else {
      this._cartItem[phoneAdd] = 1;
    }
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${Object.keys(this._cartItem).map(phone => `

          <li>
            <div>
              ${phone}              
              quantity:
              <button data-button-remove="${phone}">-</button>
              ${this._cartItem[phone]}
              <button data-button-add="${phone}">+</button>
              <a href="#!phones/${phone}" class="thumb" data-delete=${phone}>
                <img alt="close" src="img/close.svg">
              </a>
            </div>
          </li>
        
        `).join('')}
      </ul>
      <button data-delete-all>Delete all</button>
    `;
  }
}
