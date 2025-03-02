import Button from "components/atoms/Button";
import { getDayShort } from "hooks/Manage";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<"ask" | "add">>;
  setEmploId: Dispatch<SetStateAction<number>>;
  employerData: any;
}

const tHeads = ["이름", "근무일", "근무시간", "근무시작일", "근무종료일", ""];

const Table = ({ setModalType, setIsModalActive, setEmploId, employerData }: Props) => {
  const handleClickEdit = (event: any, id: number) => {
    event.stopPropagation();
    setModalType("add");
    setIsModalActive(true);
    setEmploId(id);
  };

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
        {employerData ? (
          employerData?.map((data: any, idx: string) => (
            <tr key={idx}>
              <td>
                <Profile>
                  <div className="txt">
                    <span className="name">{data.name}</span>
                    <span className="category">{data.contact}</span>
                  </div>
                </Profile>
              </td>
              <td>{getDayShort(data.scheduleList)}</td>
              <td>
                {data.scheduleList.find((item: any) => !item.isAdditional).startTime.slice(0, 5) +
                  "~" +
                  data.scheduleList.find((item: any) => !item.isAdditional).endTime.slice(0, 5)}
              </td>
              <td>{data.startDate}</td>
              <td>현재 근무 중</td>
              <td>
                <Button
                  text="편집하기"
                  area={2}
                  isOutline={true}
                  onClick={(e) => handleClickEdit(e, data.id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
        <td></td>
      </tbody>
    </StyledTable>
  );
};

export default Table;

export const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  max-height: 746px;
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
    width: 160px;
  }
`;

export const Profile = styled.div`
  min-width: 112px;
  height: 52px;
  padding: 0 0 0 36px;
  display: flex;
  gap: 12px;
  align-items: center;

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
