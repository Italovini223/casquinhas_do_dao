import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;

  margin:0 10px 20px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 10px;

  color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;

export const ProductName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};

`;

export const OrderPrice = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;

export const DetailsContainer = styled.View`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;
`;

export const TextDetails = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;