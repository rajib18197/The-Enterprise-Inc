import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledPaginations = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Initial = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export default function Paginations({ count = 15 } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const boundaryCount = 2;
  const initialPage = 4;

  function handleDecrease() {
    if (currentPage === 1) return;

    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }

  function handleIncrease() {
    if (currentPage === count) return;

    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledPaginations>
      <div onClick={handleDecrease}>
        <HiOutlineArrowLeft />
      </div>

      {currentPage < initialPage && (
        <Initial>
          <RowButtons
            currentPage={currentPage}
            size={initialPage}
            formula={(i) => i + 1}
          />

          <div>...</div>

          <RowButtons
            currentPage={currentPage}
            size={boundaryCount}
            count={count}
            formula={(i, size, count) => count - size + i + 1}
          />
        </Initial>
      )}

      {currentPage <= count - initialPage + 1 && currentPage >= initialPage && (
        <Initial>
          <RowButtons
            currentPage={currentPage}
            size={boundaryCount}
            count={count}
            formula={(i, size, count, currentPage) => i + 1}
          />
          <div>...</div>

          <RowButtons
            currentPage={currentPage}
            size={3}
            formula={(i, size, count, currentPage) => currentPage - 1 + i}
          />

          <div>...</div>

          <RowButtons
            currentPage={currentPage}
            size={boundaryCount}
            count={count}
            formula={(i, size, count, currentPage) => count - size + i + 1}
          />
        </Initial>
      )}

      {currentPage > count - initialPage + 1 && (
        <Initial>
          <RowButtons
            currentPage={currentPage}
            size={boundaryCount}
            formula={(i) => i + 1}
          />

          <div>...</div>

          <RowButtons
            currentPage={currentPage}
            size={initialPage}
            count={count}
            formula={(i, size, count) => count - size + i + 1}
          />
        </Initial>
      )}

      <div onClick={handleIncrease}>
        <HiOutlineArrowRight />
      </div>
    </StyledPaginations>
  );
}

function RowButtons({ currentPage, size, count, formula }) {
  return (
    <Row>
      {Array.from({ length: size }, (_, i) => (
        <Button
          key={formula(i, size, count, currentPage)}
          active={
            currentPage === Number(formula(i, size, count, currentPage))
              ? "true"
              : "false"
          }
        >
          {formula(i, size, count, currentPage)}
        </Button>
      ))}
    </Row>
  );
}

const StyledButton = styled.button`
  display: block;
  width: 4rem;
  height: 4rem;

  cursor: pointer;
  border: none;
  border-radius: 50%;
  outline: none;

  ${(props) =>
    props.active === "true"
      ? css`
          background-color: orangered;
          color: white;
        `
      : css`
          background-color: #101d28;
          color: white;
        `}

  &:hover {
    background-color: #ffabab;
    color: #444;
  }
`;

function Button({ children, active }) {
  return <StyledButton active={active}>{children}</StyledButton>;
}
