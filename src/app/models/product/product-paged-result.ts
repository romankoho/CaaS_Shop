import {ProductMinimal} from "./productMinimal";
import {ParsedPaginationToken} from "../base/parsed-pagination-token";

export interface ProductPagedResult {
  totalPages: number
  firstPage: ParsedPaginationToken
  previousPage: ParsedPaginationToken
  nextPage: ParsedPaginationToken
  lastPage: ParsedPaginationToken
  items?: ProductMinimal[]
  totalCount: number
}
