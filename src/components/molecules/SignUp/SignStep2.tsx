import { SignDesc, SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import { BNoTextField } from "components/atoms/TextField";
import { useFetchBuisInfo } from "hooks/BuisnessQuery";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const SignStep2 = ({ register, watch }: Props) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const bNo = watch("bNo");
  const { mutate, data } = useFetchBuisInfo();
  const handleAuthBNo = () => {
    mutate(bNo);
  };

  useEffect(() => {
    console.log(bNo, data?.data[0].tax_type);
    if (data) {
      if (data?.data[0].tax_type !== "국세청에 등록되지 않은 사업자등록번호입니다.") {
        setIsAuthed(true);
      }
    }
  }, [data]);

  return (
    <>
      <SignDesc>페이지에 대한 설명이 들어갑니다</SignDesc>
      <SignLabel>사업자등록번호</SignLabel>
      <BNoTextField
        placeholder="숫자만 입력해주세요."
        type="number"
        style={{ fontSize: "18px" }}
        handleAuthBNo={handleAuthBNo}
        isAuthed={isAuthed}
        {...register("bNo")}
      />
    </>
  );
};

export default SignStep2;
