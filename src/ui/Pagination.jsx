import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
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

const StyledPagination = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Text = styled.p`
  color: var(--color-grey-600);
  font-weight: 600;
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

  ${(props) =>
    props.active === "active" &&
    css`
      background-color: var(--color-brand-800);
      color: white;
    `}
`;

const ButtonPages = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const MAX_SIZE_PER_PAGE = 5;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(count / MAX_SIZE_PER_PAGE);
  console.log(page, totalPages);

  const stack = 4;
  const siblingCount = 1;

  function handlePrev() {
    if (page > 1) {
      searchParams.set("page", page - 1);
      setSearchParams(searchParams);
    }
  }

  function handleNext() {
    if (page < totalPages) {
      searchParams.set("page", page + 1);
      setSearchParams(searchParams);
    }
  }

  function handleClick(e) {
    if (e.target.closest("button")) {
      console.log(e.target);
      searchParams.set("page", e.target.textContent);
      setSearchParams(searchParams);
    }
  }

  return (
    <PaginationContainer>
      <Text>
        Showing {(page - 1) * MAX_SIZE_PER_PAGE + 1} to{" "}
        {page * MAX_SIZE_PER_PAGE >= count ? count : page * MAX_SIZE_PER_PAGE}{" "}
        of {count} results
      </Text>

      <StyledPagination>
        <Button onClick={handlePrev}>
          <HiChevronLeft />
        </Button>

        <ButtonPages onClick={handleClick}>
          {totalPages <= 7 &&
            Array.from({ length: totalPages }, (_, i) => (
              <Button key={i + 1} active={`${page === i + 1 ? "active" : ""}`}>
                {i + 1}
              </Button>
            ))}

          {page < stack && totalPages > 7 && (
            <>
              {Array.from({ length: stack }, (_, i) => (
                <Button
                  key={i + 1}
                  active={`${page === i + 1 ? "active" : ""}`}
                >
                  {i + 1}
                </Button>
              ))}

              <span>...</span>
              <Button>{totalPages}</Button>
            </>
          )}

          {page >= stack && totalPages - page < stack && totalPages > 7 && (
            <>
              <Button>1</Button>
              <span>...</span>
              {Array.from({ length: stack }, (_, i) => (
                <Button
                  key={i + 1}
                  active={`${
                    page === totalPages - stack + 1 + i ? "active" : ""
                  }`}
                >
                  {totalPages - stack + 1 + i}
                </Button>
              ))}
            </>
          )}

          {page >= stack && totalPages - page >= stack && (
            <>
              <Button>1</Button>
              <Button>2</Button>
              <span>...</span>
              {Array.from({ length: siblingCount }, (_, i) => (
                <Button
                  active={`${page === i + 1 ? "active" : ""}`}
                  key={page - (i + 1)}
                >
                  {page - (i + 1)}
                </Button>
              ))}

              <Button active={"active"}>{page}</Button>

              {Array.from({ length: siblingCount }, (_, i) => (
                <Button
                  active={`${page === i + 1 ? "active" : ""}`}
                  key={page + (i + 1)}
                >
                  {page + i + 1}
                </Button>
              ))}
              <span>...</span>
              <Button>{totalPages - 1}</Button>
              <Button>{totalPages}</Button>
            </>
          )}
        </ButtonPages>

        <Button onClick={handleNext}>
          <HiChevronRight />
        </Button>
      </StyledPagination>
    </PaginationContainer>
  );
}
