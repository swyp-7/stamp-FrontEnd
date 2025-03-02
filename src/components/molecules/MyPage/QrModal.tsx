import styled from "styled-components";
import { ReactComponent as Close } from "assets/Close.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStoreInfoStore } from "store/StoreStore";
import { FetchQrCode } from "hooks/api/StoreQuery";
import { byteToImageUrl } from "utils/QRUtil";
import { ClipLoader } from "react-spinners";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const QrModal = ({ setIsModalActive }: Props) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const { storeData } = useStoreInfoStore();
  const { data, isLoading } = FetchQrCode(storeData?.id);
  useEffect(() => {
    if (!isLoading && data) {
      if (data.data.byteArr) {
        const url = byteToImageUrl(data.data.byteArr);
        setQrUrl(url);
      }
    }
  }, [data, isLoading]);

  return (
    <ModalBase>
      <div className="modal">
        <CloseWrap onClick={() => setIsModalActive(false)}>
          <Close />
        </CloseWrap>
        <Title>QR 코드</Title>
        <QrWrap>
          {qrUrl ? (
            <img src={qrUrl} alt={"QR코드 이미지"} />
          ) : (
            <ClipLoader color="#4A3AFF" size={60} />
          )}
        </QrWrap>
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
    width: 750px;
    height: 600px;
    border-radius: 36px;
    background-color: #fff;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 34px;
    position: relative;
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
