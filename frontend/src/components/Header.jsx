import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: white;
  border-bottom: 1px solid #ddd;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100; /* Increased z-index */
  padding: 0.25rem 0;
  height: 3.5rem;
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  min-width: 320px; /* Added min-width to prevent excessive squeezing */
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  position: relative; /* Added position relative */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: visible; /* Changed from hidden to visible */
  min-width: 180px; /* Added minimum width */
  position: absolute; /* Fixed positioning */
  left: 1rem; /* Fixed distance from left */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Center vertically */
  z-index: 5; /* Ensure it's above other elements */
`;

const Logo = styled.img`
  height: 1.8rem;
  width: 1.8rem;
  object-fit: contain;
  margin-top: 0;
  flex-shrink: 0; /* Prevent logo from shrinking */
`;

const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-left: 0.5rem;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  flex-shrink: 0; /* Prevent text from shrinking */
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.9rem;
  border: 2px solid rgb(17, 24, 39);
  border-radius: 0.25rem;
  background-color: transparent;
  color: rgb(17, 24, 39);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  margin-left: auto; /* Pushed to the right edge */
  position: absolute; /* Fixed positioning */
  right: 1rem; /* Fixed distance from right */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Center vertically */

  &:hover {
    background-color: rgb(17, 24, 39);
    color: white;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer onClick={handleLogoClick}>
          <Logo src="/Captions2.png" alt="Logo" />
          <Title>Visual Captioning</Title>
        </LogoContainer>
        <SignInButton onClick={handleSignIn}>Sign in</SignInButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
