import styled from "styled-components";
import { ReactComponent as Close } from "assets/Close.svg";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useStoreInfoStore } from "store/StoreStore";
import { FetchQrCode } from "hooks/api/StoreQuery";
import { byteToImageUrl } from "utils/QRUtil";
import { ClipLoader } from "react-spinners";
import Button from "components/atoms/Button";
import html2canvas from "html2canvas";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  name: string;
}

const QrModal = ({ setIsModalActive, name }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const { storeData } = useStoreInfoStore();
  const { data, isLoading } = FetchQrCode(storeData?.store?.id);
  useEffect(() => {
    if (!isLoading && data) {
      if (data.data.byteArr) {
        const url = byteToImageUrl(data.data.byteArr);
        setQrUrl(url);
      }
    }
  }, [data, isLoading]);

  const handleDownload = () => {
    if (modalRef.current) {
      html2canvas(modalRef.current, {
        ignoreElements: (element) =>
          element.classList.contains("close") || element.classList.contains("download")
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL(); // 생성된 이미지를 data URL로 변환
        link.download = `${name}_QR_code.png`; // 다운로드 파일 이름 설정
        link.click();
      });
    }
  };

  return (
    <ModalBase>
      <div className="modal" ref={modalRef}>
        <CloseWrap onClick={() => setIsModalActive(false)} className="close">
          <Close />
        </CloseWrap>
        <Title>{name}의 QR 코드</Title>
        <QrWrap>
          {qrUrl ? (
            <img src={qrUrl} alt={"QR코드 이미지"} />
          ) : (
            <ClipLoader color="#4A3AFF" size={60} />
          )}
        </QrWrap>
        <a className="link" href="https://stamp.swygbro.com/m" target="blank">
          https://stamp.swygbro.com/m
        </a>
        <Button
          className="download"
          isOutline={true}
          text="다운로드"
          area={2}
          onClick={handleDownload}
        />
      </div>
    </ModalBase>
  );
};

export default QrModal;

const ModalBase = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--modal-base);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 880px;
    height: 670px;
    border-radius: 36px;
    background-color: #fff;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .link {
      font-size: 20px;
      margin-bottom: 5px;
    }

    .download {
      position: absolute;
      bottom: 34px;
      right: 34px;
    }
  }
`;

const CloseWrap = styled.div`
  position: absolute;
  top: 64px;
  right: 64px;
  cursor: pointer;
  width: 24px;
  height: 24px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 44px;
  color: #363636;
`;

const QrWrap = styled.div`
  width: 331px;
  height: 331px;
  /* background-color: gray; */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;
