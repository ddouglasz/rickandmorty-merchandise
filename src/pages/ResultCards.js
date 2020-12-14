import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../utils/Buttons";
import { withRouter } from "react-router";
import { respondTo } from "../utils/stylesHelper.js";
import { getOneCharacter } from "../actions/index";
import Modal from "../components/Modal";
import { characterNames } from "../utils/shrekCharacterNames";

const StyledPageCover = styled.div`
  padding: 15px 20px;
`;

const StyledCard = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.grayLight};
  margin-bottom: 2px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${respondTo("small", "max")} {
    padding: 0.5rem 1rem;
  }
  .text {
    margin: 1rem;
    ${respondTo("small", "max")} {
      margin: 0.1rem;
    }
  }
  .img-small {
    width: 100px;
    height: 100px;
  }
  .search-card-cover {
    display: flex;
    ${respondTo("small", "max")} {
      display: block;
    }
  }
  .search-texts-cover {
    display: block;
    margin: auto;
    padding: auto;
  }
  .character-name-result {
    color: ${(props) => props.theme.colors.lime_green};
  }
`;

const ResultCard = (props) => {
  const { state } = props.history.location;
  const { results } = props.history.location.state;
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [character, setCharacter] = [];

  const showModal = () => {
    return setShow(!show);
  };
  const showDetails = (id) => {
    getOneCharacter(id)
      .then((result) => {
        if (result.error) {
          return setError(result.error);
        }
        if (result && result.length !== 0) {
          showModal();
          setCharacter(result);
          console.log("got here", () => result);
        }
      })
      .catch((error) => {
        return setError(error);
      });
  };
  console.log("show", show);
  return (
    <>
      <StyledPageCover>
        {results &&
          results.map((result, i) => (
            <StyledCard key={i}>
              <div>
                <div className="search-card-cover">
                  <img
                    className="img-small"
                    src={result.image}
                    alt="character image"
                  />
                  <div className="search-texts-cover">
                    <div className="text name">
                      <strong className="character-name">Character Name</strong>
                      :{" "}
                      <span className="character-name-result">
                        {result.name}
                      </span>
                    </div>
                    <div className="text episodes">
                      <strong className="character-name">
                        Number Of Episodes
                      </strong>
                      : {result.episode.length}
                    </div>
                    <div className="text location">
                      <strong className="character-name">Last Location</strong>:{" "}
                      {result.location.name}
                    </div>
                  </div>
                  <div
                    data-testid="history-card-link-element"
                    id="history-card-btn"
                  >
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        showDetails(result.id);
                      }}
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
            </StyledCard>
          ))}
      </StyledPageCover>
      {show && (
        <Modal onClose={showModal} onBlur={showModal} show={show}>
          {character && console.log("chh==========", character)}
          <img src={character && character.image} alt="character image" />
          <div className="content">
            <div>
              <h2>Select information to share</h2>
              <input
                type="checkbox"
                data-testid="modal-input-elements"
                name=""
                value=""
              />
              <label>Flight Number: </label>
              <br />
              <input
                type="checkbox"
                data-testid="modal-input-elements"
                name=""
                value=""
              />
              <label>Mission Name: </label>
              <br />
              <input
                type="checkbox"
                data-testid="modal-input-elements"
                name=""
                value=""
              />
              <label> Launch Year: </label>
              <br />
              <br />
            </div>
          </div>
        </Modal>
      )}
      <Button>Clear</Button> //Todo
      <Button>Pagination</Button> //Todo
    </>
  );
};

export default withRouter(ResultCard);
