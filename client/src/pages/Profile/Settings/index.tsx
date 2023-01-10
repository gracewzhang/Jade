import React, { BaseSyntheticEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineCheck } from 'react-icons/hi';
import { ChromePicker, ColorChangeHandler } from 'react-color';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
import colors from '../../../utils/colors';
import Input from '../../../components/Input/input';
import { ColorPickerButtonProps, ColorPickerProps } from './types';
import useStore from '../../../stores';

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
  gap: 15px;
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

const SecondaryColorPicker = styled(ColorPicker)`
  z-index: 999;
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

const MAX_NAME_LEN = 30;

const Settings = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

  const [name, setName] = useState('');
  const [primaryColor, setPrimaryColor] = useState(colors.rose);
  const [secondaryColor, setSecondaryColor] = useState(colors['light-yellow']);

  const [pColorPickerOpen, setPColorPickerOpen] = useState(false);
  const [sColorPickerOpen, setSColorPickerOpen] = useState(false);

  const onNameChange = (e: BaseSyntheticEvent): void => {
    const newName = e.target.value;
    if ((newName as string).length <= MAX_NAME_LEN) {
      setName(newName);
    }
  };

  const saveSettings = (): void => {
    if (user !== undefined) {
      const newUserSettings = {
        googleId: user.google_id,
        newName: name,
        newPrimaryColor: primaryColor,
        newSecondaryColor: secondaryColor
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      updateUser(newUserSettings);
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      setName(user.name);
      setPrimaryColor(user.primary_color);
      setSecondaryColor(user.secondary_color);
    }
  }, [user]);

  // Color pickers
  const onPrimaryChange: ColorChangeHandler = (color) => {
    setPrimaryColor(color.hex);
  };

  const onSecondaryChange: ColorChangeHandler = (color) => {
    setSecondaryColor(color.hex);
  };

  const handleOutsideClick = (event: MouseEvent): void => {
    setPColorPickerOpen(false);
    setSColorPickerOpen(false);
  };

  const handlePrimaryClick = (event: MouseEvent): void => {
    setPColorPickerOpen(true);
  };

  const handleSecondaryClick = (event: MouseEvent): void => {
    setSColorPickerOpen(true);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    document
      .getElementById('primary-picker')
      ?.addEventListener('click', handlePrimaryClick, true);
    document
      .getElementById('secondary-picker')
      ?.addEventListener('click', handleSecondaryClick, true);

    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  return (
    <SettingsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Settings</Label>
          <StyledCheck onClick={saveSettings} />
        </HeaderContainer>
        <RowsContainer>
          <SettingContainer>
            <SettingLabel>Name</SettingLabel>
            <NameInput
              maxLength={MAX_NAME_LEN}
              rows={1}
              defaultValue={name}
              placeholder="Name"
              onChange={onNameChange}
            />
          </SettingContainer>
          <SettingContainer>
            <SettingLabel>Primary Color</SettingLabel>
            <ColorPickerContainer id="primary-picker">
              <ColorPickerButton color={primaryColor} />
              {pColorPickerOpen && (
                <ColorPicker
                  open={pColorPickerOpen}
                  color={primaryColor}
                  onChange={onPrimaryChange}
                />
              )}
            </ColorPickerContainer>
          </SettingContainer>
          <SettingContainer>
            <SettingLabel>Secondary Color</SettingLabel>
            <ColorPickerContainer id="secondary-picker">
              <ColorPickerButton color={secondaryColor} />
              {sColorPickerOpen && (
                <SecondaryColorPicker
                  open={sColorPickerOpen}
                  color={secondaryColor}
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
