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
  background-color: ${(props) => props.theme.colors.pale_green};
  margin-bottom: 2px;
  padding: 0.5rem 1rem;
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
    flex-direction: row;
    justify-content: space-between;
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
  .more-details-btn {
    margin-top: 180px;
    ${respondTo("small", "max")} {
      margin-top: 10px;
    }
  }
`;

const ResultCard = (props) => {
  const { results } = props.history.location.state;
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [character, setCharacter] = useState([]);

  const showModal = () => {
    setShow(!show);
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
        }
      })
      .catch((error) => {
        return setError(error);
      });
  };

  const clear = () => {
    props.history.push("/");
  };

  const { id, name, status, species, type, gender } = character;

  return (
    <>
      <StyledPageCover>
        {results &&
          results.map((result, i) => (
            <StyledCard key={i}>
              <div className="search-card-cover">
                <div>
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
                </div>
                <div className="more-details-btn">
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
            </StyledCard>
          ))}
      </StyledPageCover>
      {show && (
        <Modal onClose={showModal} show={show}>
          <img src={character && character.image} alt="character image" />
          <div className="content">
            <div>
              <label>Id: {id}</label>
              <br />
              <label>Name: {name}</label>
              <br />
              <label>Status: {status}</label>
              <br />
              <label>Species: {species}</label>
              <br />
              <label>Types: {type}</label>
              <br />
              <label>Gender: {gender}</label>
              <br />
              <br />
            </div>
          </div>
        </Modal>
      )}
      <Button
        onClick={(e) => {
          e.preventDefault();
          clear();
        }}
      >
        Clear
      </Button>
      <Button>Pagination</Button>
    </>
  );
};

export default withRouter(ResultCard);
