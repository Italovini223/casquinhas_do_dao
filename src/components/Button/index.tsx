import { TouchableOpacityProps } from 'react-native'
import { Container, Loading, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, disabled = false, ...rest}: Props) {
  return (
    <Container Isdisabled={disabled} {...rest}>
      {
        !isLoading ?
        <Title>
          { title}
        </Title>
        :
        <Loading />
      }
    </Container>
  );
}