import { TouchableOpacityProps } from 'react-native';
import { Trash } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { Container, Name, Price, Quantity, TrashBtn } from './styles';


type data = {
  name: string;
  description?: string,
  price: number,
  quantity: number,
}

type ProductCardProps = TouchableOpacityProps & {
 data: data;
 deleteButtonFunction: () => void;

}
export function ProductCard({ data: { name, description, price, quantity }, deleteButtonFunction, ...rest }: ProductCardProps) {
  const { COLORS } = useTheme();
  return (
    <Container 
      {...rest}
      isAvalible={quantity > 0}
      disabled={quantity <= 0}
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