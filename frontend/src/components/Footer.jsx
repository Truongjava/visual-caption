// import styled from "styled-components";

// const FooterContainer = styled.footer`
//   background-color: #f0f2f5;
//   border-top: 1px solid #ddd;
//   width: 100%;
//   padding: 2rem 0;
//   margin: 0; /* Ensure no margin */
// `;

// const FooterContent = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 1rem;
// `;

// const FooterNav = styled.nav`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1.5rem;
// `;

// const FooterLink = styled.a`
//   color: #444;
//   text-decoration: none;
//   font-size: 0.875rem;
//   &:hover {
//     text-decoration: underline;
//     color: #111;
//   }
// `;

// const FooterText = styled.p`
//   color: #444;
//   font-size: 0.875rem;
// `;

// const Footer = () => {
//   return (
//     <FooterContainer>
//       <FooterContent>
//         <FooterNav>
//           <FooterText>
//             © 2025 Visual Captioning. All rights reserved.
//           </FooterText>
//           <FooterLink href="#">Privacy Policy</FooterLink>
//           <FooterLink href="#">Terms</FooterLink>
//           <FooterLink href="#">Contact Us</FooterLink>
//         </FooterNav>
//       </FooterContent>
//     </FooterContainer>
//   );
// };

// export default Footer;



import styled from "styled-components";
import { BsHeartFill } from "react-icons/bs"; // Changed from BsHeart to BsHeartFill for filled heart

const FooterContainer = styled.footer`
  background-color: white;
  width: 100%;
  padding: 2rem 0;
  margin: 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between; /* Change to space-between to push content apart */
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const LeftNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Space between items */
`;

const RightNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* Add small gap for icon and text alignment */
`;

const FooterLink = styled.a`
  color: #444;
  text-decoration: underline; /* Always show underline */
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Increased gap between icon and text from 0.25rem to 0.5rem */
  &:hover {
    color: #111;
  }
`;

const FooterText = styled.p`
  color: #444;
  font-size: 0.875rem;
  margin-right: 1.5rem; /* Add space after copyright text */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LeftNavGroup>
          <FooterText>
            © 2025 Visual Captioning. All rights reserved.
          </FooterText>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
        </LeftNavGroup>
        <RightNavGroup>
          <FooterLink href="#">
            <BsHeartFill style={{ color: "#ff0000" }} />{" "}
            {/* Changed color to a stronger red (#ff0000) and using filled heart */}
            Contact Us
          </FooterLink>
        </RightNavGroup>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
