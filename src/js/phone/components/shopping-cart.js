import Components from './components.js'

export default class ShoppingCart extends Components {
  constructor({ element }) {
    super({ element })
    this._cartItem = [];
    this._render();

    this.on('click', '[data-delete]', (e) => {
      const tempArr = [];
      this._cartItem.forEach((elem) => {
        if (elem.id !== e.target.closest('[data-delete]').dataset.delete) {
          tempArr.push(elem);
        } else {
          // eslint-disable-next-line no-param-reassign
          delete elem.quantity;
        }
      });
      this._cartItem = tempArr;
      this._render();
    });

    this.on('click', '[data-delete-all]', () => {
      this._cartItem.forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        delete elem.quantity;
      });
      this._cartItem = [];
      this._render();
    });
  }

  addPhone(phoneAdd) {
    if ('quantity' in phoneAdd) {
      // eslint-disable-next-line no-param-reassign
      phoneAdd.quantity++;
    } else {
      // eslint-disable-next-line no-param-reassign
      phoneAdd.quantity = 1;
      this._cartItem.push(phoneAdd);
    }
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${this._cartItem.map(phone => `

          <li>
            <div>
              ${phone.id} quantity: ${phone.quantity}
              <a href="#!phones/${phone.id}" class="thumb" data-delete=${phone.id}>
                <img alt="close" src="images/close.svg">
              </a>
            </div>
          </li>
        
        `).join('')}
      </ul>
      <button data-delete-all>Delete all</button>
    `;
  }
}
