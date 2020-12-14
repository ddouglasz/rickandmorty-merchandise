import React from "react";
import styled from "styled-components";
import Button from "../utils/Buttons";
import close from "../assets/svg/close.svg";

const StyledModal = styled.div`
  position: fixed;
  background: #fff;
  width: 100%;
  height: 100%;
  margin: auto;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .inner {
    @media screen and (max-width: 736px) {
      margin: 1rem;
    }
    padding: 1rem;
    background: ${(props) => props.theme.colors.lemon_green};
    width: 30rem;
    position: relative;
  }

  .send-btn {
    display: flex;
    justify-content: flex-end;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Modal = (props) => {
  console.log(props);
  const onClose = (e) => {
    props && props.onClose(e);
  };
  const buyMerchandise = () => {
    alert("Hurray! Merchandise Purchase!");
  };
  return (
    <StyledModal>
      <div data-testid="modal-container" className="inner">
        <img
          src={close}
          alt=""
          height={15}
          width={15}
          onClick={() => onClose()}
          className="close-btn"
          color="red"
          data-testid="close-modal-button"
        />
        <div>
          <h2>Rick And Morty Character Information</h2>
          <div>{props.children}</div>
        </div>
        <div className="send-btn">
          <Button
            type="submit"
            onClick={() => buyMerchandise()}
            data-testid="modal-send-button"
          >
            Buy Merchandise
          </Button>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
