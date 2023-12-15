import styled from "styled-components";
import Heading from "./Heading";
import useUser from "../features/authentication/useUser";
import Logout from "./Logout";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;

  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  color: #ffffff;

  & span {
    font-weight: 600;
  }

  @media (max-width: 60em) {
    align-items: center;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  /* background-color: var(--color-grey-700); */
  /* background-color: rgba(77, 43, 43, 0.781); */
  background-image: linear-gradient(
    260deg,
    #3d67ff 0%,
    #6b3aff 50%,
    #da96fc 80%
  );
  backdrop-filter: blur(30px);
  padding: 0.4rem 1.5rem;
  border-radius: 0.3rem;
  outline: 2px solid #3d67ff;
  outline-offset: 2px;

  @media (max-width: 60em) {
    padding: 0.4rem 1rem;
  }
`;
const AvatarContainer = styled.div`
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.15rem;
  border-radius: 50%;

  @media (max-width: 60em) {
    height: 3rem;
    width: 3rem;
  }
  @media (max-width: 45em) {
    height: 4rem;
    width: 4rem;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 0.3rem;
  /* border-radius: 50%; */
  outline: 2px solid var(--color-grey-200);
  outline: 2px solid #3d67ff;
  outline-offset: 2px;
`;

export function UserAvatar() {
  const {
    user: {
      user_metadata: { fullName, avatar },
    },
  } = useUser();

  const avatarImage = avatar ? avatar : "/vite.svg";

  return (
    <StyledUserAvatar>
      <Container>
        <Logout />
        <span>{fullName}</span>
      </Container>
      <AvatarContainer>
        <Avatar src={avatarImage} alt={`Avatar of ${fullName}`} />
      </AvatarContainer>
    </StyledUserAvatar>
  );
}

// Functionality remaining - prefetching & infinite scroll
