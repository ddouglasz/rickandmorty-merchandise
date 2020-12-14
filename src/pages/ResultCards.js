import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../utils/Buttons";
import { withRouter } from "react-router";
import { respondTo } from "../utils/stylesHelper.js";

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

const ResultCard = (props, { image, name, episodes, location }) => {
  const { state } = props.history.location;
  const { results } = props.history.location.state;

  console.log("state ==>>", state);
  console.log("props ==>>", props);
  return (
    <>
      <StyledPageCover>
        {results &&
          results.map((result, i) => (
            <StyledCard>
              <div key={i}>
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
                </div>
              </div>
            </StyledCard>
          ))}
      </StyledPageCover>
      <Button>Clear</Button> //Todo
      <Button>Pagination</Button> //Todo
    </>
  );
};

export default withRouter(ResultCard);
