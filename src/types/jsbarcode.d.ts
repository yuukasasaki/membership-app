declare module 'jsbarcode' {
  type BarcodeFormat = 'CODE128'

  type JsBarcodeOptions = {
    format?: BarcodeFormat | string
    lineColor?: string
    width?: number
    height?: number
    displayValue?: boolean
    fontSize?: number
    margin?: number
  }

  type BarcodeTarget = SVGElement | HTMLCanvasElement | HTMLImageElement | string

  function JsBarcode(
    target: BarcodeTarget,
    value: string,
    options?: JsBarcodeOptions,
  ): void

  export default JsBarcode
}
