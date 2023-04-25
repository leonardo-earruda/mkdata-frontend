import { DEFAULT_PAGE_SIZES } from "./paginator-config";

export class PageableRequest {

  page: number;
  linesPerPage: number;
  direction: string;
  orderBy: string;

  constructor(orderBy: string, page: number, linesPerPage: number, direction: string) {
    this.page = page || 0;
    this.linesPerPage = linesPerPage || DEFAULT_PAGE_SIZES[0];
    this.direction = direction || 'ASC';
    this.orderBy = orderBy;
  }
}
