import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <SpinnerWarp>
      <ClipLoader color="#4A3AFF" size={60} />
    </SpinnerWarp>
  );
};

export default LoadingSpinner;

const SpinnerWarp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
