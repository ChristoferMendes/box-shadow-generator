class Color {
  constructor(colorInput, colorRef) {
    this.colorInput = colorInput
    this.colorRef = colorRef
  }

  initialize () {
    this.colorRef.value = this.colorInput.value
  }

  updateValue(value) {
    this.colorRef.value = value
  }
}

const colorInput = document.querySelector('#color')
const colorValue = document.querySelector('#color-value')
export const color = new Color(colorInput, colorValue);
color.initialize();