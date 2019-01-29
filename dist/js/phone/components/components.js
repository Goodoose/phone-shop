export default class Component {
  constructor({ element }) {
    this._element = element;
    this.callbackMap = {};
  }

  on(nameEvent, selector, callback) {
    this._element.addEventListener(nameEvent, (e) => {
      const delegateTarget = e.target.closest(selector);
      if (!delegateTarget) { return; }
      callback(e);
    });
  }

  subscribe(nameEvent, callback) {
    this.callbackMap[nameEvent] = callback;
  }

  emit(nameEvent, data) {
    this.callbackMap[nameEvent](data);
  }
}
