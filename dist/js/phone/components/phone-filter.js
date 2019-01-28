export default class PhoneFilter {
  constructor({ element, sortBy }) {
    this._element = element;
    this._sortBy = sortBy;
    this._render();

    let changeSortType;
    this._element.addEventListener('click', (e) => {
      const sortPhone = e.target.closest('[data-sort]');
      if (!sortPhone) { return; }
      if (sortPhone.value !== changeSortType) {
        changeSortType = sortPhone.value;
        if (sortPhone.value === 'name') {
          this._sortBy('id');
        } else {
          this._sortBy('age');
        }
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