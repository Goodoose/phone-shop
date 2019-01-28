
// import '../../../../dist/images/close.svg';
export default class ShoppingCart {
  constructor({ element }) {
    this._element = element;
    this._cartItem = [];
    this._render();

    this._element.addEventListener('click', (e) => {
      const btnDelete = e.target.closest('[data-delete]');
      if (btnDelete) {
        const tempArr = [];
        this._cartItem.forEach((elem) => {
          if (elem.id !== btnDelete.dataset.delete) {
            tempArr.push(elem);
          } else {
            // eslint-disable-next-line no-param-reassign
            delete elem.quantity;
          }
        });
        this._cartItem = tempArr;
        this._render();
      }

      const btnDeleteAll = e.target.closest('[data-delete-all]');
      if (btnDeleteAll) {
        this._cartItem.forEach((elem) => {
          // eslint-disable-next-line no-param-reassign
          delete elem.quantity;
        });
        this._cartItem = [];
        this._render();
      }
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
                <img alt="close" src="../../../images/close.svg">
              </a>
            </div>
          </li>
        
        `).join('')}
      </ul>
      <button data-delete-all>Delete all</button>
    `;
  }
}
