import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { ReactComponent as CloseIcon } from "assets/Close.svg";

interface Props {
  isModalActive: boolean;
  handleOutsideClick: (e: React.MouseEvent) => void;
  handleModalClose: () => void;
  handlePostComplete: (data: any) => void;
}

const PostCodeModal = ({
  isModalActive,
  handleOutsideClick,
  handleModalClose,
  handlePostComplete
}: Props) => {
  return (
    <PostCodeWrap key={isModalActive ? "open" : "closed"} onClick={handleOutsideClick}>
      <ModalWrap>
        <ModalTop>
          <ModalClose onClick={handleModalClose}>
            <CloseIcon />
          </ModalClose>
        </ModalTop>
        <DaumPostcode className="codeModal" onComplete={handlePostComplete} />
      </ModalWrap>
    </PostCodeWrap>
  );
};

export default PostCodeModal;

const PostCodeWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  .codeModal {
    width: 533px !important;
    height: 755px !important;
    border-radius: 24px;
    overflow: hidden;
  }
`;

const ModalWrap = styled.div`
  width: 573px;
  height: 868px;
  border-radius: 24px;
  padding: 0 20px 20px 20px;
  background-color: #fff;
`;

const ModalTop = styled.div`
  margin: 25px 0;
  display: flex;
`;

const ModalClose = styled.div`
  cursor: pointer;
  justify-self: end;
  padding: 6px 12px;
  height: 36px;

  svg {
    width: 24px;
    height: 24px;
  }
`;
