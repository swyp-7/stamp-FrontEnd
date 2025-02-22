import {
  SignAgreeWrap,
  SignLabel,
  SignLabelWrap,
  SignPersonal
} from "components/atoms/SignUp/SignUpAtoms";
import { terms1 } from "constants/TermsText";
import { Dispatch, Fragment, SetStateAction } from "react";

interface Props {
  agree: boolean[];
  setAgree: Dispatch<SetStateAction<boolean[]>>;
}

const SignStep1 = ({ agree, setAgree }: Props) => {
  const handleRadioChange = (index: number) => {
    const newAgree = [...agree];
    newAgree[index] = !newAgree[index];
    setAgree(newAgree);
  };

  return (
    <>
      <SignLabelWrap>
        <SignLabel>개인정보보호법의 이름</SignLabel>
        <SignAgreeWrap>
          <label htmlFor="agree1">동의하기</label>
          <input
            type="radio"
            id="agree1"
            checked={agree[0]}
            onChange={() => handleRadioChange(0)}
          />
        </SignAgreeWrap>
      </SignLabelWrap>
      <SignPersonal style={{ marginBottom: "70px" }}>
        {terms1.split("\n").map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </SignPersonal>
      <SignLabelWrap>
        <SignLabel>개인정보보호법의 이름</SignLabel>
        <SignAgreeWrap>
          <label htmlFor="agree2">동의하기</label>
          <input
            type="radio"
            id="agree2"
            checked={agree[1]}
            onChange={() => handleRadioChange(1)}
          />
        </SignAgreeWrap>
      </SignLabelWrap>
      <SignPersonal style={{ marginBottom: "30px" }}>
        {terms1.split("\n").map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </SignPersonal>
    </>
  );
};

export default SignStep1;
