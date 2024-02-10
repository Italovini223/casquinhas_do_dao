import { HomeHeader } from '../../components/HomeHeader';
import { Order } from '../../components/Order';
import { Container, Content } from './styles';

export function Home() {
  return (
    <Container>
      <HomeHeader title='Meus Pedidos'/>
      
      <Content>
        <Order status='Finished' title='TESATE'/>
      </Content>
    </Container>
  );
}