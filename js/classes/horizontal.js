class HorizontalOffset {
  constructor(horizontalInput, horizontalRef) {
    this.horizontalInput = horizontalInput
    this.horizontalRef = horizontalRef
  }

  initialize() {
    this.horizontalRef.value = this.horizontalInput.value
  }

  updateValue(value) {
    this.horizontalRef.value = value
  }
}

const horizontalInput = document.querySelector('#horizontal')
const horizontalValue = document.querySelector('#horizontal-value')
export const horizontal = new HorizontalOffset(horizontalInput, horizontalValue);
horizontal.initialize();