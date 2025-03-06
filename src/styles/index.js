import styled from "styled-components";

export const LinkHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  gap: 20px;
  font-size: 17px;
`;

export const BtnLeave = styled.button`
  height: 100%;
  width: 60px;

  &:hover {
    background-color: rgb(56, 34, 104);
  }
`;

export const SignIn = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: rgb(78, 46, 145);
`;

export const Content = styled.main`
  width: 70%;
  margin: 0 auto;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;
`;
