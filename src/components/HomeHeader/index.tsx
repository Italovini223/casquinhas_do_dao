import { Alert, TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Avatar from 'react-avatar'

import { useUser } from '@realm/react'
import { useIsAdmin } from '../../hooks/useIsAdmin'

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
  const { isAdmin } = useIsAdmin();

  function handleGoRequestAdmin(){
    if(isAdmin) {
      return Alert.alert('Administrador', 'Você já é um administrador');
    } else {
      navigation.navigate('requestAdmin');
    }
  }

  const paddingTop = insets.top + 20;

  return (
    <Container style={{ paddingTop }}>

      <TouchableOpacity onPress={handleGoRequestAdmin}>
        <Avatar
          size="54"
          name={user.name}
          round={true}
          textSizeRatio={2}
          style={{ marginRight: 10 }}
        />
        
      </TouchableOpacity>

      <Title>
        { title }
      </Title>
    </Container>
  );
}