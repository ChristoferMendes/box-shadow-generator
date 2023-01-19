class Inset {
  constructor(insetValue) {
    this.insetValue = insetValue;
  }

  initialize () {
    this.insetValue = ''
  }

  updateValue (value) {
    this.insetValue = value;
  }

}


export const inset = new Inset(false)