import Layout from "components/Layout/MainMenuLayout";
import AddModal from "components/molecules/Manage/AddModal";
import AskAddModal from "components/molecules/Manage/AskAddModal";
import Table from "components/molecules/Manage/Table";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Manage = () => {
  const [isModalActive, setIsModalActive] = useState(true);
  const [ModalType, setModalType] = useState<"ask" | "add">("ask");

  useEffect(() => {
    console.log(isModalActive, ModalType);
  }, [isModalActive]);

  const handleClickNew = () => {
    setIsModalActive(true);
    setModalType("add");
  };

  return (
    <Layout
      activeIcon="Test"
      title="직원 정보 등록"
      isBtnActive={true}
      btnTxt="신규 등록하기"
      onClick={handleClickNew}
    >
      <Wrap onClick={() => setIsModalActive(false)}>
        <Table
          key={isModalActive ? "ModalOpen" : "ModalClose"}
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
        />
        {isModalActive && (
          <ModalBase onClick={(e) => e.stopPropagation()}>
            {ModalType === "ask" && <AskAddModal setModalType={setModalType} />}
            {ModalType === "add" && <AddModal setIsModalActive={setIsModalActive} />}
          </ModalBase>
        )}
      </Wrap>
    </Layout>
  );
};

export default Manage;

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ModalBase = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: var(--modal-base);
`;
