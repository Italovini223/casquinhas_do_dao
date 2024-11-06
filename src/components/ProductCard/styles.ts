import styled from 'styled-components/native';

 type ProductCardStyleProps = {
    isAvalible: boolean;
 }

export const Container = styled.TouchableOpacity<ProductCardStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme, isAvalible }) => isAvalible ? theme.COLORS.BRAND_LIGHT : theme.COLORS.RED_500};
  margin-bottom: 10px;
  padding: 10px 0px;
  position: relative;
`;

export const Name = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-weight: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};      
`;

export const Quantity = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};   
`;

export const Price = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};   
`;

export const TrashBtn = styled.TouchableOpacity`
  border: none;

  width: 20px;
  height: 20px;

  position: absolute;
  top: 10px;
  right: 20px;

`;