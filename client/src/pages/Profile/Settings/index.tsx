import React from 'react';
import styled from 'styled-components';
import { HiOutlineCheck } from 'react-icons/hi';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
import colors from '../../../utils/colors';
import Input from '../../../components/Input/input';

const SettingsContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 10%;
  width: 100%;
`;

const HeaderContainer = styled.span`
  height: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const StyledCheck = styled(HiOutlineCheck)`
  width: 18px;
  height: 18px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
    color: ${colors.grey};
  }
`;

const SettingContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const SettingLabel = styled(Label)`
  width: 20%;
`;

const NameInput = styled(Input)`
  width: 70%;
  text-align: right;
`;

const Settings = (): React.ReactElement => {
  return (
    <SettingsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Settings</Label>
          <StyledCheck />
        </HeaderContainer>
        <SettingContainer>
          <SettingLabel>Name</SettingLabel>
          {/* TODO: max length */}
          <NameInput maxLength={30} rows={1}></NameInput>
        </SettingContainer>
      </PaddingContainer>
    </SettingsContainer>
  );
};

export default Settings;
