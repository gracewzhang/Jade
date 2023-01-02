import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LogoIllustration } from '../../illustrations/Logo.illustration';
import { HiOutlineHeart, HiOutlineHome, HiOutlineUser } from 'react-icons/hi2';
import { IoLogOutOutline } from 'react-icons/io5';
import colors from '../../utils/colors';
import LogoutModal from '../LogoutModal';
import { NavbarProps } from './types';

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

const LogoutContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLogoIllustration = styled(LogoIllustration)`
  height: 40px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const iconLen = '25px';

const StyledHome = styled(HiOutlineHome)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledHeart = styled(HiOutlineHeart)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledUser = styled(HiOutlineUser)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledLogout = styled(IoLogOutOutline)`
  width: ${iconLen};
  height: ${iconLen};
  color: ${colors.grey};

  :hover {
    cursor: pointer;
  }
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

// TODO: add indicator for the page you've selected
const Navbar = (props: NavbarProps): React.ReactElement => {
  const { setIsLoggedIn } = props;
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <NavbarContainer>
      {logoutVisible && <BlurOverlay />}
      <LogoutModal
        isVisible={logoutVisible}
        setIsVisible={setLogoutVisible}
        setIsLoggedIn={setIsLoggedIn}
      />
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
        <LogoutContainer onClick={() => setLogoutVisible(true)}>
          <StyledLogout />
        </LogoutContainer>
      </LinkContainer>
    </NavbarContainer>
  );
};

export default Navbar;
