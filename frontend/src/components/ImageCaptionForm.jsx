import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsUpload } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa"; // Import biểu tượng loading
import api from "../services/api";

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  padding: 0;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const UploadText = styled.p`
  margin-top: 0.5rem;
  color: #666;
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

const ImagePreview = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    border-radius: 0.25rem;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  font-size: 2rem;
  color: rgb(17, 24, 39);

  .spinner {
    animation: ${spin} 1s linear infinite;
  }
`;

const ImageCaptionForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State để quản lý trạng thái loading

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setLoading(true); // Bắt đầu loading
    setImageCaption("");
    setError("");

    try {
      const response = await api.generateImageCaption(selectedFile);
      if (response.status === 200 && response.data) {
        if (typeof response.data === "string") {
          setImageCaption(response.data);
        } else if (response.data.caption) {
          setImageCaption(response.data.caption);
        } else {
          throw new Error("Unexpected response format");
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to generate caption. Please try again.");
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <>
      <FormLabel>Upload Image</FormLabel>
      <UploadBox onClick={() => document.getElementById("fileInput").click()}>
        <BsUpload size={40} color="rgb(17, 24, 39)" />
        <UploadText>Click to upload or drag and drop</UploadText>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </UploadBox>

      {selectedFile && (
        <ImagePreview>
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
        </ImagePreview>
      )}

      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "GENERATE"}
      </Button>

      {loading && (
        <LoadingSpinner>
          <FaSpinner className="spinner" />
        </LoadingSpinner>
      )}

      {imageCaption && (
        <ResultBox>
          <h3 className="font-medium mb-2">Result:</h3>
          <p className="text-gray-700">{imageCaption}</p>
        </ResultBox>
      )}

      {error && (
        <ResultBox>
          <h3 className="font-medium mb-2">Error:</h3>
          <p className="text-red-700">{error}</p>
        </ResultBox>
      )}
    </>
  );
};

export default ImageCaptionForm;
