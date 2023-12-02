import styled from "styled-components";
import Heading from "./Heading";
import useUser from "../features/authentication/useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  color: #4b5563;

  & span {
    font-weight: 600;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-200);
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
      <Avatar src={avatarImage} alt={`Avatar of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}
