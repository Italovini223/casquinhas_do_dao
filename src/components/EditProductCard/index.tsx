import React from 'react';

import { orderProductDto } from '../../dtos/orderProductDto';

import { Container, ProductName, ProductQuantity, ProductQuantityContent, ProductNameContent } from './styles';

type editProductCardProps = {
  data: orderProductDto
}

export function EditProductCard({ data: { quantity, productName }}: editProductCardProps) {
  return (
    <Container>

      <ProductNameContent>
        <ProductName>
          Produto:
        </ProductName>
        <ProductName>
          { productName}
        </ProductName>
      </ProductNameContent>


      <ProductQuantityContent>
        <ProductQuantity>
          Quantidade:
        </ProductQuantity>
        <ProductQuantity>
          { quantity }
        </ProductQuantity>

      </ProductQuantityContent>
    </Container>
  );
}