import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0px 20px;
`;

export const EmptyList = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;  

export const EmptyListText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.WHITE};
`;