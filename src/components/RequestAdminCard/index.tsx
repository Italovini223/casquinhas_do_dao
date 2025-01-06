import { useState, useEffect } from 'react';

import { adminRequestDto } from '../../dtos/adminRequestDto';

import dayjs from 'dayjs';

import { api } from '../../utils/api';

import { useTheme } from 'styled-components/native';

import { Check, X } from 'phosphor-react-native';

import { Container,Content, UserInfosContainer, UserName, RequestedAt, ButtonsContainer, Button } from './styles';


type Props = {
  data: adminRequestDto;
  deleteBtnFunction: () => void;
  acceptBtnFunction: () => void;
};

export function RequestAdminCard({ data: { userId, createdAt }, deleteBtnFunction, acceptBtnFunction }: Props) {
  const [userName, setUserName] = useState('')
  const { COLORS } = useTheme();
  
  const iconSize = 24;

  async function handleGetUser(){
    const { data } = await api.get(`/user/${userId}`)
   setUserName(data.userName)
  }

  useEffect(() => {
    handleGetUser()
  }, [userId])

  return (
    <Container>
      <Content>
        <UserInfosContainer>
          <UserName>
           {userName}
          </UserName>
          <RequestedAt>
            {dayjs(createdAt).format('[solicitado em ]DD/MM/YYYY [as] HH:mm')}
          </RequestedAt>
        </UserInfosContainer>
        <ButtonsContainer>
          <Button onPress={acceptBtnFunction}>
            <Check size={iconSize} color={COLORS.BRAND_LIGHT}/>
          </Button>
          <Button onPress={deleteBtnFunction}>
            <X size={iconSize} color={COLORS.RED_500}/>
          </Button>
        </ButtonsContainer>
      </Content>
    </Container>
  );
}