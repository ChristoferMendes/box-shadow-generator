class Blur {
  constructor(blurInput, blurRef) {
    this.blurInput = blurInput
    this.blurRef = blurRef
  }

  initialize() {
    this.blurRef.value = this.blurInput.value;
  }

  updateValue(value) {
    this.blurRef.value = value
  }
}

const blurInput = document.querySelector('#blur')
const blurValue = document.querySelector('#blur-value')
export const blur = new Blur(blurInput, blurValue);
blur.initialize()