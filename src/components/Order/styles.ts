import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';


type orderStatusColorProps = {
  status: string;
}

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 100px;
  border-radius: 6px;

  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;

  padding: 20px;
  
`;

export const OrderTitle = styled.Text`
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const OrderStatus = styled.View<orderStatusColorProps>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ theme, status }) => status === 'finished' ? theme.COLORS.BRAND_LIGHT : theme.COLORS.RED_500};
`;

export const DataInfo = styled.Text`
  padding:0 10px;

  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const UserInfo = styled.Text`
  padding:0 10px;

  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const Infos = styled.View`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  text-align: left;
`;
