class HorizontalOffset {
  constructor(spreadInput, spreadRef) {
    this.spreadInput = spreadInput
    this.spreadRef = spreadRef
  }

  initialize() {
    this.spreadRef.value = this.spreadInput.value;
  }

  updateValue(value) {
    this.spreadRef.value = value
  }
}

const spreadInput = document.querySelector('#spread')
const spreadRef = document.querySelector('#spread-value')
export const spread = new HorizontalOffset(spreadInput, spreadRef);
spread.initialize()