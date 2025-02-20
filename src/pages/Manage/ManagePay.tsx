import Layout from "components/Layout/MainMenuLayout";
import PayTable from "components/molecules/Manage/PayTable";

const ManagePay = () => {
  return (
    <Layout activeIcon="Test" title="직원 급여 관리">
      <div>
        <PayTable />
      </div>
    </Layout>
  );
};

export default ManagePay;
