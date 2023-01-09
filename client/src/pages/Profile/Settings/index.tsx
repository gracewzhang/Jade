import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineCheck } from 'react-icons/hi';
import { ChromePicker, ColorChangeHandler } from 'react-color';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
import colors from '../../../utils/colors';
import Input from '../../../components/Input/input';
import { useSettingsContext } from '../../../contexts/settings/SettingsContext';
import { ColorPickerButtonProps, ColorPickerProps } from './types';

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
  width: 30%;
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NameInput = styled(Input)`
  width: 65%;
  text-align: right;
`;

const ColorPickerContainer = styled.div`
  position: relative;
`;

const ColorPicker = styled(ChromePicker)<ColorPickerProps>`
  position: ${(props) => (props.open ? 'absolute' : 'inherit')};
  top: ${(props) => (props.open ? '-250px' : '0px')};
`;

const ColorPickerButton = styled.button<ColorPickerButtonProps>`
  width: 50px;
  height: 20px;
  border-radius: 25px;
  border: 0;
  background-color: ${(props) => props.color};

  :hover {
    cursor: pointer;
  }
`;

const Settings = (): React.ReactElement => {
  const { name, primaryColor, secondaryColor, updateSettings } =
    useSettingsContext();
  const [pColorPickerOpen, setPColorPickerOpen] = useState(false);
  const [sColorPickerOpen, setSColorPickerOpen] = useState(false);

  const [tName, setTName] = useState('');
  const [tPrimaryColor, setTPrimaryColor] = useState(colors.rose);
  const [tSecondaryColor, setTSecondaryColor] = useState(
    colors['light-yellow']
  );

  const onPrimaryChange: ColorChangeHandler = (color) => {
    setTPrimaryColor(color.hex);
  };

  const onSecondaryChange: ColorChangeHandler = (color) => {
    setTSecondaryColor(color.hex);
  };

  return (
    <SettingsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Settings</Label>
          <StyledCheck />
        </HeaderContainer>
        <RowsContainer>
          <SettingContainer>
            <SettingLabel>Name</SettingLabel>
            {/* TODO: max length */}
            <NameInput
              maxLength={30}
              rows={1}
              defaultValue={name}
              placeholder="Name"
            />
          </SettingContainer>
          <SettingContainer>
            <SettingLabel>Primary Color</SettingLabel>
            <ColorPickerContainer>
              <ColorPickerButton
                onClick={() => setPColorPickerOpen(!pColorPickerOpen)}
                color={tPrimaryColor}
              />
              {pColorPickerOpen && (
                <ColorPicker
                  open={pColorPickerOpen}
                  color={tPrimaryColor}
                  onChange={onPrimaryChange}
                />
              )}
            </ColorPickerContainer>
          </SettingContainer>
          <SettingContainer>
            <SettingLabel>Secondary Color</SettingLabel>
            <ColorPickerContainer>
              <ColorPickerButton
                onClick={() => setSColorPickerOpen(!sColorPickerOpen)}
                color={tSecondaryColor}
              />
              {sColorPickerOpen && (
                <ColorPicker
                  open={sColorPickerOpen}
                  color={tSecondaryColor}
                  onChange={onSecondaryChange}
                />
              )}
            </ColorPickerContainer>
          </SettingContainer>
        </RowsContainer>
      </PaddingContainer>
    </SettingsContainer>
  );
};

export default Settings;
