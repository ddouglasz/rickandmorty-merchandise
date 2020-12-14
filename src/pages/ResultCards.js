import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../utils/Buttons";
import { withRouter } from "react-router";
import { respondTo } from "../utils/stylesHelper.js";
import { getOneCharacter } from "../actions/index";
import Modal from "../components/Modal";
import Pagination from "react-js-pagination";
import Loading from "../assets/loading.gif";

const StyledCover = styled.div`
  .active {
    border: solid 1px #03a9f4;
    background: ${(props) => props.theme.colors.selected};
    margin: 0 2px;
    padding: 10px;
  }
  li {
    padding: 10px;
    border: solid 1px #03a9f4;
  }
  .clear-btn {
    position: fixed;
    left: 20px;
    bottom: 10px;
  }
  .pagination {
    position: fixed;
    display: flex;
    right: 23px;
    bottom: 0;
    list-style: none;
  }
  .img-big {
    width: 150px;
    height: 150px;
  }
  .episodes-wrapper {
    height: 250px;
    margin-top: 5px;
    overflow-y: scroll;
  }
  .created {
    margin-bottom: 5px;
  }
  .episodes-or-character {
    background-color: ${(props) => props.theme.colors.grayLight};
    border-radius: ${(props) => props.theme.borders.borderRadius};
    margin: 2px 0;
    padding: 10px;
  }
  .character-episodes-header {
    margin: 5px 0;
    font-size: 20px;
    background-color: ${(props) => props.theme.colors.lemon_green};
  }
`;
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
    margin-bottom: 10px;
    ${respondTo("small", "max")} {
      margin: 0.1rem 0;
    }
  }
  .img-small {
    width: 120px;
    height: 120px;
  }
  .search-card-cover {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    ${respondTo("small", "max")} {
      display: block;
    }
  }
  .left-section {
    display: flex;
    ${respondTo("small", "max")} {
      display: block;
    }
  }
  .search-texts-cover {
    display: block;
    padding: auto;
    margin-left: 10px;
    ${respondTo("small", "max")} {
      margin-left: 0;
    }
  }
  .character-name-result {
    color: ${(props) => props.theme.colors.lime_green};
  }
  .more-details-btn {
    margin-top: 80px;
    ${respondTo("small", "max")} {
      margin-top: 10px;
    }
  }
`;

const ResultCard = (props) => {
  const { results, info } = props.history.location.state;
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [character, setCharacter] = useState([]);
  const [episodeArr, setEpisodeArr] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [offSet, setOffSet] = useState(0);
  const data = results.splice(offSet, offSet + 5);
  const [paginationData, setPaginationData] = useState(data);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setOffSet(pageNumber * 5);
    setPaginationData(data);
  };

  const showModal = () => {
    setShow(!show);
  };
  const showDetails = (id) => {
    showModal();
    getOneCharacter(id)
      .then((result) => {
        if (result.data.error) {
          return setError(result.error);
        }
        if (result && result.data.length !== 0) {
          setCharacter(result.data);
        }
        if (result && result.episodesOfCharacter.data.length !== 0) {
          setEpisodeArr(result.episodesOfCharacter.data);
        }
      })
      .catch((error) => {
        return setError(error);
      });
  };
  const clear = () => {
    props.history.push("/");
  };

  const {
    id,
    name,
    status,
    species,
    type,
    gender,
    location,
    origin,
    created,
    episode,
  } = character;
  console.log("paginationData", info);

  return (
    <StyledCover>
      <StyledPageCover>
        {results &&
          paginationData.map((result, i) => (
            <StyledCard key={i}>
              <div className="search-card-cover">
                <div className="left-section">
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
                    <div className="text text-episodes">
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
          <img
            className="img-big"
            src={character && character.image}
            alt="character image"
          />
          <div className="content">
            <div>
              <label className="label-text">
                <strong>Id:</strong> {id}
              </label>
              <br />
              <label className="label-text">
                <strong>Name:</strong>{" "}
                <span className="character-name-result">{name}</span>
              </label>
              <br />
              <label className="label-text">
                <strong>Status:</strong> {status}
              </label>
              <br />
              <label className="label-text">
                <strong>Species:</strong> {species}
              </label>
              <br />
              <label className="label-text">
                <strong>Types:</strong> {type}
              </label>
              <br />
              <label className="label-text">
                <strong>Gender:</strong> {gender}
              </label>
              <br />
              <label className="label-text">
                <strong>Origin:</strong> {origin && origin.name}
              </label>
              <br />
              <label className="label-text">
                <strong>Origin Info:</strong>{" "}
                <a href={origin && origin.url}>Click here</a>
              </label>
              <br />
              <label className="label-text">
                <strong>Location:</strong> {location && location.name}
              </label>
              <br />
              <label className="label-text">
                <strong>Location Info:</strong>{" "}
                <a href={location && location.url}>Click here</a>
              </label>
              <br />
              <label className="created">
                <strong>Created:</strong> {created}
              </label>
              <br />
              <label className="character-episodes-header">
                <strong>Scroll to see character episodes</strong>
              </label>
              <div className="episodes-wrapper">
                {episodeArr.map((arr) => (
                  <div className="episodes-or-character">
                    <label>
                      <strong>Name: </strong>
                      <span className="character-name-result">{arr.name}</span>
                    </label>
                    <br />
                    <label>
                      <strong>Episode: </strong>
                      {arr.episode}
                    </label>
                    <br />
                    <label>
                      <strong>Air Date: </strong>
                      {arr.air_date}
                    </label>
                    <br />
                  </div>
                ))}
              </div>

              <br />
            </div>
          </div>
        </Modal>
      )}
      <div className="clear-btn">
        <Button
          danger={true}
          onClick={(e) => {
            e.preventDefault();
            clear();
          }}
        >
          Clear
        </Button>
      </div>

      <div className="pagination">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={5}
          totalItemsCount={info.count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </StyledCover>
  );
};

export default withRouter(ResultCard);
