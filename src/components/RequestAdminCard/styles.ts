import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';


export const Container = styled(TouchableOpacity)`
  flex: 1;
  height: 150px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfosContainer = styled.View`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const RequestedAt = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;