import React, { useState } from "react";
import styled from "styled-components";
import { BsImage, BsYoutube, BsBook, BsChatDots } from "react-icons/bs";
import FeedbackModal from "./FeedbackModal"; // Import the feedback modal component

const SidebarContainer = styled.aside`
  width: ${(props) => (props.isVisible ? "250px" : "0")};
  background-color: white;
  /* Removed box-shadow to eliminate the underline effect */
  position: fixed;
  top: 3.5rem; /* Adjusted top to match the new header height */
  bottom: 80px; /* Adjusted bottom to account for footer height */
  left: 0;
  overflow-x: hidden; /* Prevent horizontal overflow */
  overflow-y: ${(props) => (props.isVisible ? "auto" : "hidden")};
  transition: width 0.3s ease-in-out;
  z-index: 100; /* Set a z-index that's higher than content but lower than modals */
`;

const Nav = styled.nav`
  padding: ${(props) => (props.isVisible ? "0.5rem 1rem" : "0")};
  width: 250px; /* Fixed width to prevent content from jumping */
  overflow: hidden;
  transition: padding 0.3s ease-in-out;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.25rem; /* Add a small top margin instead of relying solely on Nav padding */
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
`;

const Li = styled.li`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem; /* Reduced vertical padding slightly from 0.75rem */
  background-color: ${(props) =>
    props.active
      ? "#e5e7eb"
      : "transparent"}; /* Match hover background color for active state */
  color: ${(props) =>
    props.active
      ? "#000"
      : "#666"}; /* Match hover text color for active state */
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #e5e7eb; /* Lighter gray background on hover */
    color: #000;
  }

  span {
    margin-right: 0.5rem;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 1rem 0;
  width: 100%;
`;

const FeedbackButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center; /* Center the content */
  padding: 0.75rem 1rem;
  background-color: rgba(229, 231, 235, 0.1); /* Lighter initial background */
  color: #666;
  border: 1px solid #ddd; /* Add border */
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #e5e7eb; /* Lighter gray background on hover */
    color: #000; /* Match the text color with the other buttons */
  }

  span {
    margin-right: 0.5rem;
  }
`;

const Sidebar = ({ activeToolId, onToolSelect, isVisible }) => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // Add state locally

  const tools = [
    {
      id: "dashboard",
      name: "Content Dashboard",
      icon: <BsBook size={20} />,
    },
    {
      id: "image-caption",
      name: "Image Caption",
      icon: <BsImage size={20} />,
    },
    {
      id: "video-title",
      name: "Youtube Video Title",
      icon: <BsYoutube size={20} />,
    },
  ];

  const handleFeedback = () => {
    setIsFeedbackModalOpen(true);
  };

  return (
    <>
      <SidebarContainer isVisible={isVisible}>
        <Nav isVisible={isVisible}>
          <Ul>
            {tools.map((tool) => (
              <Li key={tool.id}>
                <Button
                  active={activeToolId === tool.id}
                  onClick={() => onToolSelect(tool.id)}
                >
                  <span>{tool.icon}</span>
                  <span>{tool.name}</span>
                </Button>
              </Li>
            ))}
            <Divider />
            <Li>
              <FeedbackButton onClick={handleFeedback}>
                <span>
                  <BsChatDots size={20} />
                </span>
                <span>Feedback</span>
              </FeedbackButton>
            </Li>
          </Ul>
        </Nav>
      </SidebarContainer>

      {isFeedbackModalOpen && (
        <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
