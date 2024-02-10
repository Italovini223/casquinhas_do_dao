import { useQuery } from '../../libs/realm'

import { Order } from '../../libs/realm/schemas/order'

import { HomeHeader } from '../../components/HomeHeader'
import { Order as OrderComponent } from '../../components/Order'
import { Container, Content } from './styles'
import { useEffect } from 'react'

export function Home() {
  const orders = useQuery(Order);

  function fetchOrder(){
    console.log(orders)
  }

  useEffect(() => {
    fetchOrder();
  }, [])
  return (
    <Container>
      <HomeHeader title='Meus Pedidos'/>
      
      <Content>
        <OrderComponent status='Finished' title='TESATE'/>
      </Content>
    </Container>
  );
}