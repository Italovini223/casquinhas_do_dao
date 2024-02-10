import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 40px;

  margin-top: 20px;
`;

export const DefaultSelect = styled.View`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DefaultSelectText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const TotalPriceContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalPrice = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const ButtonContainer = styled.View`
  padding: 40px;
  margin-bottom: 15px;
`;