import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem;
  background-color: ${(props) =>
    props.danger ? "red" : props.theme.colors.lime_green};
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  cursor: pointer;
  width: 6rem;
`;

export default Button;
