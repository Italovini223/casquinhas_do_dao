import { TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/app.routes'

import { ArrowLeft } from 'phosphor-react-native'

import { useTheme } from 'styled-components/native'

import { Container,Title } from './styles'

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 20;

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { COLORS } = useTheme();

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container style={{ paddingTop }}>

      <TouchableOpacity onPress={handleBack}>
        <ArrowLeft 
          size={24}
          color={COLORS.GRAY_100}
        />
      </TouchableOpacity>
      
      <Title>
        { title }
      </Title>
    </Container>
  );
}