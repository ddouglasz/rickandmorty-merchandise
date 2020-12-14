import React, { useEffect, useState } from "react";
import { Router } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { characterNames } from "../utils/shrekCharacterNames";

import {
  searchRickAndMortyCharacters,
  getAllCharacters,
} from "../actions/index";

import { respondTo } from "../utils/stylesHelper.js";

const StyledSearchPage = styled.div`
  text-align: center;
  .page-title {
    font-family: GrinchedRegular;
    font-size: 125px;
    margin: 50px auto;
    color: ${(props) => props.theme.colors.lime_green};
    ${respondTo("large", "max")} {
      font-size: 50px;
      margin-top: 40%;
    }
  }
  .sub-text {
    margin-bottom: 40px;
  }
  .search-input {
    top: 50%;
    width: 50%;
    height: 50px;
    margin: 10px 20px;
    padding: 2px 20px;
    justify-content: center;
    border-radius: ${(props) => props.theme.borders.borderRadius_l};
    ${respondTo("small", "max")} {
      width: 80%;
    }
  }
  input[type="text"],
  input[type="password"],
  textarea,
  select {
    outline: none;
    border: solid 1px ${(props) => props.theme.colors.gray};
  }
  .search-form {
    text-align: center;
    display: block;
    justify-content: center;
    border: none;
  }

  .auto-suggest {
    display: flex;
    width: 96%;
    height: 20px;
    padding: 5px 0;
    font: 400 13.3333px Arial;
    margin: auto;
    ${respondTo("small", "max")} {
      width: 90%;
    }
  }
`;

const StykledAutosuggest = styled.div`
  height: 50%;
  overflow-y: scroll;
  width: 52%;
  margin: auto;
  padding: 4px 2px;
  background-color: ${(props) => props.theme.colors.grayLight};
  border-radius: ${(props) => props.theme.borders.borderRadius_l};
  ${respondTo("small", "max")} {
    width: 90%;
  }
`;

const Main = (props) => {
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
      item.toLowerCase().includes(subStr.toLowerCase())
    );
  };

  const assingSearchParams = (search) => {
    let queryStringArray = search.toLowerCase().split(/\W+/);
    if (characterNames.includes(search)) {
      setName(search);
    } else {
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
            return;
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
        if (result && result.length !== 0) {
          setSearchResult(result);
        }
      })
      .catch((error) => {
        return setError(error);
      })
      .finally(() => {
        searchResult.length !== 0 &&
          props.history.push("/search", searchResult);
      });
  };

  return (
    <>
      <StyledSearchPage>
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="page-title">RICKANDMORTY</div>
          <p className="sub-text">
            Merchandise powered by <strong>BigCorp &copy;</strong>
          </p>
          <input
            type="text"
            className="search-input"
            name="searchResult"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <StykledAutosuggest className="search-card">
              {searchSuggestion(search).map((result, i) => (
                <a
                  className="auto-suggest"
                  onClick={() => setSearch(result)}
                  key={i}
                >
                  {result}
                </a>
              ))}
            </StykledAutosuggest>
          )}
        </form>
      </StyledSearchPage>
    </>
  );
};

export default Main;
