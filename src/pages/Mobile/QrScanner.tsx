import { useNavigate } from "react-router-dom";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import { ReactComponent as Left } from "assets/LeftArrow.svg";

interface Props {
  // eslint-disable-next-line no-unused-vars
  onScan: (data: string) => void;
  setScanning: Dispatch<SetStateAction<boolean>>;
}

const QRScanner = ({ onScan, setScanning }: Props) => {
  const navi = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          onScan(result.data);
          scannerRef.current?.stop();
          navi("/m/main");
        },
        { returnDetailedScanResult: true }
      );
      scannerRef.current.start();
    }

    return () => {
      scannerRef.current?.stop();
    };
  }, []);

  return (
    <Wrap>
      <BackButton onClick={() => setScanning(false)}>
        <Left />
      </BackButton>
      <Video ref={videoRef} autoPlay />
    </Wrap>
  );
};

export default QRScanner;

const Video = styled.video`
  width: 100%;
  height: 100vh;
`;

const Wrap = styled.div`
  position: relative;
`;

const BackButton = styled.div`
  z-index: 3;
  position: absolute;
  top: 30px;
  left: 30px;
  width: 28px;
  height: 28px;
  background-color: #fff;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;
