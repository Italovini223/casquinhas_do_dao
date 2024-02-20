import { TextInputProps, TouchableOpacity } from 'react-native'

import { useTheme } from 'styled-components/native'

import { MagnifyingGlass } from 'phosphor-react-native'


import { Container, InputContainer, Label, Input as TextInput } from './styles'



type Props = TextInputProps & {
  onPress: () => void;
}

export function SearchInput({ onPress, ...rest}: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>

      <InputContainer>
        <TextInput 
          placeholderTextColor={COLORS.GRAY_200}
          {...rest}
        />

        <TouchableOpacity 
          onPress={onPress}
          
        >
          <MagnifyingGlass 
            color={COLORS.BRAND_LIGHT}
            size={24}
          />
        </TouchableOpacity>

      </InputContainer>

    </Container>
  );
}