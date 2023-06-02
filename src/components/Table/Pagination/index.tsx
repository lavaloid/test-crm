import { Dispatch, SetStateAction } from "react";
import { Button } from "@blueprintjs/core";

import styles from "./styles.module.scss";

type Props = {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  pageCount: number;
};

export const Pagination = (props: Props) => {
  const { activePage, setActivePage, pageCount } = props;

  const prevDisabled = activePage <= 0;
  const nextDisabled = activePage >= pageCount - 1;

  /**
   * Determining which page numbers to show
   * (n = total pages, x = page selected)
   * - If n <= 7, show all:
   *      <  1  2  3  4  5  [6]  7  8  >
   * - If n > 7, show 1, n, and x-2 to x+2:
   *      <  1  [2]  3  4  ...  n  >
   *      <  1  ...  x-2  x-1  [x]  x+1  x+2  ...  n  >
   * We will use -1 to show left dots, -2 to show right dots
   */
  const PAGE_COUNT_BEFORE_HIDE = 7;
  const PAGE_RANGE = 2;
  let pages: number[] = [];

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => i + start);
  };

  if (pageCount <= PAGE_COUNT_BEFORE_HIDE) {
    pages = range(0, pageCount - 1);
  } else {
    if (activePage - PAGE_RANGE <= 1) {
      pages = [...range(0, activePage + 2), -2, pageCount - 1];
    } else if (activePage + PAGE_RANGE >= pageCount - 2) {
      pages = [0, -1, ...range(activePage - 2, pageCount - 1)];
    } else {
      pages = [
        0,
        -1,
        ...range(activePage - 2, activePage + 2),
        -2,
        pageCount - 1,
      ];
    }
  }

  return (
    <div className={styles.paginationContainer}>
      <Button
        className={styles.paginationButton}
        icon="caret-left"
        disabled={prevDisabled}
        aria-label="Previous page"
        onClick={() => setActivePage((page) => page - 1)}
      />
      {pages.map((value) => {
        if (value < 0) {
          return <span key={value}>...</span>;
        } else {
          return (
            <Button
              className={styles.paginationButton}
              key={value}
              active={value === activePage}
              aria-label={`Go to page ${value}`}
              onClick={() => setActivePage(value)}
            >
              {value + 1}
            </Button>
          );
        }
      })}
      <Button
        className={styles.paginationButton}
        icon="caret-right"
        disabled={nextDisabled}
        aria-label="Next page"
        onClick={() => setActivePage((page) => page + 1)}
      />
    </div>
  );
};
