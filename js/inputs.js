import { boxShadow } from "./script.js";

export function HandleInputChange() {
  const inputs = document.querySelectorAll('input[type="range"]')
  inputs.forEach(item => {
    item.addEventListener('input', (e) => {
      const { value, name } = e.target;
      boxShadow.updateValue(name, value)
    })
  })
}