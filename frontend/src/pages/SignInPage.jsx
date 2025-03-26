import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimesCircle } from "react-icons/fa";
import api from "../services/api";

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const SignInCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const SignInTitle = styled.h2`
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

const SignInButton = styled.button`
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

const SignUpLink = styled(Link)`
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpText = styled(Link)`
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setError(null);
      await api.login(email, password);
      toast.success("Sign in successful!");
      navigate("/", { replace: true });
    } catch (err) {
      setError("Login failed. Check your details.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <SignInContainer>
      <SignInCard>
        <SignInTitle>Sign In</SignInTitle>
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
        <SignInButton onClick={handleSignIn}>Sign In</SignInButton>
      </SignInCard>
      <SignUpText to="/signup">Don't have an account? Sign up</SignUpText>
      <ToastContainer />
    </SignInContainer>
  );
};

export default SignInPage;
