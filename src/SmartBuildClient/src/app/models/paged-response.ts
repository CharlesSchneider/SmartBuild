export class PagedResponse<T> {
  totalRecords: number;
  totalFilteredRecords: number;
  data: T;
}
