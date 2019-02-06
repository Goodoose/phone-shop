// eslint-disable-next-line import/extensions
import Components from './components.js';

export default class PhoneFilter extends Components {
  constructor({ element }) {
    super({ element });
    this._render();

    // let changeSortType;
    this.on('change', '[data-sort]', (e) => {
      const sortPhone = e.target.closest('[data-sort]');
      if (sortPhone.value === 'name') {
        this.emit('sort-by', 'id');
      } else {
        this.emit('sort-by', 'age');
      }
    });
  }

  _render() {
    this._element.innerHTML = `

      <p>
        Sort by:
        <select data-sort="sel">
          <option value="age">Newest</option> 
          <option value="name">Alphabetical</option>
        </select>
      </p>    
    
    `;
  }
}
