import { TouchableOpacityProps } from 'react-native'
import { Container, Loading, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, ...rest}: Props) {
  return (
    <Container disabled={isLoading} {...rest}>
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