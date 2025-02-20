import Button from "components/atoms/Button";
import { Profile, StyledTable } from "./Table";

const tHeads = ["이름", "근무시간", "시급", "지급예정금액", "급여 지급 상태"];

const PayTable = () => {
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
        <tr>
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
            <Button text="편집하기" area={2} isOutline={true} />
          </td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default PayTable;
