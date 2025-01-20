import { Container, UserName } from './styles';
import { TouchableOpacityProps } from 'react-native';

import { UserListDto } from '../../dtos/userListDto';

import { Avatar } from 'react-native-elements'

import { useTheme } from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';
import { AdminNavigationRoutesProps } from '../../routes/admin.routes';


type UserCard = TouchableOpacityProps & {
  data: UserListDto;
}

export function UserCard({data: { name, id }, ...rest}: UserCard) {

  const { COLORS } = useTheme();
  const navigation = useNavigation<AdminNavigationRoutesProps>();

  function handleNavigateToToPay(){
   navigation.navigate('toPay', { id, userName: name });
  }

  return (
    <Container
      {...rest} 
      onPress={handleNavigateToToPay}
    >
      <Avatar
        size={34}
        rounded
        title={name[0]}
        containerStyle={{ 
          backgroundColor: COLORS.GRAY_500, 
        }}
      />
      <UserName>
        { name }
      </UserName>
    </Container>
  );
}