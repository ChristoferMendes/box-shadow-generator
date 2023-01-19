class Opacity {
  constructor(opacityInput, opacityRef) {
    this.opacityInput = opacityInput
    this.opacityRef = opacityRef
  }

  initialize() {
    this.opacityRef.value = this.opacityInput.value
  }

  updateValue(value) {
    this.opacityRef.value = value
  }
}

const opacityInput = document.querySelector('#opacity')
const opacityValue = document.querySelector('#opacity-value')
export const opacity = new Opacity(opacityInput, opacityValue);
opacity.initialize();