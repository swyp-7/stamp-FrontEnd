import Layout from "components/Layout/MainMenuLayout";
import AddModal from "components/molecules/Manage/AddModal";
import AskAddModal from "components/molecules/Manage/AskAddModal";
import Table from "components/molecules/Manage/Table";
import { useEmployeeList } from "hooks/api/ManageQuery";
import { useEffect, useState } from "react";
import { useStoreInfoStore } from "store/StoreStore";
import styled from "styled-components";

const Manage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [ModalType, setModalType] = useState<"ask" | "add">("ask");
  const [employerData, setEmployerData] = useState();
  const [emploId, setEmploId] = useState(0);
  const { storeData } = useStoreInfoStore();
  const storeId = storeData?.store.id || 0;
  const { data, isLoading } = useEmployeeList(`${storeId}`, isModalActive);

  useEffect(() => {
    if (!isLoading && data?.data.length > 0) {
      setIsModalActive(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data?.data.length > 0) {
      setEmployerData(data?.data);
      // setIsModalActive(false);
    }
    if (data?.data.length === 0) {
      setIsModalActive(true);
      setModalType("ask");
    }
  }, [isLoading, data]);

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
          key={data ? "ModalOpen" : "ModalClose"}
          setIsModalActive={setIsModalActive}
          setModalType={setModalType}
          setEmploId={setEmploId}
          employerData={employerData}
        />
        {isModalActive && (
          <ModalBase onClick={(e) => e.stopPropagation()}>
            {ModalType === "ask" && (
              <AskAddModal setModalType={setModalType} name={storeData?.store?.name} />
            )}
            {ModalType === "add" && (
              <AddModal
                setIsModalActive={setIsModalActive}
                emploId={emploId}
                storeId={storeId}
                setEmploId={setEmploId}
              />
            )}
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
  max-height: 730px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #9389ff;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #9389ff;
  }
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
