import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { LogoIllustration } from '../../illustrations/Logo.illustration';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHome,
  HiOutlineUser
} from 'react-icons/hi2';
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
  align-items: center;
`;

const iconLen = '25px';

const StyledHome = styled(HiOutlineHome)`
  width: ${iconLen};
  height: ${iconLen};
  color: black;
`;

const StyledChat = styled(HiOutlineChatBubbleBottomCenterText)`
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

const Indicator = styled.div`
  position: absolute;
  left: 0;
  width: 4px;
  height: 40px;
  background-color: black;
  border-radius: 0px 20px 20px 0px;
`;

const Navbar = (props: NavbarProps): React.ReactElement => {
  const { setIsLoggedIn } = props;
  const [logoutVisible, setLogoutVisible] = useState(false);
  const loc = useLocation();
  const page = loc.pathname;

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
            {page === '/' && <Indicator />}
          </StyledLink>
          <StyledLink to="/messages">
            <StyledChat />
            {page === '/messages' && <Indicator />}
          </StyledLink>
          <StyledLink to="/profile">
            <StyledUser />
            {page === '/profile' && <Indicator />}
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
