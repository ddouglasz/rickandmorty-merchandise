import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../layout/header";
import Footer from "../layout/footer";

const Layout = ({ children }) => {
  return (
    <AppWrapper>
      <Header />
      {children}
      <Footer />
    </AppWrapper>
  );
};

const AppWrapper = styled.div``;

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
