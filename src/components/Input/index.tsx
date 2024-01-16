import { TextInputProps } from 'react-native'

import { useTheme } from 'styled-components/native';

import { Container, Label, Input as TextInput } from './styles';



type Props = TextInputProps & {
  label: string;
  password?: boolean;
}

export function Input({ label, password = false, ...rest}: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Label>
        { label}
      </Label>

      <TextInput 
        placeholderTextColor={COLORS.GRAY_200}
        secureTextEntry={password}
        {...rest}
      />
    </Container>
  );
}