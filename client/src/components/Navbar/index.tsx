import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LogoIllustration } from '../../illustrations/Logo.illustration';
import { FiHeart } from 'react-icons/fi';
import { RxHome } from 'react-icons/rx';
import { BiUser } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import colors from '../../utils/colors';

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  width: 8vw;
  z-index: 999;
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 30px 4px lightgrey;
`;

const LinkContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MiddleIconsContainer = styled.div`
  display: flex;
  flex-direction: column;

  a + a {
    margin-top: 45%;
  }
`;

const StyledLogoIllustration = styled(LogoIllustration)`
  height: 40px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const iconLen = '25px';

const StyledHome = styled(RxHome)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledHeart = styled(FiHeart)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledUser = styled(BiUser)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledLogout = styled(MdLogout)`
  width: ${iconLen};
  height: ${iconLen};
  color: ${colors.grey};
`;

// TODO: add indicator for the page you've selected
const Navbar = (): React.ReactElement => {
  return (
    <NavbarContainer>
      <LinkContainer>
        <StyledLink to="/">
          <StyledLogoIllustration />
        </StyledLink>
        <MiddleIconsContainer>
          <StyledLink to="/">
            <StyledHome />
          </StyledLink>
          <StyledLink to="/memories">
            <StyledHeart />
          </StyledLink>
          <StyledLink to="/profile">
            <StyledUser />
          </StyledLink>
        </MiddleIconsContainer>
        <StyledLink to="/hello">
          <StyledLogout />
        </StyledLink>
      </LinkContainer>
    </NavbarContainer>
  );
};

export default Navbar;
