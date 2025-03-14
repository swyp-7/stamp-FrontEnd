import styled from "styled-components";
import { ReactComponent as MegaphoneIcon } from "assets/Megaphone.svg";
import Button from "components/atoms/Button";
import { useSideInfoStore } from "store/ScheduleStore";
import { useStoreInfoStore } from "store/StoreStore";
import { fetchEmploAttendEdit, fetchMonthAttend } from "hooks/api/ManageAttend";
import { useEmployeeDetail } from "hooks/api/ManageQuery";
import { useEffect, useState } from "react";
import { processAttendanceData } from "utils/WorkDetailUtil";
import { ClipLoader } from "react-spinners";
import { transformScheduleEditData } from "utils/Schedule";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  height?: string;
}

const WorkDetail = ({ height }: Props) => {
  const queryClient = new QueryClient();
  const [editingTimes, setEditingTimes] = useState<
    { date: string; type: "punchInTime" | "punchOutTime"; value: string }[]
  >([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const { sideInfo } = useSideInfoStore();
  const { storeData } = useStoreInfoStore();
  const { data: attendData, refetch } = fetchMonthAttend(
    storeData?.id,
    sideInfo?.employeeId,
    sideInfo?.date
  );
  const { data } = useEmployeeDetail(storeData?.store.id, sideInfo?.employeeId);
  const { mutate } = fetchEmploAttendEdit();
  useEffect(() => {
    if (attendData && data) {
      setFormattedData(processAttendanceData(attendData?.data, data?.data?.scheduleList));
    }
  }, [attendData, data, isEditing]);

  const handleEditClick = (date: string, type: "punchInTime" | "punchOutTime", value: string) => {
    setEditingTimes((prev) => {
      const exists = prev.some((entry) => entry.date === date && entry.type === type);
      if (exists) return prev; // 이미 편집 중이면 변경 없음
      return [...prev, { date, type, value }];
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditingTimes([]); // 모든 편집 상태 초기화
    setIsEditing(false);
  };

  const handleChange = (date: string, type: "punchInTime" | "punchOutTime", newValue: string) => {
    setEditingTimes((prev) =>
      prev.map((entry) =>
        entry.date === date && entry.type === type ? { ...entry, value: newValue } : entry
      )
    );
  };

  const handleSubmit = () => {
    const data = [attendData.data[0].employeeId, ...editingTimes];
    const formData = transformScheduleEditData(data);

    mutate(formData, {
      onError: (err) => {
        console.log(err);
        alert("오류 발생");
      },
      onSuccess: () => {
        alert("수정 완료");
        setIsEditing(false);
        setEditingTimes([]);
        queryClient.invalidateQueries({ queryKey: ["monthOfAttend"] });
        refetch();
      }
    });
  };

  return (
    <WorkDetailWrap $height={height}>
      {!height && (
        <DetailTitle>
          <span>{sideInfo?.name} 님</span>
          <br />
          <span>근무정보</span>
        </DetailTitle>
      )}
      {formattedData.length ? (
        <DetailContentWrap $height={height}>
          {formattedData.map((item) => (
            <DetailContent key={item.date}>
              <div className="date">
                <div className="left">{item.formattedDate} 근무</div>
                {item.isToday && <div className="today">오늘</div>}
              </div>
              <div className="time">
                <div>근무시간</div>
                <div>
                  {item.scheduleStart === "-" || !item.scheduleStart
                    ? "추가 근무"
                    : `${item.scheduleStart}~${item.scheduleEnd}`}
                </div>
              </div>
              <StartAndEnd>
                <MegaphoneIcon />
                <div className="right">
                  {["punchInTime", "punchOutTime"].map((type) => {
                    const editEntry = editingTimes.find(
                      (entry) => entry.date === item.date && entry.type === type
                    );
                    return (
                      <div key={type} style={{ display: "flex", alignItems: "center" }}>
                        {editEntry ? (
                          <EditInput
                            value={editEntry.value}
                            onChange={(e) => handleChange(item.date, type as any, e.target.value)}
                            placeholder={item[type] || ""}
                          />
                        ) : (
                          <div
                            className="timeCell"
                            onClick={() => handleEditClick(item.date, type as any, item[type])}
                          >
                            {item[type]}
                          </div>
                        )}
                        <p>{type === "punchInTime" ? "에 출근," : "에 퇴근했습니다."}</p>
                      </div>
                    );
                  })}
                </div>
              </StartAndEnd>
            </DetailContent>
          ))}
        </DetailContentWrap>
      ) : (
        <ClipLoader className="loading" color="#4A3AFF" size={60} />
      )}
      <DetailButtonWrap>
        <Button
          text="취소하기"
          isOutline={true}
          area={1}
          disabled={!isEditing}
          onClick={handleCancel}
        />
        <Button text="저장하기" area={1} disabled={!isEditing} onClick={handleSubmit} />
      </DetailButtonWrap>
    </WorkDetailWrap>
  );
};

export default WorkDetail;

const WorkDetailWrap = styled.div<{ $height?: string }>`
  display: grid;
  grid-template-rows: ${({ $height }) => ($height === "616px" ? "1fr 81px" : "147px 1fr 81px")};
  height: ${({ $height }) => ($height ? $height : "100%")};
  min-height: 0;
  background-color: #fff;
  border-radius: 24px;

  .loading {
    justify-self: center;
    align-self: center;
  }
`;

const DetailTitle = styled.div`
  height: 147px;
  border-bottom: 1px solid #e5e5e5;
  padding: 36px;

  span:first-child {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 8px;
  }
  span:last-child {
    font-weight: 600;
    font-size: 28px;
  }
`;

const DetailContentWrap = styled.div<{ $height?: string }>`
  height: 100%;
  max-height: ${({ $height }) => ($height ? $height : "calc(652px - 147px - 81px)")};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #c5c5c5;
  }
`;

const DetailContent = styled.div`
  padding: 31px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }

  .date {
    display: flex;
    align-items: center;
    gap: 8px;

    .left {
      font-weight: 600;
      font-size: 24px;
    }

    .today {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 34px;
      height: 23px;
      border-radius: 4px;
      background: #ff5858;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .time {
    display: flex;
    justify-content: space-between;

    * {
      font-weight: 400;
      font-size: 20px;
    }
  }
`;

const StartAndEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 24px;
    height: 24px;
  }

  * {
    font-weight: 400;
    font-size: 16px;
  }

  .right {
    display: flex;
    align-items: center;
  }

  .timeCell {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-1);
    color: white;
    border-radius: 4px;
    margin: 0 2px;
    padding: 0 4px;
  }
`;

const DetailButtonWrap = styled.div`
  height: 81px;
  border-top: 1px solid #e5e5e5;
  padding: 14px 20px;
  display: flex;
  gap: 14px;
  justify-content: flex-end;
  /* border-radius: 0 0 24px 24px; */
`;

const EditInput = styled.input`
  width: 49px;
  height: 26px;
  border-radius: 4px;
  background-color: #d2c6fe;
  border: none;
  outline: none;
  margin: 0 2px;
  padding: 2px;
  text-align: center;
`;
