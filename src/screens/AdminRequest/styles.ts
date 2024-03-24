import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export  const Content = styled.View`
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  margin-top: 30px;

`;

export const EmptyListContainer = styled.View`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;


`;

export const EmptyListText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;

`;