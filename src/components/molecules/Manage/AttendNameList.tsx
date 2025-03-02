import { EmploName, EmplosWrap } from "components/atoms/Manage/AttendAtoms";
import { useEffect, useRef, useState } from "react";

interface Props {
  list: any[];
}

const DOTS_WIDTH = 40; // "..." 요소의 예상 너비
const PADDING = 4; // EmploName 간 여백 포함

const getVisibleNames = (list: { name: string }[], containerWidth: number) => {
  let totalWidth = 0;
  let visible: { name: string }[] = [];

  for (let i = 0; i < list.length; i++) {
    const nameWidth = list[i].name.length * 15 + PADDING; // 문자당 대략 10px 가정
    if (totalWidth + nameWidth > containerWidth - DOTS_WIDTH) {
      return [...visible, { name: "..." }];
    }
    visible.push(list[i]);
    totalWidth += nameWidth;
  }

  return visible;
};

const AttendNameList = ({ list }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleList, setVisibleList] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setVisibleList(getVisibleNames(list, containerWidth));
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [list]);

  return (
    <EmplosWrap ref={containerRef}>
      {visibleList.map((item, idx) => (
        <EmploName key={idx}>{item.name}</EmploName>
      ))}
    </EmplosWrap>
  );
};

export default AttendNameList;
