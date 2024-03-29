import styled from 'styled-components/native';

import { Image } from 'expo-image'

export const Container = styled.View`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  

  padding-right: 20px;
  padding-left: 20px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`;