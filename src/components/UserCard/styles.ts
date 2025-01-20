import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 70px;
  background: ${({theme}) => theme.COLORS.GRAY_700};
  margin-top: 30px;
  padding: 10px;
  gap: 20px;
`;

export const UserName = styled.Text`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  color: ${({theme}) => theme.COLORS.GRAY_200};
`;