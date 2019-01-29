import Component from './components.js';

export default class PhoneViewer extends Component {
  constructor({ element, addToCart, showCatalog }) {
    super({ element });
    this._addToCart = addToCart;
    this._showCatalog = showCatalog;

    this.on('click', '[data-button-cart]', () => {
      this._addToCart(this._phoneDetails.id);
    });

    this.on('click', '[data-button-back]', (e) => {
      const btnBack = e.target.closest('[data-button-back]');
      if (btnBack) {
        this._showCatalog();
      }
    });

    this.on('click', '[data-image-item]', (e) => {
      const clickImg = e.target.closest('[data-image-item]');
      if (clickImg) {
        const mainImg = this._element.querySelector('[data-main-img]');
        mainImg.src = clickImg.dataset.imageItem;
      }
    });
  }

  show(phoneDetails) {
    this._phoneDetails = phoneDetails;
    this._render();
    this._element.hidden = false;
  }

  _render() {
    const details = this._phoneDetails;
    this._element.innerHTML = `
    
    <div>
  <div>

    <img class="phone" src="${details.images[0]}" data-main-img>

    <button data-button-back>Back</button>
    <button data-button-cart>Add to basket</button>

    <h1>${details.name}"</h1>

    <p>${details.snippet}</p>

    <ul class="phone-thumbs">
      ${details.images.map(img => `
      
        <li>
          <img src="${img}" data-image-item="${img}">
        </li>
      
      `).join('')}  

    </ul>

    <ul class="specs">
      <li>
        <span>Availability and Networks</span>
        <dl>
          <dt>Availability</dt>
          <dd>${details.availability}</dd>
        </dl>
      </li>
      <li>
        <span>Battery</span>
        <dl>
          <dt>Type</dt>
          <dd>${details.battery.type}</dd>
          <dt>Talk Time</dt>
          <dd>${details.battery.talkTime}</dd>
          <dt>Standby time (max)</dt>
          <dd>${details.battery.standbyTime}</dd>
        </dl>
      </li>
      <li>
        <span>Storage and Memory</span>
        <dl>
          <dt>RAM</dt>
          <dd>${details.storage.ram}</dd>
          <dt>Internal Storage</dt>
          <dd>${details.storage.flash}</dd>
        </dl>
      </li>
      <li>
        <span>Connectivity</span>
        <dl>
          <dt>Network Support</dt>
          <dd>${details.connectivity.cell}</dd>
          <dt>WiFi</dt>
          <dd>${details.connectivity.wifi}</dd>
          <dt>Bluetooth</dt>
          <dd>${details.connectivity.bluetooth}</dd>
          <dt>Infrared</dt>
          <dd>${details.connectivity.infrared ? '✘' : '✓'}</dd>
          <dt>GPS</dt>
          <dd>${details.connectivity.gps ? '✘' : '✓'}</dd>
        </dl>
      </li>
      <li>
        <span>Android</span>
        <dl>
          <dt>OS Version</dt>
          <dd>${details.android.os}</dd>
          <dt>UI</dt>
          <dd>${details.android.ui}</dd>
        </dl>
      </li>
      <li>
        <span>Size and Weight</span>
        <dl>
          <dt>Dimensions</dt>
          <dd>${details.sizeAndWeight.dimensions[0]}</dd>
          <dd>${details.sizeAndWeight.dimensions[1]}</dd>
          <dd>${details.sizeAndWeight.dimensions[2]}</dd>
          <dt>Weight</dt>
          <dd>${details.sizeAndWeight.weight}</dd>
        </dl>
      </li>
      <li>
        <span>Display</span>
        <dl>
          <dt>Screen size</dt>
          <dd>${details.display.screenSize}</dd>
          <dt>Screen resolution</dt>
          <dd>${details.display.screenResolution}</dd>
          <dt>Touch screen</dt>
          <dd>${details.display.touchScreen ? '✘' : '✓'}</dd>
        </dl>
      </li>
      <li>
        <span>Hardware</span>
        <dl>
          <dt>CPU</dt>
          <dd>${details.hardware.cpu}</dd>
          <dt>USB</dt>
          <dd>${details.hardware.u}</dd>
          <dt>Audio / headphone jack</dt>
          <dd>${details.hardware.audioJack}</dd>
          <dt>FM Radio</dt>
          <dd>${details.hardware.fmRadio ? '✓' : '✘'}</dd>
          <dt>Accelerometer</dt>
          <dd>${details.hardware.accelerometer ? '✓' : '✘'}</dd>
        </dl>
      </li>
      <li>
        <span>Camera</span>
        <dl>
          <dt>Primary</dt>
          <dd>${details.camera.primary}</dd>
          <dt>Features</dt>
          <dd>${details.camera.features}</dd>
        </dl>
      </li>
      <li>
        <span>Additional Features</span>
        <dd>${details.additionalFeatures}</dd>
      </li>
    </ul>
  </div>
</div>
    
    `;
  }
}
