import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;

  padding: 0 40px;
`;