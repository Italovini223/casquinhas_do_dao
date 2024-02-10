import { SelectDropdownProps } from 'react-native-select-dropdown'

import { useTheme } from 'styled-components/native';

import { Container, Label, Select as SelectComponent, SelectContainer } from './styles';



type Props = SelectDropdownProps & {
  label: string;
}

export function Select({ label, ...rest}: Props) {
  return (
    <Container>
      <Label>
        { label}
      </Label>

      <SelectContainer>
      <SelectComponent
        {...rest}
      />
      </SelectContainer>
    </Container>
  );
}