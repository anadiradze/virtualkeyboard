/* eslint-disable array-callback-return */
/* eslint-disable import/extensions */
/* eslint-disable no-return-assign */
import { En, Ge } from './constants/index.js';
import { rowsOrder, createElement } from './utils.js';

const { body } = document;
const language = En;
let capslock = false;
let shift = false;

const getKeyObject = (keyCode) => language.find((key) => key.code === keyCode);

const Altering = ({ code, symbol }) => {
  const textarea = document.getElementById('textarea');
  switch (code) {
    case 'Delete': {
      const prior = textarea.value;
      textarea.value = prior.slice(0, prior.length - 1);
      return;
    }
    case 'Space': {
      textarea.value += ' ';
      return;
    }
    case 'Backspace': {
      const prior = textarea.value;
      textarea.value = prior.slice(0, prior.length - 1);
      return;
    }
    case 'Enter': {
      textarea.value += '\n';
      return;
    }
    case 'ShiftRight':
    case 'ShiftLeft': {
      shift = true;
      return;
    }
    case 'ControlLeft':
    case 'ControlRight': {
      return;
    }
    case 'AltLeft':
    case 'AltRight': {
      return;
    }
    case 'Win': {
      return;
    }
    case 'CapsLock': {
      if (capslock === true) {
        capslock = false;
      } else {
        capslock = true;
      }
      return;
    }

    default: {
      let currentSymbol = symbol;
      if (capslock) {
        currentSymbol = symbol.toUpperCase();
      }
      if (shift) {
        const keyObj = getKeyObject(code);
        currentSymbol = keyObj.shift;
        shift = false;
      }
      // eslint-disable-next-line consistent-return
      return textarea.value += currentSymbol;
    }
  }
};

body.addEventListener('click', (event) => {
  const textarea = document.getElementById('textarea');
  textarea.focus();
  const { target } = event;
  const { id } = target;
  const { innerText } = target;
  const iskey = target.className.indexOf('key') > -1;
  // { code :  KeyA ,  symbol : A}
  if (iskey) {
    Altering({ code: id, symbol: innerText });
  }
});

document.addEventListener('keydown', (event) => {
  const keyCode = event.code;
  const key = document.getElementById(keyCode);
  // check if it is an action key
  // import actionKeys
  if (key) {
    key.classList.add('active');
  }
});

const manageDisplay = (languageKeys) => {
  const Kelement = createElement({
    tag: 'div',
    classList: ['KelementClass'],
    parent: body,
  });
  rowsOrder.map((row) => {
    const rowDiv = createElement({
      tag: 'div',
      classList: ['row'],
      parent: Kelement,
    });
    row.map((key) => {
      const keyObj = languageKeys.find((obj) => obj.code === key);
      createElement({
        tag: 'div',
        classList: ['key', key],
        text: keyObj.small,
        parent: rowDiv,
        id: key,
      });
    });
  });

  return Kelement;
};

const createLayout = () => {
  const input = createElement({
    tag: 'textarea',
    classList: ['textarea'],
    id: 'textarea',
    parent: body,
  });
  const a = manageDisplay(En);
  input.focus();
  const btnAlt = document.querySelector('.AltLeft');
  const btnShift = document.querySelector('.ShiftLeft');
  btnAlt.addEventListener('click', () => {
    btnShift.addEventListener('click', () => {
      a.remove();
      manageDisplay(Ge);
    });
  });
};

createLayout();
