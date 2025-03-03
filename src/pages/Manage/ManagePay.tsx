import Layout from "components/Layout/MainMenuLayout";
import LoadingSpinner from "components/molecules/LoadingSpinner";
import PayTable from "components/molecules/Manage/PayTable";
import { useFetchMonthOfWage } from "hooks/api/ManageQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ManagePay = () => {
  const [payList, setPayList] = useState<any[]>([]);
  const { data, isLoading } = useFetchMonthOfWage("2025-03-01");
  useEffect(() => {
    if (!isLoading && data) {
      if (data?.data.length > 0) setPayList(data?.data);
    }
  }, [data, isLoading]);

  return (
    <Layout activeIcon="Test" title="직원 급여 관리">
      <Wrap $isLoading={isLoading}>
        {isLoading ? <LoadingSpinner style={{ height: "100%" }} /> : <PayTable payList={payList} />}
      </Wrap>
    </Layout>
  );
};

export default ManagePay;

const Wrap = styled.div<{ $isLoading: boolean }>`
  max-height: 746px;
  ${({ $isLoading }) => $isLoading && "height: 100%"}
`;
