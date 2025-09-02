export interface Pagination<T> {
  data: Array<T>;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  totalItems: number;
  totalPageItems: number;
  page: number;
  size: number;
  sort: string | null;
}

export const defaultPagination = {
  data: [],
  totalPages: 0,
  prevPage: null,
  nextPage: null,
  totalItems: 0,
  totalPageItems: 0,
  page: 1,
  size: 10,
  sort: null,
};

export const paginationButtons = (totalPages: number, page: number): Array<string> => {
  return totalPages <= 7
    ? [
      ...Array(totalPages)
        .fill(1)
        .map((v, i) => v + i),
    ]
    : totalPages === 8 && page <= 4
      ? [
        ...Array(5)
          .fill(1)
          .map((v, i) => v + i),
        '...',
        8,
      ]
      : totalPages === 8 && page > 4
        ? [
          1,
          '...',
          ...Array(9 - 4)
            .fill(4)
            .map((v, i) => v + i),
        ]
        : totalPages > 8 && page <= 4
          ? [
            ...Array(5)
              .fill(1)
              .map((v, i) => v + i),
            '...',
            totalPages,
          ]
          : totalPages > 8 && page >= totalPages - 3
            ? [
              1,
              '...',
              ...Array(totalPages + 1 - (totalPages - 4))
                .fill(totalPages - 4)
                .map((v, i) => v + i),
            ]
            : [String(1), '...', String(page - 1), String(page), String(page + 1), '...', String(totalPages)];
};