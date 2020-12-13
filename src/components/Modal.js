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
    background: linear-gradient(45deg, #1f3059, #1b2a4e 40%, #243869);
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

class Modal extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <StyledModal>
        <div data-testid="modal-container" className="inner">
          <img
            src={close}
            alt=""
            height={15}
            width={15}
            onClick={this.onClose}
            className="close-btn"
            color="red"
            data-testid="close-modal-button"
          />
          <div>
            <h2>Launch Information</h2>
            <div>{}</div>
          </div>
          <div className="send-btn">
            <Button
              type="submit"
              onClick={this.onClose}
              data-testid="modal-send-button"
            >
              Send
            </Button>
          </div>
        </div>
      </StyledModal>
    );
  }
}

export default Modal;
