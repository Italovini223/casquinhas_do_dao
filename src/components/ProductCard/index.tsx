import { TouchableOpacityProps } from 'react-native';
import { Trash } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AdminNavigationRoutesProps } from '../../routes/admin.routes';

import { Container, Name, Price, Quantity, TrashBtn } from './styles';


type data = {
  name: string;
  description?: string,
  price: number,
  quantity: number,
  id: string,
}

type ProductCardProps = TouchableOpacityProps & {
 data: data;
 deleteButtonFunction: () => void;

}
export function ProductCard({ data: { name, description, price, quantity, id  }, deleteButtonFunction, ...rest }: ProductCardProps) {
  const { COLORS } = useTheme();
  const navigation = useNavigation<AdminNavigationRoutesProps>();

  function handleGoProductDetails(){
    navigation.navigate('productDetails', { id });
  }

  return (
    <Container 
      {...rest}
      isAvalible={quantity > 0}
      disabled={quantity <= 0}
      onPress={handleGoProductDetails}
    >
      <TrashBtn 
        onPress={deleteButtonFunction}
      >
        <Trash size={20} color={COLORS.ORANGE_500}/>
      </TrashBtn>
      <Name>{name}</Name>
      <Price>R$ {price.toFixed(2)}</Price>
      <Quantity>Quantidade: {quantity} UN </Quantity>
    </Container>
  );
}