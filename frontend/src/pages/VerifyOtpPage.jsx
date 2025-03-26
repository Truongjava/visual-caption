import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const VerifyOtpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const VerifyOtpCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const VerifyOtpTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const VerifyOtpButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(17, 24, 39);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgb(17, 24, 39);
  }
`;

const ErrorMessage = styled.p`
  color: white;
  background-color: rgb(17, 24, 39);
  border: 1px solid rgb(17, 24, 39);
  border-radius: 0.25rem;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleVerifyOtp = async () => {
    try {
      setError(null);
      await api.verifyOtp({ email, otp });
      toast.success("Xác thực thành công!");
      navigate("/signin");
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    }
  };

  return (
    <VerifyOtpContainer>
      <VerifyOtpCard>
        <VerifyOtpTitle>Verify OTP</VerifyOtpTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormLabel>OTP</FormLabel>
        <FormInput
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <VerifyOtpButton onClick={handleVerifyOtp}>Verify OTP</VerifyOtpButton>
      </VerifyOtpCard>
      <ToastContainer />
    </VerifyOtpContainer>
  );
};

export default VerifyOtpPage;
