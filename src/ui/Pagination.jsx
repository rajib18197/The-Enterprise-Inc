import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const MAX_SIZE_PER_PAGE = 5;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.page) || 4;
  const totalPages = Math.ceil(count / MAX_SIZE_PER_PAGE);
  console.log(page, totalPages);

  const stack = 4;
  const siblingCount = 1;

  return (
    <div>
      <HiChevronLeft />
      {totalPages <= 7 &&
        Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1}>{i + 1}</button>
        ))}

      {page < stack && totalPages > 7 && (
        <div>
          {Array.from({ length: stack }, (_, i) => (
            <button key={i + 1}>{i + 1}</button>
          ))}

          <span>...</span>
          <button>{totalPages}</button>
        </div>
      )}

      {page >= stack && totalPages - page < stack && (
        <div>
          <button>1</button>
          <span>...</span>
          {Array.from({ length: stack }, (_, i) => (
            <button key={i + 1}>{totalPages - stack + 1 + i}</button>
          ))}
        </div>
      )}
      {page >= stack && totalPages - page > stack && (
        <div>
          <button>1</button>
          <button>2</button>
          <span>...</span>
          {Array.from({ length: siblingCount }, (_, i) => (
            <button>{page - (i + 1)}</button>
          ))}
          <button>{page}</button>
          {Array.from({ length: siblingCount }, (_, i) => (
            <button>{page + i + 1}</button>
          ))}
          <span>...</span>
          <button>{totalPages - 1}</button>
          <button>{totalPages}</button>
        </div>
      )}
      <HiChevronRight />
    </div>
  );
}
