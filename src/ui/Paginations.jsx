import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;

  color: rgb(0, 0, 0);
  border-radius: 4px;
`;

const Text = styled.p`
  color: var(--color-grey-600);
  font-weight: 600;
`;

const StyledPaginations = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Button = styled.button`
  display: block;
  height: 3rem;
  width: 3rem;
  border-radius: 100px;
  background-color: var(--color-brand-600);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
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

const MAX_SIZE_PER_PAGE = 5;

export default function Paginations({ count = 15 } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const totalPages = Math.ceil(count / MAX_SIZE_PER_PAGE);

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
    <PaginationContainer>
      <Text>
        Showing {(currentPage - 1) * MAX_SIZE_PER_PAGE + 1} to{" "}
        {currentPage * MAX_SIZE_PER_PAGE >= count
          ? count
          : currentPage * MAX_SIZE_PER_PAGE}{" "}
        of {count} results
      </Text>

      <StyledPaginations>
        <Button onClick={handleDecrease}>
          <HiChevronLeft />
        </Button>

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

        {currentPage <= count - initialPage + 1 &&
          currentPage >= initialPage && (
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

        <Button onClick={handleIncrease}>
          <HiChevronRight />
        </Button>
      </StyledPaginations>
    </PaginationContainer>
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

// function Button({ children, active }) {
//   return <StyledButton active={active}>{children}</StyledButton>;
// }
