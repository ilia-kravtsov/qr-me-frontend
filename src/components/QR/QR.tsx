// import { Component } from 'react'
// import { QRCodeCanvas } from 'qrcode.react'
//
// type QRProps = {
//   value: string
// }
//
// export class QR extends Component<QRProps> {
//   render() {
//     const { value } = this.props
//
//     return (
//       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px'}}>
//         <h1>Генерация QR-кода</h1>
//         <div style={{ position: 'relative', display: 'inline-block' }}>
//           <QRCodeCanvas
//             level="H"
//             value={value}
//             size={256}
//             fgColor="#fff"
//             bgColor="#000"
//             style={{borderRadius: "10%",  boxShadow: '0 0 40px #39FF14'}}
//           />
//           <img
//             src="/favicon.ico"
//             alt="Logo"
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '50px',
//               height: '50px',
//             }}
//           />
//         </div>
//       </div>
//     )
//   }
// }


import React, { Component, createRef } from 'react'
import { AwesomeQR } from 'awesome-qr'

type QRProps = {
  value: string
}

type AwesomeQRConfig = {
  text: string
  size?: number
  colorDark?: string
  colorLight?: string
  logoImage?: string
  logoScale?: number
  borderRadius?: number
  logoRadius?: number
}

export class QR extends Component<QRProps> {
  private canvasRef = createRef<HTMLCanvasElement>()

  componentDidMount() {
    this.generateQRCode()
  }

  componentDidUpdate(prevProps: QRProps) {
    if (prevProps.value !== this.props.value) {
      this.generateQRCode()
    }
  }

  async generateQRCode() {
    const { value } = this.props
    const canvas = this.canvasRef.current
    if (canvas) {
      const logoImage = `${process.env.PUBLIC_URL}/favicon.ico` // Динамическое определение пути
      const config: AwesomeQRConfig = {
        text: value,
        size: 256,
        colorDark: '#000', // Цвет QR-кода
        colorLight: '#fff', // Цвет фона
        logoScale: 0.3, // Размер логотипа относительно QR-кода
        logoImage, // Динамический путь к логотипу
        borderRadius: 10, // Радиус углов QR-кода
        logoRadius: 10, // Радиус логотипа
      }

      try {
        const qr = new AwesomeQR(config)
        const imageData = await qr.draw()

        if (typeof imageData === 'string') {
          const context = canvas.getContext('2d')
          const image = new Image()
          image.onload = () => {
            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height) // Очистка перед рисованием
              context.drawImage(image, 0, 0)
            }
          }
          image.src = imageData
        } else {
          console.error('Не удалось создать изображение QR-кода: результат не является строкой.')
        }
      } catch (error) {
        console.error('Ошибка генерации QR-кода:', error)
      }
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}>
        <canvas ref={this.canvasRef} width="256" height="256" style={{boxShadow: '0 0 40px #61dafb', borderRadius: '10px'}}/>
      </div>
    )
  }
}
