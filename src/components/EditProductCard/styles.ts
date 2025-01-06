import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const ProductName = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductQuantityContent = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const ProductNameContent = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;


export const ProductQuantity = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
  display: flex;

`;