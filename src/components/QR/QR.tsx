import React, { Component, createRef } from 'react';
import { AwesomeQR } from 'awesome-qr';

type QRProps = {
  value: string;
};

type AwesomeQRConfig = {
  text: string;
  size?: number;
  colorDark?: string;
  colorLight?: string;
  logoImage?: string;
  logoScale?: number;
  borderRadius?: number;
  logoRadius?: number;
};

export class QR extends Component<QRProps> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private downloadLinkRef = createRef<HTMLAnchorElement>();

  componentDidMount() {
    this.generateQRCode();
  }

  componentDidUpdate(prevProps: QRProps) {
    if (prevProps.value !== this.props.value) {
      this.generateQRCode();
    }
  }

  async generateQRCode() {
    const { value } = this.props;
    const canvas = this.canvasRef.current;
    if (canvas) {
      const logoImage = `${process.env.PUBLIC_URL}/favicon.ico`; // Динамическое определение пути
      const config: AwesomeQRConfig = {
        text: value,
        size: 256,
        colorDark: '#000',
        colorLight: '#fff',
        logoScale: 0.3,
        logoImage,
        borderRadius: 10,
        logoRadius: 10,
      };

      try {
        const qr = new AwesomeQR(config);
        const imageData = await qr.draw();

        if (typeof imageData === 'string') {
          const context = canvas.getContext('2d');
          const image = new Image();
          image.onload = () => {
            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(image, 0, 0);
            }
          };
          image.src = imageData;
        } else {
          console.error('Не удалось создать изображение QR-кода: результат не является строкой.');
        }
      } catch (error) {
        console.error('Ошибка генерации QR-кода:', error);
      }
    }
  }

  handleDownload = () => {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const downloadLink = this.downloadLinkRef.current;
      if (downloadLink) {
        downloadLink.href = image;
        downloadLink.download = 'qr-code.png';
        downloadLink.click();
      }
    }
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}>
        <canvas
          ref={this.canvasRef}
          width="256"
          height="256"
          style={{
            boxShadow: '0 0 40px #61dafb',
            borderRadius: '10px',
          }}
        />
        <button
          onClick={this.handleDownload}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Скачать QR-код
        </button>
        <a ref={this.downloadLinkRef} style={{ display: 'none' }}>
          Скачать
        </a>
      </div>
    );
  }
}
