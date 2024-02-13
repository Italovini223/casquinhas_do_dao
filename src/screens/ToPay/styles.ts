import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 30px;

  margin-top: 20px;
`;

export const TotalContainer = styled.View`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalText = styled.Text`
  width: 100%;
`;