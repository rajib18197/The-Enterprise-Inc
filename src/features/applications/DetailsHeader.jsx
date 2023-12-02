import styled from "styled-components";

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  gap: 3rem;
  align-items: center;
  justify-items: center;
  //   align-content: center;
  width: 70%;
  margin: -0.4rem auto 0;
  //   background-color: orangered;

  &::after,
  &::before {
    content: "";
    width: 100%;
    height: 4px;
    background-color: orangered;
  }
`;

const Title = styled.h3`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Name = styled.span`
  font-size: 2.5rem;
`;

const Status = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  border-radius: 10rem;
  text-transform: uppercase;
  font-weight: 600;
  color: #333;
  width: max-content;
  padding: 0.4rem 0.8rem;
  background-color: #51cf66;
`;

export default function DetailsHeader({id, status}) {
  return (
    <Header>
      <Title>
        <Name>Application {id}</Name>
        <Status>{status}</Status>
      </Title>
    </Header>
  );
}
