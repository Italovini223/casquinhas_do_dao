import { ReactNode } from 'react';

import { TouchableOpacityProps } from 'react-native';

import { Container, ProductName, ProductTotalPrice } from './styles';

import { productDto  } from '../../dtos/productDto';

type OrderProductCardProps = TouchableOpacityProps & {
  product: productDto;
  isSelected?: boolean;
  children?: ReactNode;
}

export function OrderProductCard({ product, isSelected, children, ...rest }: OrderProductCardProps) {
  return (
    <Container
      isSelected={isSelected}
      {...rest}
    >
      <ProductName
        isSelected={isSelected}
      >
        {product.name}
      </ProductName>
      


      {
      isSelected &&
      children
      }

        <ProductTotalPrice
          isSelected={isSelected}
        >
          R$ {product.price}
        </ProductTotalPrice>
    </Container>
  ); 
}