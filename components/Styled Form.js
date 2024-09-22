import styled from "styled-components";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 3px solid #000;
  border-radius: 1rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

export const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 3px solid black;
  border-radius: 0.5rem;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    border-color: lightsalmon;
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  font-size: 1rem;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.75rem;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    border-color: lightsalmon;
    outline: none;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;
