// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import React, { useState, useEffect } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";
// import VerifyOtpPage from "./pages/VerifyOtpPage";
// import api from "./services/api";
// import { FaBars, FaIndent, FaOutdent } from "react-icons/fa"; // Replace arrows with better sidebar toggle icons

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     margin: 0;
//     padding: 0;
//     background: #f0f2f5;
//     color: #333;
//     font-family: 'Roboto', sans-serif;
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   background: #f0f2f5;
//   margin: 0;
//   padding: 0;
//   position: relative;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   padding-top: 3.5rem;
//   margin: 0;
//   background-color: white;
//   overflow-x: hidden;
//   position: relative;
//   min-height: calc(100vh - 3.5rem);
// `;

// const MainArea = styled.div`
//   display: flex;
//   flex: 1;
//   width: 100%;
//   position: relative;
//   border-bottom: none; /* Remove any bottom border */
// `;

// // Update FooterWrapper to ensure it spans full width
// const FooterWrapper = styled.div`
//   position: relative;
//   width: 100%; /* Ensure the footer spans the full width */
//   margin: 0;
//   padding: 0;
//   background-color: #f0f2f5; /* Match footer background */
//   box-shadow: 0 -1px 0 #ddd;
// `;

// const MainContentWrapper = styled.div`
//   width: ${(props) =>
//     props.isSidebarVisible ? "calc(100% - 250px)" : "calc(100% - 250px)"};
//   max-width: ${(props) =>
//     props.isSidebarVisible ? "none" : "calc(100% - 50px)"};
//   position: relative;
//   margin-left: ${(props) => (props.isSidebarVisible ? "250px" : "auto")};
//   margin-right: ${(props) => (props.isSidebarVisible ? "0" : "auto")};
//   transition: margin 0.3s ease-in-out;
//   border-left: ${(props) =>
//     props.isSidebarVisible ? "1px solid #ddd" : "none"};
//   display: flex;
//   flex-direction: column;
//   min-height: calc(100vh - 3.5rem - 88px); /* Minus header and footer heights */
// `;

// const MainContent = styled.main`
//   flex: 1;
//   padding: 0 0 2rem 0;
//   background: white;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 150vh; /* Make content taller than viewport to force scrolling */
// `;

// const App = () => {
//   const [activeTool, setActiveTool] = useState("image-caption");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   // Remove isFeedbackModalOpen state

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev);
//   };

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         await api.checkAuth();
//         setIsLoggedIn(true);
//       } catch (error) {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   return (
//     <>
//       <GlobalStyle />
//       <Router>
//         <Routes>
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
//           <Route
//             path="/"
//             element={
//               <Container>
//                 <Header />
//                 <ContentWrapper>
//                   <MainArea>
//                     <Sidebar
//                       activeToolId={activeTool}
//                       onToolSelect={setActiveTool}
//                       isVisible={isSidebarVisible}
//                       // Remove feedback modal props
//                     />
//                     {/* Simplify button without feedback modal logic */}
//                     <button
//                       onClick={toggleSidebar}
//                       style={{
//                         position: "fixed",
//                         top: "4.25rem",
//                         left: isSidebarVisible ? "245px" : "5px",
//                         zIndex: 1500,
//                         padding: "0.5rem",
//                         backgroundColor: "transparent",
//                         color: "#666",
//                         border: "none",
//                         borderRadius: "0.25rem",
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         transition: "color 0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.target.style.color = "rgb(17, 24, 39)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.color = "#666";
//                       }}
//                     >
//                       {isSidebarVisible ? (
//                         <FaOutdent size={18} />
//                       ) : (
//                         <FaIndent size={18} />
//                       )}
//                     </button>
//                     <MainContentWrapper isSidebarVisible={isSidebarVisible}>
//                       <MainContent>
//                         <HomePage
//                           activeTool={activeTool}
//                           isLoggedIn={isLoggedIn}
//                         />
//                       </MainContent>
//                     </MainContentWrapper>
//                   </MainArea>
//                   {/* Footer spans the full width */}
//                   <FooterWrapper>
//                     <Footer />
//                   </FooterWrapper>
//                 </ContentWrapper>
//               </Container>
//             }
//           />
//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import api from "./services/api";
import { FaBars, FaIndent, FaOutdent } from "react-icons/fa"; // Replace arrows with better sidebar toggle icons

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
  margin: 0;
  padding: 0;
  position: relative;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 3.5rem;
  margin: 0;
  background-color: white;
  overflow-x: hidden;
  position: relative;
  min-height: calc(100vh - 3.5rem);
`;

const MainArea = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  position: relative;
  border-bottom: none; /* Remove any bottom border */
`;

// Update FooterWrapper to ensure a consistent border with the header
const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white; /* Changed from #f0f2f5 to white */
  border-top: 1px solid #ddd; /* Match the header's border-bottom */
  box-shadow: none; /* Remove the shadow that was creating inconsistency */
  z-index: 101; /* Ensure footer is above sidebar */
`;

const MainContentWrapper = styled.div`
  width: ${(props) =>
    props.isSidebarVisible ? "calc(100% - 250px)" : "calc(100% - 250px)"};
  max-width: ${(props) =>
    props.isSidebarVisible ? "none" : "calc(100% - 50px)"};
  position: relative;
  margin-left: ${(props) => (props.isSidebarVisible ? "250px" : "auto")};
  margin-right: ${(props) => (props.isSidebarVisible ? "0" : "auto")};
  transition: margin 0.3s ease-in-out;
  border-left: none; /* Remove the left border as it's now handled by the sidebar */
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3.5rem - 88px);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0 0 2rem 0;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 150vh; /* Make content taller than viewport to force scrolling */
`;

const App = () => {
  const [activeTool, setActiveTool] = useState("image-caption");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  // Remove isFeedbackModalOpen state

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await api.checkAuth();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
          <Route
            path="/"
            element={
              <Container>
                <Header />
                <ContentWrapper>
                  <MainArea>
                    <Sidebar
                      activeToolId={activeTool}
                      onToolSelect={setActiveTool}
                      isVisible={isSidebarVisible}
                      // Remove feedback modal props
                    />
                    {/* Simplify button without feedback modal logic */}
                    <button
                      onClick={toggleSidebar}
                      style={{
                        position: "fixed",
                        top: "4.25rem",
                        left: isSidebarVisible ? "245px" : "5px",
                        zIndex: 1500,
                        padding: "0.5rem",
                        backgroundColor: "transparent",
                        color: "#666",
                        border: "none",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "rgb(17, 24, 39)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#666";
                      }}
                    >
                      {isSidebarVisible ? (
                        <FaOutdent size={18} />
                      ) : (
                        <FaIndent size={18} />
                      )}
                    </button>
                    <MainContentWrapper isSidebarVisible={isSidebarVisible}>
                      <MainContent>
                        <HomePage
                          activeTool={activeTool}
                          isLoggedIn={isLoggedIn}
                        />
                      </MainContent>
                    </MainContentWrapper>
                  </MainArea>
                  {/* Footer spans the full width */}
                  <FooterWrapper>
                    <Footer />
                  </FooterWrapper>
                </ContentWrapper>
              </Container>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
