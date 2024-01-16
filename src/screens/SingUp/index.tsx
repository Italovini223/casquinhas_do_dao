import { Input } from '../../components/Input';
import { Container, Content, Header } from './styles';

export function SingUp() {
  return (
    <Container>
        <Header>
          Cadastre-se
        </Header>
      <Content>
        
        <Input 
          label='Digite seu Email'
        />

        <Input 
          label='Digite a senha'
          password
        />

        <Input 
          label='Confirme a senha'
          password
        />
      </Content>
    </Container>
  );
}