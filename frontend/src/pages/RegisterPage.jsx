import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const RegisterCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const RegisterTitle = styled.h2`
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

const RegisterButton = styled.button`
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

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError(null);
      await api.register({ email, password });
      toast.success("Vui lòng kiểm tra email để lấy mã OTP!");
      navigate("/auth/verify-otp", { state: { email } });
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterTitle>Sign Up</RegisterTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLabel>Confirm Password</FormLabel>
        <FormInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <RegisterButton onClick={handleRegister}>Sign Up</RegisterButton>
      </RegisterCard>
      <ToastContainer />
    </RegisterContainer>
  );
};

export default RegisterPage;
