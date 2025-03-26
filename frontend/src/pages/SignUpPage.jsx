import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimesCircle } from "react-icons/fa";
import api from "../services/api";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const SignUpCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const SignUpTitle = styled.h2`
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

const SignUpButton = styled.button`
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
  color: rgb(0, 0, 0);
  background-color: white;
  border: 1px solid #ee2c4a;
  border-radius: 0.25rem;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      setError(null);
      await api.register(email, password);
      toast.success("Sign up successful!");
      navigate("/signin", { replace: true });
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <SignUpContainer>
      <SignUpCard>
        <SignUpTitle>Sign Up</SignUpTitle>
        {error && (
          <ErrorMessage>
            <FaTimesCircle color="#ee2c4a" />
            {error}
          </ErrorMessage>
        )}
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FormLabel>Confirm Password</FormLabel>
        <FormInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
      </SignUpCard>
      <ToastContainer />
    </SignUpContainer>
  );
};

export default SignUpPage;
