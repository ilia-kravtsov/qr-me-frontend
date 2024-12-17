import React, { Component, createRef } from 'react';
import { AwesomeQR } from 'awesome-qr';
import s from './QR.module.scss';
import { toast } from 'react-toastify';
import { toastPositionConfig } from '../../utils/utils';

type QRProps = {
  value: string;
  edit_code: string;
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

  state = {
    isCopied: false, // Состояние для отображения галочки
  };

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

    if (value) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          toast.success('Ссылка скопирована в буфер обмена!', toastPositionConfig);
        })
        .catch((error) => {
          console.error('Не удалось скопировать ссылку:', error);
          toast.error('Ошибка при копировании ссылки.', toastPositionConfig);
        });
    } else {
      toast.error('Ссылка отсутствует.', toastPositionConfig);
    }
  };

  handleCopyEditCodeToClipboard = () => {
    const { edit_code } = this.props;
    if (edit_code) {
      navigator.clipboard
        .writeText(edit_code)
        .then(() => {
          toast.success('Код успешно скопирован!', toastPositionConfig);
          this.setState({ isCopied: true });
          setTimeout(() => this.setState({ isCopied: false }), 2000);
        })
        .catch((err) => {
          console.error('Ошибка при копировании:', err);
          toast.error('Не удалось скопировать код.', toastPositionConfig);
        });
    }
  };

  render() {
    const edit_code = this.props.edit_code;

    return (
      <div className={s.container}>
        {/*Это элемент в который будет вставлен QR*/}
        <canvas ref={this.canvasRef} width="260" height="260" className={s.canvas} />

        <div className={s.buttonsContainer}>
          <img src="qr/receive-square.svg" alt="" className={`${s.imgQRs} ${s.imgQRs1}`} />
          <button onClick={this.handleDownload} className={s.downloadButton}>
            Скачать QR
          </button>
          <a ref={this.downloadLinkRef} className={s.downloadLink}>
            Скачать
          </a>
          <img src="qr/document-copy.svg" alt="" className={`${s.imgQRs} ${s.imgQRs2}`} />
          <button onClick={this.handleCopyToClipboard} className={s.downloadButton}>
            Копировать ссылку
          </button>
          <img src="qr/export.svg" alt="" className={`${s.imgQRs} ${s.imgQRs3}`} />
          <a href={this.props.value} target="_blank" rel="noopener noreferrer" className={s.pageLink}>
            Перейти по ссылке
          </a>
        </div>
        <div className={s.editCode} onClick={this.handleCopyEditCodeToClipboard}>
          <button className={s.buttonEditCode}>
            {this.state.isCopied ? '✔️' : edit_code ? edit_code : 'edit-code не получен'}
          </button>
        </div>
      </div>
    );
  }
}
