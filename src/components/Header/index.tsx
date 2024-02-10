import { TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useUser } from '@realm/react'

import { useTheme } from 'styled-components/native'

import { Container, Picture, Title } from './styles'

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  const user = useUser();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 20;

  return (
    <Container style={{ paddingTop }}>

      <Picture 
        source={{ uri: user.profile.pictureUrl}}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      
      <Title>
        { title }
      </Title>
    </Container>
  );
}