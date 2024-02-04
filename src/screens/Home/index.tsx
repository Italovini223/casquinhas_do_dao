import { Header } from '../../components/Header';
import { Order } from '../../components/Order';
import { Container, Content } from './styles';

export function Home() {
  return (
    <Container>
      <Header title='Meus Pedidos'/>
      
      <Content>
        <Order status='Finished' title='TESATE'/>
      </Content>
    </Container>
  );
}