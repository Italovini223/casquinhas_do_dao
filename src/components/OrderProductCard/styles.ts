import styled from 'styled-components/native';

type isSelectedProps = {
  isSelected?: boolean;
}

export const Container = styled.TouchableOpacity<isSelectedProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px 0;
  border: 1px solid ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  background: ${({ isSelected, theme }) => isSelected ? theme.COLORS.BRAND_LIGHT : theme.COLORS.GRAY_800};
`;

export const ProductName = styled.Text<isSelectedProps>`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme, isSelected  }) => isSelected ? theme.COLORS.GRAY_800 : theme.COLORS.WHITE};
`;

export const ProductTotalPrice = styled.Text<isSelectedProps>` 
  color: ${({ theme, isSelected  }) => isSelected ? theme.COLORS.GRAY_800 : theme.COLORS.WHITE} ;
`;