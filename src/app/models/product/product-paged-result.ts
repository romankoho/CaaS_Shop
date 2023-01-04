import {ProductMinimal} from "./productMinimal";
import {ParsedPaginationToken} from "../base/parsed-pagination-token";

export class ProductPagedResult {
  constructor(
    public totalPages: number = 0,
    public firstPage: ParsedPaginationToken = new ParsedPaginationToken(),
    public previousPage: ParsedPaginationToken = new ParsedPaginationToken(),
    public nextPage: ParsedPaginationToken = new ParsedPaginationToken(),
    public lastPage: ParsedPaginationToken = new ParsedPaginationToken(),
    public items?: ProductMinimal[],
    public totalCount: number = 0,
  ) {  }
}
