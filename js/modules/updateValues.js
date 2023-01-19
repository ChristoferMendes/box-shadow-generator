import { blur } from "../classes/blur.js";
import { color } from "../classes/color.js";
import { horizontal } from "../classes/horizontal.js";
import { inset } from "../classes/inset.js";
import { opacity } from "../classes/opacity.js";
import { spread } from "../classes/spread.js";
import { vertical } from "../classes/vertical.js";

export const updateValues = {
  horizontal: (value) => horizontal.updateValue(value),
  vertical: (value) => vertical.updateValue(value),
  blur: (value) => blur.updateValue(value),
  spread: (value) => spread.updateValue(value),
  color: (value) => color.updateValue(value),
  opacity: (value) => opacity.updateValue(value),
  inset: (value) => inset.updateValue(value),
}

export const update = async ({ name, value }) => {
  const importPath = `../classes/${name}.js`
  const { [name]: importedClass } = await import(importPath);

  importedClass.updateValue(value);
}