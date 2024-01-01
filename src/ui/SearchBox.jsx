import styled from "styled-components";

const InputSearch = styled.input`
  justify-self: center;
  border: none;
  padding: 1.1rem 1.6rem;
  font-size: 1.8rem;
  border-radius: 0.4rem;
  width: 40rem;
  transition: all 0.3s;
  color: var(--color-grey-600);
  background-color: var(--color-grey-200);

  &::placeholder {
    color: var(--color-text-dark);
  }

  &:focus {
    outline: none;
    box-shadow: 0 1.4rem 2.4rem rgba(224, 216, 216, 0.445);
    transform: translateY(-2px);
  }
`;

export default function SearchBox({ value, onChange }) {
  function handleChange(fn, seconds) {
    let id;
    return (value) => {
      if (id) clearTimeout(id);

      id = setTimeout(() => {
        fn(value);
      }, seconds);
    };
  }

  const onValue = handleChange(onChange, 500);

  return (
    <div>
      <InputSearch
        placeholder="Search"
        defaultValue={value}
        onChange={(e) => onValue(e.target.value)}
      />
    </div>
  );
}
