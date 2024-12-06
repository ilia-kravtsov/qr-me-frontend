import React, { Component, createRef } from 'react';
import { AwesomeQR } from 'awesome-qr';
import s from './QR.module.scss'

type QRProps = {
  value: string;
  edit_code: string
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

  async generateQRCode() {
    const { value } = this.props;
    const canvas = this.canvasRef.current;
    if (canvas) {
      const logoImage = `${process.env.PUBLIC_URL}/logo_misis_2.svg`;
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

  handleCopyToClipboard = () => {
    const { value } = this.props;
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert('Ссылка скопирована в буфер обмена!');
      })
      .catch((error) => {
        console.error('Не удалось скопировать ссылку:', error);
      });
  };

  render() {
    const edit_code = this.props.edit_code

    return (
      <div className={s.container}>

        {/*Это элемент в который будет вставлен QR*/}
        <canvas
          ref={this.canvasRef}
          width="256"
          height="256"
          className={s.canvas}
        />

        <div className={s.buttonsContainer}>
          <button
            onClick={this.handleDownload}
            className={s.downloadButton}
          >
            Скачать QR-код
          </button>
          <a ref={this.downloadLinkRef} className={s.downloadLink}>
            Скачать
          </a>
          <button
            onClick={this.handleCopyToClipboard}
            className={s.downloadButton}
          >
            Скопировать ссылку
          </button>
          <a
            href={this.props.value}
            target="_blank"
            rel="noopener noreferrer"
            className={s.pageLink}
          >
            Перейти по ссылке
          </a>
          <div className={s.editCode}>{edit_code ? edit_code : 'edit-code не получен'}</div>
        </div>
      </div>
    );
  }
}
