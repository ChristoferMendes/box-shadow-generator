export class HexAlpha {
  constructor(hex, alpha) {
    this.hex = hex;
    this.alpha = alpha;

    this.rgb = this.#hexToRGB(hex)

    this.alphaColor = this.#formatRGBA(this.rgb, alpha)
  }


  #hexToRGB () {
    let hex = this.hex;
  
    if (hex.lenght === 4) {
      hex = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
    }
  
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16)
    }
  }

  #formatRGBA ({ r, g, b}, alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
}