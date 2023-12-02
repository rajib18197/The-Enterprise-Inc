import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

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
    <div className={styles.pagination}>
      <p className={styles.paginationText}>
        Showing {(page - 1) * MAX_SIZE_PER_PAGE + 1} to{" "}
        {page * MAX_SIZE_PER_PAGE >= count ? count : page * MAX_SIZE_PER_PAGE}{" "}
        of {count} results
      </p>
      <div className={styles.paginationMain}>
        <div className={styles.paginationBtn}>
          <button onClick={handlePrev}>
            <HiChevronLeft />
          </button>
        </div>

        <div className={styles.paginationPages} onClick={handleClick}>
          {totalPages <= 7 &&
            Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`${page === i + 1 ? styles.current : ""}`}
              >
                {i + 1}
              </button>
            ))}

          {page < stack && totalPages > 7 && (
            <>
              {Array.from({ length: stack }, (_, i) => (
                <button
                  key={i + 1}
                  className={`${page === i + 1 ? styles.current : ""}`}
                >
                  {i + 1}
                </button>
              ))}

              <span>...</span>
              <button>{totalPages}</button>
            </>
          )}

          {page >= stack && totalPages - page < stack && totalPages > 7 && (
            <>
              <button>1</button>
              <span>...</span>
              {Array.from({ length: stack }, (_, i) => (
                <button
                  key={i + 1}
                  className={`${
                    page === totalPages - stack + 1 + i ? styles.current : ""
                  }`}
                >
                  {totalPages - stack + 1 + i}
                </button>
              ))}
            </>
          )}

          {page >= stack && totalPages - page >= stack && (
            <>
              <button>1</button>
              <button>2</button>
              <span>...</span>
              {Array.from({ length: siblingCount }, (_, i) => (
                <button
                  className={`${page === i + 1 ? styles.current : ""}`}
                  key={page - (i + 1)}
                >
                  {page - (i + 1)}
                </button>
              ))}
              <button className={styles.current}>{page}</button>
              {Array.from({ length: siblingCount }, (_, i) => (
                <button
                  className={`${page === i + 1 ? styles.current : ""}`}
                  key={page + (i + 1)}
                >
                  {page + i + 1}
                </button>
              ))}
              <span>...</span>
              <button>{totalPages - 1}</button>
              <button>{totalPages}</button>
            </>
          )}
        </div>

        <div className={styles.paginationBtn}>
          <button onClick={handleNext}>
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
