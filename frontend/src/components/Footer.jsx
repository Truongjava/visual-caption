import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f0f2f5;
  border-top: 1px solid #ddd;
  width: 100%;
  padding: 2rem 0;
  margin: 0; /* Ensure no margin */
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const FooterLink = styled.a`
  color: #444;
  text-decoration: none;
  font-size: 0.875rem;
  &:hover {
    text-decoration: underline;
    color: #111;
  }
`;

const FooterText = styled.p`
  color: #444;
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterNav>
          <FooterText>
            © 2025 Visual Captioning. All rights reserved.
          </FooterText>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
        </FooterNav>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
