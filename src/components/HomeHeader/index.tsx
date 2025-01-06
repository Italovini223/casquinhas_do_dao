import { Alert, TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Avatar } from 'react-native-elements'

import { useAuth } from '../../hooks/useAuth'

import { useTheme } from 'styled-components/native'


import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/app.routes'


import { Container, Picture, Title } from './styles'

type Props = {
  title: string;
}

export function HomeHeader({ title }: Props) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { COLORS } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  

  function handleGoRequestAdmin(){
    if(user.isAdmin) {
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
          size={64}
          rounded
          title={user!.name[0]}
          containerStyle={{ 
            backgroundColor: COLORS.GRAY_500,
            
          }}
        />
        
      </TouchableOpacity>

      <Title>
        { title }
      </Title>
    </Container>
  );
}