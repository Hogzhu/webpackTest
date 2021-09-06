import React, {Component} from 'react';

let name = 'Alex';

export default class Hello extends Component {
  render() {
    return (
      <div>
        <span>Hello,</span>
        {name}
      </div>
    );
  }
}

// module.exports = () => {
//   let hello = document.createElement('div');
//   hello.innerHTML = 'hello,hogzhu';
//   return hello;
// }