import { Admin } from '../../libs/realm/schemas/admin';
import { Container,Content, UserInfosContainer, UserName, RequestedAt } from './styles';
import { TouchableOpacityProps } from 'react-native';

export type AdminRequestProps  = {
  user_name: string;
  requested_at: string;
  _id: string;
  is_admin: boolean;
};

type Props = TouchableOpacityProps &{
  data: AdminRequestProps;
};

export function RequestAdminCard({ data: { user_name, requested_at }, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Content>
        <UserInfosContainer>
          <UserName>
           {user_name}
          </UserName>
          <RequestedAt>
            {requested_at}
          </RequestedAt>
        </UserInfosContainer>
      </Content>
    </Container>
  );
}