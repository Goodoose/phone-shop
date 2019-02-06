const PhoneServices = {
  getAllPhones(query = '', callback) {
    const url = './phones/phones.json';

    this._sendRequest(url, (phonesFromServer) => {
      const phones = phonesFromServer
        .filter(item => item.name.toLowerCase()
          .includes(query.toLowerCase()));

      callback(phones);
    });
  },


  getDetails(phoneId, callback) {
    const url = `./phones/${phoneId}.json`;
    this._sendRequest(url, callback);
  },

  _sendRequest(urlAddress, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', urlAddress, true);
    xhr.send();

    // eslint-disable-next-line consistent-return
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert(`${xhr.status}`);
        return {};
      }
      callback(JSON.parse(xhr.responseText));
    };
  },
};

export default PhoneServices;
