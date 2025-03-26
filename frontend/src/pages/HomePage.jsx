import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ImageCaptionForm from "../components/ImageCaptionForm";
import VideoTitleForm from "../components/VideoTitleForm";
import Dashboard from "../components/Dashboard";

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  overflow-y: auto;
  min-height: 120vh; /* Make the page content taller */
  padding-bottom: 4rem;
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
  flex-shrink: 0;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  padding: 0;
  text-align: center;
`;

const ExtraSpace = styled.div`
  height: 60vh; /* Add extra space to make page scrollable */
  width: 100%;
`;

const HomePage = ({ activeTool, isLoggedIn }) => {
  const [activeToolState, setActiveTool] = useState("image-caption");
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTool(activeTool);
  }, [activeTool]);

  return (
    <MainContent>
      <Card>
        <CardTitle>
          {activeToolState === "dashboard"
            ? ""
            : activeToolState === "image-caption"
            ? "Image Caption"
            : "Youtube Video Title"}
        </CardTitle>
        {activeToolState === "dashboard" ? (
          <Dashboard />
        ) : activeToolState === "image-caption" ? (
          <ImageCaptionForm />
        ) : (
          <VideoTitleForm />
        )}
      </Card>
      <ExtraSpace /> {/* Add extra space to force scrolling */}
    </MainContent>
  );
};

export default HomePage;
