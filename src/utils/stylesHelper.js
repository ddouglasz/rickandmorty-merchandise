import { breakpoints } from "./styles";

export const respondTo = (breakpoint, direction) => {
  let size;

  for (const viewportName in breakpoints) {
    const viewportValue = breakpoints[viewportName];

    if (breakpoint === viewportName) {
      if (direction === "min") {
        size = `${viewportValue}px`;
      } else {
        size = `${viewportValue - 1}px`;
      }
      break;
    }
  }

  if (direction === "min") {
    return `@media (min-width: ${size})`;
  } else {
    return `@media (max-width: ${size})`;
  }
};

export const backgroundImage = () => `
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const listReset = () => `
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const visuallyHidden = () => `
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;
