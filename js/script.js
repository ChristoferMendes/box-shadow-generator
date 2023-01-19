import { blur } from "./classes/blur.js";
import { color } from "./classes/color.js";
import { horizontal } from "./classes/horizontal.js";
import { inset } from "./classes/inset.js";
import { opacity } from "./classes/opacity.js";
import { spread } from "./classes/spread.js";
import { vertical } from "./classes/vertical.js";
import { HexAlpha } from "./modules/hexAlpha.js";
import { updateValues } from "./modules/updateValues.js";

export class Box {
  horizontal = horizontal.horizontalRef;
  vertical = vertical.verticalRef;
  blur = blur.blurRef;
  spread = spread.spreadRef;
  color = color.colorRef;
  opacity = opacity.opacityRef;
  inset = inset
  #hexAlpha = HexAlpha

  constructor(previewBox) {
    this.previewBox = previewBox;
  }

  updateBoxShadowValue() {
    const hexAlpha = this.#transformHexToRGBA()
    const hasInset = this.defineInset()

    const boxShadowStyle = `
    ${this.horizontal.value}px
    ${this.vertical.value}px
    ${this.blur.value}px
    ${this.spread.value}px
    ${hasInset}
    ${hexAlpha}
    `

    this.previewBox.style.boxShadow = boxShadowStyle
  }


  #transformHexToRGBA() {
    const opacityToPercent = this.opacity.value  / 100
    const hexAlpha = new this.#hexAlpha(this.color.value, opacityToPercent)

    return hexAlpha.alphaColor
  }

  defineInset () {
    const { insetValue } = this.inset
    const hasInset = insetValue ? 'inset' : ''
    return hasInset
  }
}

class BoxRule extends Box {

  constructor(rule, previewBox) {
    super(previewBox)
    this.rule = rule;
  }

  updateRuleText() {
    const { ruleString }  = this.#serializeRule()

    this.rule.innerHTML = ruleString?.trim();
  }

  #serializeRule () {
    const boxShadow = this.previewBox.style.boxShadow
    if (typeof boxShadow !== 'string') return {};

    const rgbaStringRegex = /\)\s/g
    const [rgba, pixels] = boxShadow?.split(rgbaStringRegex)

    const [horizontal, vertical, blur, spread] = pixels?.split(' ') ?? []
    const hasInset = this.defineInset()
    
    const rgbaSerialized = rgba + ')'
    const ruleString = `
      ${horizontal}
      ${vertical}
      ${blur}
      ${spread}
      ${hasInset}
      ${rgbaSerialized}
    `

    return { ruleString  }
  }
}

class BoxColor extends Box {
  constructor(previewBox, boxColorRef) {
    super(previewBox)
    this.boxColorRef = boxColorRef

  }

  initialize () {
    this.previewBox.style.backgroundColor = this.boxColorRef.value;
  }

  updateColor (value) {
    this.previewBox.style.backgroundColor = value
  }
}


const box = document.querySelector('#box')
const boxPreview = new Box(box);
boxPreview.updateBoxShadowValue();

const boxColorRef = document.querySelector('#box-color-value')
const boxColor = new BoxColor(box, boxColorRef)
boxColor.initialize();


const rules = document.querySelectorAll('#rules-area > p > span')

const boxRules = Array.from(rules).map(rule => new BoxRule(rule, box))

boxRules.forEach(rule => rule.updateRuleText())

const inputs = document.querySelectorAll('input[type="range"], #color')

inputs.forEach((input) => {
  const inputChangeEvent = 'input'

  input.addEventListener(inputChangeEvent, (e) => {
    const { value, name } = e.target
    const update = updateValues[name]

    update(value)
    boxPreview.updateBoxShadowValue();
    boxRules.forEach(rule => rule.updateRuleText())
  })
})

const button = document.querySelector('#button')

let insetShadow = false;
button.addEventListener('click', () => {
  insetShadow = !insetShadow;
  const update = updateValues['inset']
  update(insetShadow)

  const defineButtonText = insetShadow ? 'Inner Shadow' : 'Out Shadow'
  button.innerHTML = defineButtonText
  boxPreview.updateBoxShadowValue()
  boxRules.forEach(rule => rule.updateRuleText())
})

const colorInput = document.querySelector('#box-color-value')
colorInput.addEventListener('input', (e) => {
  const { value } = e.target
  boxColor.updateColor(value)
})