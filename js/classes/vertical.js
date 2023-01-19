class VerticalOffset {
  constructor(verticalInput, verticalRef) {
    this.verticalInput = verticalInput
    this.verticalRef = verticalRef
  }

  initialize() {
    this.verticalRef.value = this.verticalInput.value;
  }

  updateValue(value) {
    this.verticalRef.value = value
  }
}

const verticalInput = document.querySelector('#vertical')
const verticalValue = document.querySelector('#vertical-value')
export const vertical = new VerticalOffset(verticalInput, verticalValue);
vertical.initialize();