import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  pages: number;
  maxPageCells: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, pages, maxPageCells, onPageChange }: PaginationProps) {
  const totalPages = pages;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxPageCells / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxPageCells) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxPageCells - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxPageCells + 1);
      }
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.paginationList}>
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.page}
          role="page-change"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="NavigateBeforeIcon" className={styles.arrow}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handleClick(page)}
              className={`${styles.page} ${page === currentPage ? styles.active : ''}`}
              role="page-change"
              data-testid={`pagination-btn${index}`}
            >
              {page}
            </button>
          ) : (
            <span key={index}>...</span>
          ),
        )}
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.page}
          role="page-change"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="NavigateNextIcon" className={styles.arrow}>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
