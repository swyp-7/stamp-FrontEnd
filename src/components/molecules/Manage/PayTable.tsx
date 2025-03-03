import { PayComplete, PayGray } from "components/atoms/Manage/Paybutton";
import { Profile, StyledTable } from "./Table";

interface Props {
  payList: any[];
}

const tHeads = ["이름", "근무시간", "시급", "지급예정금액", "급여 지급 상태"];

const PayTable = ({ payList }: Props) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {tHeads.map((head, idx) => (
            <th key={idx}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {payList.length > 0 &&
          payList.map((item, idx) => (
            <tr key={idx}>
              <td>
                <Profile>
                  <div className="txt">
                    <span className="name">{item.name}</span>
                  </div>
                </Profile>
              </td>
              <td>{item.worktime.split(":").slice(0, 2).join(":")}</td>
              <td>{Number(item.pay).toLocaleString()}</td>
              <td>{Number(item.totalWage).toLocaleString()}</td>
              <td>{item.isPaid ? <PayComplete /> : <PayGray />}</td>
            </tr>
          ))}
        {/* <tr>
          <td>
            <Profile>
              <div className="img"></div>
              <div className="txt">
                <span className="name">이모모</span>
                <span className="category">매니저</span>
              </div>
            </Profile>
          </td>
          <td>월, 화, 수, 금</td>
          <td>12:00~18:00</td>
          <td>현재 근무중</td>
          <td>
            <PayComplete />
          </td>
        </tr>
        <tr>
          <td>
            <Profile>
              <div className="img"></div>
              <div className="txt">
                <span className="name">김모모</span>
                <span className="category">직원</span>
              </div>
            </Profile>
          </td>
          <td>월, 화, 수, 금</td>
          <td>12:00~18:00</td>
          <td>현재 근무중</td>
          <td>
            <PayGray />
          </td>
        </tr> */}
      </tbody>
    </StyledTable>
  );
};

export default PayTable;
