import { IceCream } from 'phosphor-react-native'

import { useTheme } from 'styled-components/native';

import { Container } from './styles';
import { Button } from '../../components/Button';


export function Register() {
  const { COLORS } = useTheme()
  return (
    <Container>
      <IceCream 
        color={COLORS.GRAY_200}
        size={32}
      />

      <Button 
        title='Entrar com Google'
      />
    </Container>
  );
}