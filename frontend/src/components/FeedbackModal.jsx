import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: rgb(79, 70, 229);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: rgb(79, 70, 229);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  align-self: flex-end;
  padding: 0.75rem 1.5rem;
  background-color: rgb(79, 70, 229);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(67, 56, 202);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FeedbackModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Please fill in this field");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!content.trim()) {
      setContentError("Please fill in this field");
      isValid = false;
    } else {
      setContentError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent default validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // You would implement actual API call here
      console.log("Submitting feedback:", { title, content });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message or handle response
      alert("Feedback submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Feedback</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="feedback-title">Title</Label>
            <Input
              id="feedback-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setTitleError("");
              }}
              placeholder="Add a title"
              ref={titleInputRef}
              aria-invalid={!!titleError}
            />
            {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="feedback-content">Content</Label>
            <TextArea
              id="feedback-content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (e.target.value.trim()) setContentError("");
              }}
              placeholder="Write your feedback here..."
              ref={contentInputRef}
              aria-invalid={!!contentError}
            />
            {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

// Add this styled component for error messages
const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export default FeedbackModal;
