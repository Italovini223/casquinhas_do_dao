import styled from 'styled-components/native';
import { TextInput } from 'react-native';

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

export const Input = styled(TextInput)`
  width: 100%;
  height: 40px;

  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  color: ${({ theme }) => theme.COLORS.GRAY_200};

  border-radius: 10px;
  text-align: center;
  margin-top: 16px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};

`;