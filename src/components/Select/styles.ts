import styled from 'styled-components/native'
import SelectDropdown from 'react-native-select-dropdown'

import theme from '../../theme';

export const Container = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  margin-bottom: 15px;
`;

export  const Label = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;


export const SelectContainer = styled.View`
  width: 100%;
  padding: 2px;
  border-radius: 10px;
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.BRAND_LIGHT};
`;

export const Select = styled(SelectDropdown).attrs({
  buttonStyle: {
    backgroundColor: theme.COLORS.GRAY_800,
    width: '100%',
    borderBlockColor: theme.COLORS.GRAY_100,
  },
  buttonTextStyle: {
    color: theme.COLORS.BRAND_LIGHT,
  },

  dropdownStyle: {
    backgroundColor: theme.COLORS.GRAY_600,
  },

  rowTextStyle: {
    color: theme.COLORS.BRAND_LIGHT,
  },

  
  
})`
  width: 100%;
  height: 40px;

  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  color: ${({ theme }) => theme.COLORS.GRAY_200};

  border-radius: 10px;
  text-align: center;
  margin-top: 16px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
`;
