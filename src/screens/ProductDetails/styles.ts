import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  background: ${({theme}) => theme.COLORS.GRAY_800};
  color: ${({theme}) => theme.COLORS.WHITE};
`;

export const Content = styled.View`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 30px;
  padding: 20px 10px;
`;

export const ProductName = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.XXXL}px;
  font-weight: bold;
`;

export const ProductDescription = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const ProductQuantity = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
`;

export const Section = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 0px 20px;
`;
