import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.4rem 0;
  font-size: 1.5rem;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
    color: var(--color-brand-100);
  }
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      {label && (
        <Label>
          {icon}
          <span>{label}</span>
        </Label>
      )}
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
