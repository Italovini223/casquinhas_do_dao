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

export const Empty = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  text-align: center;
`;

export const EmptyContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;