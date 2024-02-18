import { TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'

import { AppNavigatorRoutesProps } from '../../routes/app.routes'
import { AdminNavigationRoutesProps } from '../../routes/admin.routes'

import { ArrowLeft } from 'phosphor-react-native'

import { useTheme } from 'styled-components/native'

import { Container,Title } from './styles'

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 20;

  const appNavigation = useNavigation<AppNavigatorRoutesProps>();
  const adminNavigation = useNavigation<AdminNavigationRoutesProps>();

  const { COLORS } = useTheme();

  const isAdmin = true;

  function handleBack(){
    if(isAdmin){
      adminNavigation.goBack();
    } else {
      appNavigation.goBack();
    }
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