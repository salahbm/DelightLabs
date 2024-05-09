export type TCursorPagination<T> = {
  next: string | null;
  previous: string | null;
  results: T[];
};

export type TPagination<T> = {
  next: string | null;
  previous: string | null;
  results: T[];
  count: number;
  page_size: number;
};

export type TParamsWithCursor<T> = T & { cursor: string | null };

export type TBar = {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volume: number;
};
