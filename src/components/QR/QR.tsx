import { Component } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type QRProps = {
  value: string
}

export class QR extends Component<QRProps> {
  render() {
    const { value } = this.props

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
        <h1>Генерация QR-кода</h1>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <QRCodeCanvas
            value={value}
            size={256}
            fgColor="#fff"   
            bgColor="#000" 
            style={{borderRadius: "10%"}}
          />
          <img
            src="/favicon.ico" // Путь к вашему логотипу
            alt="Logo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50px', // Размер логотипа
              height: '50px',
            }}
          />
        </div>
      </div>
    )
  }
}
