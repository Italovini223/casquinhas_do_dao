import { TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useUser } from '@realm/react'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/app.routes'


import { Container, Picture, Title } from './styles'

type Props = {
  title: string;
}

export function HomeHeader({ title }: Props) {
  const user = useUser();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoRequestAdmin(){
    navigation.navigate('requestAdmin');
  }

  const paddingTop = insets.top + 20;

  return (
    <Container style={{ paddingTop }}>

      <TouchableOpacity onPress={handleGoRequestAdmin}>
        <Picture 
          source={{ uri: user.profile.pictureUrl}}
          placeholder="L184i9offQof00ayfQay~qj[fQj["
        />
        
      </TouchableOpacity>

      <Title>
        { title }
      </Title>
    </Container>
  );
}