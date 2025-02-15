import Button from "components/atoms/Button";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  isModalActive: boolean;
}

const tHeads = ["이름", "근무일", "근무시간", "근무시작일", "근무종료일", ""];

const Table = ({ setIsModalActive, isModalActive }: Props) => {
  const handleClickEdit = (event: any) => {
    event.stopPropagation();
    setIsModalActive(true);
  };

  useEffect(() => {
    console.log(isModalActive);
  }, [isModalActive]);

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
          <td>2024.11.01</td>
          <td>현재 근무중</td>
          <td>
            <Button text="편집하기" area={2} isOutline={true} onClick={handleClickEdit} />
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </StyledTable>
  );
};

export default Table;

const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  font-size: 18px;
  table-layout: fixed;

  thead {
    th {
      height: 54px;
      font-weight: 600;
      text-align: left;
      border-bottom: 1px solid #e5e5e5;
    }
  }

  tr {
    padding: 16px 36px;

    td {
      height: 84px;
      border-bottom: 1px solid #e5e5e5;
    }
  }

  th:nth-child(1) {
    padding-left: 84px;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 326px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 206px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 342px;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 237px;
  }

  th:nth-child(5),
  td:nth-child(5) {
    width: 223px;
  }

  th:nth-child(6),
  td:nth-child(6) {
    width: 184px;
  }
`;

const Profile = styled.div`
  min-width: 112px;
  height: 52px;
  padding: 0 0 0 36px;
  display: flex;
  gap: 12px;
  align-items: center;

  div.img {
    border-radius: 18px;
    width: 52px;
    height: 52px;
    background: #d9d9d9;
  }

  div.txt {
    display: flex;
    flex-direction: column;

    span.name {
      font-weight: 600;
      font-size: 20px;
    }

    span.category {
      font-weight: 400;
      font-size: 16px;
      color: #8f8f8f;
    }
  }
`;
