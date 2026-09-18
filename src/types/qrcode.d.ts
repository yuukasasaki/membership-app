declare module 'qrcode' {
  type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

  type QRCodeToCanvasOptions = {
    width?: number
    margin?: number
    errorCorrectionLevel?: ErrorCorrectionLevel
  }

  const QRCode: {
    toCanvas(
      canvas: HTMLCanvasElement,
      text: string,
      options?: QRCodeToCanvasOptions,
    ): Promise<void>
  }

  export default QRCode
}
