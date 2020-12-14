import "../assets/webfonts/Gringe.css";

import { rgba } from "polished";
import { colors, typography } from "./styles";
import { respondTo } from "./stylesHelper";

export const globalStyles = `
  /* Global Styles */

  *, *::before, *::after {
    box-sizing: border-box;
  }

  fieldset {
    padding: 0;
    border: none;
    margin: 0;
  }

  textarea {
    resize: none;
    min-height: 10em;
  }

  h1 {
    font-size: ${typography.fontSize_xxl};

    ${respondTo("medium")}{
      font-size: ${typography.fontSize_xxxl};
    }
  }

  h2 {
    font-size: ${typography.fontSize_xl};

    ${respondTo("medium")}{
      font-size: ${typography.fontSize_xxl};
    }
  }

  h3 {
    font-size: ${typography.fontSize_l};

    ${respondTo("medium")}{
      font-size: ${typography.fontSize_xl};
    }
  }
  button {
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
    outline: none;
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: ${rgba(colors.gray, 0.75)};
  }

  ::-moz-placeholder {
    color: ${rgba(colors.gray, 0.75)};
  }

  :-ms-input-placeholder {
    color: ${rgba(colors.gray, 0.75)};
  }

  :-moz-placeholder {
    color: ${rgba(colors.gray, 0.75)};
  }

  /* Tools */
  .ttc {
    text-transform: capitalize;
  }

  .tac {
    text-align: center;
  }

  .brc {
    border-radius: 50%;
  }
`;
