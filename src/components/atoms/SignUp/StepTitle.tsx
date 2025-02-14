import styled from "styled-components";

interface Props {
  number?: number;
  text?: string;
  $bold?: boolean;
  $active?: boolean;
}

const StepTitle = ({
  number = 1,
  text = "개인정보 동의",
  $bold = true,
  $active = false
}: Props) => {
  return (
    <Wrap>
      <Icon $bold={$bold} $active={$active}>
        {number}
      </Icon>
      <Text $bold={$bold} $active={$active}>
        {text}
      </Text>
    </Wrap>
  );
};

export default StepTitle;

const Wrap = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
`;

const Icon = styled.div<Props>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $bold, $active }) => ($bold || $active ? "var(--main-1)" : "white")};
  color: ${({ $bold, $active }) => ($bold || $active ? "white" : "var(--main-4)")};
`;

const Text = styled.div<Props>`
  font-weight: ${({ $bold }) => ($bold ? 600 : 500)};
  font-size: ${({ $bold }) => ($bold ? "28px" : "20px")};
  color: ${({ $bold, $active }) => ($bold || $active ? "var(--main-1)" : "var(--main-4)")};
`;
