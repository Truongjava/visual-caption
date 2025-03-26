import { useState } from "react";
import styled from "styled-components";
import { FaYoutube } from "react-icons/fa";
import api from "../services/api";

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  padding: 0;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(17, 24, 39);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 0.5rem;

  &:hover {
    background-color: rgb(17, 24, 39);
  }
`;

const ResultBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f0f2f5;
  border-radius: 0.25rem;
`;

const VideoInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Thumbnail = styled.img`
  width: 120px;
  height: auto;
  border-radius: 0.5rem;
`;

const VideoDetails = styled.div`
  flex: 1;
`;

const VideoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const VideoDomain = styled.p`
  font-size: 0.875rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VideoTitleForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);

    const videoId = extractVideoId(url);
    if (videoId) {
      fetchVideoDetails(videoId);
    }
  };

  const extractVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoDetails = async (videoId) => {
    const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch video details");
      const data = await response.json();
      setVideoTitle(data.title);
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setVideoTitle("Could not retrieve video details");
      setThumbnailUrl("");
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await api.generateVideoTitle(videoUrl);
      setCaption(response.data.title);
    } catch (error) {
      console.error("Error generating title:", error);
      setCaption("Failed to generate title. Please try again.");
    }
  };

  return (
    <>
      <FormLabel>YouTube Video URL</FormLabel>
      <FormInput
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={handleUrlChange}
      />

      {videoTitle && (
        <VideoInfoContainer>
          {thumbnailUrl && <Thumbnail src={thumbnailUrl} alt="Thumbnail" />}
          <VideoDetails>
            <VideoDomain>
              <FaYoutube color="red" /> youtube.com
            </VideoDomain>
            <VideoTitle>{videoTitle}</VideoTitle>
          </VideoDetails>
        </VideoInfoContainer>
      )}

      <Button onClick={handleGenerate}>GENERATE</Button>

      {caption && (
        <ResultBox>
          <h3 className="font-medium mb-2">Result:</h3>
          <p className="text-gray-700">{caption}</p>
        </ResultBox>
      )}
    </>
  );
};

export default VideoTitleForm;
