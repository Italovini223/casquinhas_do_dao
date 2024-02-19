import styled from 'styled-components/native';

type DisableButtonPros = {
  Isdisabled: boolean
}

export const Container = styled.TouchableOpacity<DisableButtonPros>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;

  width: 100%;

  padding: 10px;

  border-radius: 6px;

  align-items: center;
  justify-content: center;

  opacity: ${({ Isdisabled}) => Isdisabled ? 0.3 : 1};

  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color:  theme.COLORS.WHITE
}))``;