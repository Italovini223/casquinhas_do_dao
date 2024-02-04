import { TouchableOpacity } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Plus } from 'phosphor-react-native'

import { useTheme } from 'styled-components/native'

import { Container, Title } from './styles'

type Props = {
  title: string;
}

export function Header({ title }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 20;

  return (
    <Container style={{ paddingTop }}>

      <TouchableOpacity activeOpacity={0.7}>
        <Plus size={24} color={COLORS.GRAY_200}/>
      </TouchableOpacity>
      
      <Title>
        { title }
      </Title>
    </Container>
  );
}