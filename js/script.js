import { hexToRgb } from "./HexToRgb.js";
import { HandleInputChange } from "./inputs.js";

class BoxShadowGenerator {
  constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, webkitRule, mozRule, color, colorRef, oppacity, oppacityRef) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur = blur;
    this.blurRef = blurRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
    this.color = color;
    this.colorRef = colorRef;
    this.oppacity = oppacity;
    this.oppacityRef = oppacityRef;
  }

  initialize() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur.value;
    this.spreadRef.value = this.spread.value;
    this.colorRef.value = hexToRgb(this.color.value);
    this.oppacityRef.value = this.oppacity.value;

    this.applyRule();
    this.showRule();
  }

  applyRule() {
    console.log(this.colorRef.value)
    this.previewBox.style.boxShadow = `
      ${this.inset ? 'inset' : ''}
      ${this.horizontalRef.value}px 
      ${this.verticalRef.value}px 
      ${this.blurRef.value}px 
      ${this.spreadRef.value}px 
      rgba(${this.colorRef.value}, ${this.oppacityRef.value / 100})
    `
    this.changeTextStyle = previewBox.style.boxShadow
    const pixels = this.changeTextStyle.replace(/.*[)]/g, '').replace('inset', '')
    const rgb = this.changeTextStyle.replace(/[)].*/g, ')')
    const inset = this.changeTextStyle.includes('inset') ? this.changeTextStyle.replace(/.*inset/g, 'inset') : ''
    this.currentRule = `${inset} ${pixels} ${rgb} `;

    this.showRule();

  }

  showRule() {
    this.rule.innerText = this.currentRule;
    this.webkitRule.innerText = this.currentRule;
    this.mozRule.innerText = this.currentRule;
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        break;
      case "inset":
        this.inset = value;
        break;
      case "opacity":
        this.oppacityRef.value = value;
    }
    this.applyRule();



  }
}

// Element selection
const horizontal = document.querySelector('#horizontal');
const horizontalRef = document.querySelector('#horizontal-value');
const vertical = document.querySelector('#vertical');
const verticalRef = document.querySelector('#vertical-value');
const blur = document.querySelector('#blur');
const blurRef = document.querySelector('#blur-value');
const spread = document.querySelector('#spread');
const spreadRef = document.querySelector('#spread-value');
const color = document.querySelector('#color');
const colorRef = document.querySelector('#color-value');
const oppacity = document.querySelector('#opacity')
const oppacityRef = document.querySelector('#opacity-value')
const button = document.querySelector('#button');



const previewBox = document.querySelector('#box');

const rule = document.querySelector('#rule span');
const webkitRule = document.querySelector('#webkit-rule span')
const mozRule = document.querySelector('#moz-rule span')

let isInner = false;

export const boxShadow = new BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, webkitRule, mozRule, color, colorRef, oppacity, oppacityRef)

boxShadow.initialize();
HandleInputChange();

color.addEventListener('input', (e) => {
  const value = e.target.value;
  const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
      , (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16))

  boxShadow.updateValue('color', hexToRgb(value))
})

button.addEventListener('click', () => {
  isInner = !isInner;
  boxShadow.updateValue('inset', isInner);
  isInner ? button.innerHTML = 'Out Shadow' : button.innerHTML = 'Inner Shadow'
});

const modalContainer = document.querySelector('.modal-container');
const modalButton = document.querySelector('.modal-container button');

const colorPreviewButton = document.querySelector('#preview-box-color')

class BoxPreview {
  constructor(color) {
    this.color = color;
  }

  colorize() {
    previewBox.style.backgroundColor = this.color
  }

  updateValue(color) {
    this.color = color;
    this.colorize();
  }
}

const boxPreview = new BoxPreview();
colorPreviewButton.addEventListener('input', (e) => {
  const { value } = e.target;
  boxPreview.updateValue(value)
})

class BoxCopy {
  constructor(rule, webkit, mozRule) {
    this.rule = rule;
    this.webkit = webkit;
    this.mozRule = mozRule;
  }

  copy(item) {
    navigator.clipboard.writeText(item);
  }

}

const boxCopy = new BoxCopy(rule.innerHTML, webkitRule.innerHTML, mozRule.innerHTML)


// Copy to clipboard

class Modal {
  constructor(modal) {
    this.modal = modal;
  }

  open() {
    this.modal.style.display = 'flex'
  }

  close() {
    this.modal.style.display = 'none'
  }
}

const modal = new Modal(modalContainer)

document.querySelectorAll("#rules-area p span").forEach(item => {
  item.addEventListener('click', () => {
    const rules = item.parentNode.innerText;
    boxCopy.copy(rules);
    modal.open();
  })
})

modalButton.addEventListener('click', () => {
  modal.close();
})