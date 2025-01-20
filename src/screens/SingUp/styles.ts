import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex: 1;
  padding: 0 40px;
`;

export const BtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

export const SingInTextComponent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;
export const SingInText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const BtnSingIn = styled.TouchableOpacity`
  background-color: transparent;
  border: none;
`;

export const BtnTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
`;
