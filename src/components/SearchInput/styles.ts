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

export const InputContainer = styled.View`
  width: 100%;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};

  border-radius: 10px;
  margin:16px 0;
`;

export const Input = styled(TextInput)`
  flex: 1;
  
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  color: ${({ theme }) => theme.COLORS.GRAY_200};


  text-align: left;
  

  border: none;

`;