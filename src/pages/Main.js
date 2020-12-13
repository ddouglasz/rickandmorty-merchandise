import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeroBackground from "../assets/hero/rickAndMorty.png";
import HeroBackgroundMobile from "../assets/hero/rickAndMortyMobile.png";

import { searchRickAndMortyCharacters } from "../actions/index";

import { respondTo } from "../utils/stylesHelper.js";

const SearchPage = styled.div`
  .hero-background {
    text-align: center;
    background-repeat: no-repeat;
    margin: auto;
    padding: auto;
    width: 100%;
    height: 85vh;
    background-image: url(${HeroBackground});
    ${respondTo("medium", "max")} {
      background-image: url(${HeroBackgroundMobile});
    }
  }
  .search-input {
    top: 50%;
    width: 560px;
    height: 44px;
    padding: 2px 20px;
    justify-content: center;
    border-radius: ${(props) => props.theme.borders.borderRadius_l};
    border-color: ${(props) => props.theme.colors.gray};
  }
  input[type="text"],
  input[type="password"],
  textarea,
  select {
    outline: none;
  }
  .search-form {
    display: block;
    justify-content: center;
  }
`;

const StyledCard = styled.div`
  @media screen and (max-width: 736px) {
    display: block;
  }
  display: flex;
  background: ${(props) => props.theme.colors.gray};
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .decription {
    margin-bottom: 1rem;
  }
  .event-date {
    color: #239ad7;
  }

  .event-description {
    color: #239ad7;
  }

  #search-result {
    @media screen and (max-width: 736px) {
      margin-top: 15px;
    }
  }
`;

const Autosuggest = styled.a`
  display: flex;
  background-color: ${(props) => props.theme.colors.grayLight};
  border: solid 1px ${(props) => props.theme.colors.gray};
  width: 560px;
  height: 35px;
  padding: 2px 20px;
`;

const characterNames = ["Rick", "Ricky Morty", "Brave Shrek"];

const Main = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");

  const searchSuggestion = (subStr) => {
    return characterNames.filter((item) =>
      item.toLocaleLowerCase().includes(subStr.toLocaleLowerCase())
    );
  };

  const assingSearchParams = (search) => {
    const queryStringArray = search.toLowerCase().split(/\W+/);

    if (!characterNames.includes(search)) {
      queryStringArray.forEach((string) => {
        switch (string) {
          case "male":
            setGender("male");
            break;
          case "female":
            setGender("female");
            break;
          case "alive":
            setStatus("alive");
            break;
          case "dead":
            setStatus("dead");
            break;
          case "human":
            setSpecies("human");
            break;
          case "alien":
            setSpecies("alien");
            break;
          default:
            setName(search);
        }
      });
    }
  };

  const handleSubmit = () => {
    assingSearchParams(search);
    searchRickAndMortyCharacters(name, status, species, type, gender)
      .then((result) => {
        if (result.error) {
          return setError(result.error);
        }
        if (result) {
          console.log("searched-->>", result);
          return setSearchResult(result);
        }
      })
      .catch((error) => {
        return setError(error);
      });
  };

  // useEffect(() => {
  //   searchRickAndMortyCharacters(name, status, species, type, gender)
  //     .then((result) => {
  //       setLoading(true);
  //       if (!result) {
  //         //Set a message, 'Sorry, could not find a match for your search query'
  //       }
  //       if (result) {
  //         // const { accountNumber, bank } = bankInformation;
  //         // setAccountNumber(accountNumber);
  //         // setBank(bank);
  //         console.log(result);
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // assingSearchParams(search);
  return (
    <>
      <SearchPage>
        <div className="hero-background">
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              className="search-input"
              name="searchResult"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search &&
              searchSuggestion(search).map((result) => (
                <Autosuggest
                  className="auto-suggest"
                  onClick={() => setSearch(result)}
                >
                  {result}
                </Autosuggest>
              ))}
          </form>
        </div>
      </SearchPage>
      {searchResult.length !== 0 && (
        <StyledCard>
          <div>
            <div className="decription">
              <strong className="event-description">
                Character description
              </strong>
              : Character description here
            </div>
            <small className="event-date">Date here</small>
          </div>
          <div data-testid="history-card-link-element" id="search-result">
            {/* <Link to={`/`} id="">
          <Button>More Info</Button>
        </Link> */}
            <Link to="/">Back to main for now</Link>
          </div>
        </StyledCard>
      )}
    </>
  );
};

export default Main;
