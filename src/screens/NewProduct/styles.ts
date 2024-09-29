import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: space-between;
  gap: 20px;


  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const InputsContent = styled.View`
  flex: 1;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 90%;
`;