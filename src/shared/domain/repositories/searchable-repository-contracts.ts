import { Entity } from "../entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
}

export class SearchParams {
  protected _page: number;
  protected _perPage = 15;
  protected _sort: string | null;
  protected _sortDir: SortDirection
  protected _filter: string | null;

  constructor(props: SearchProps){
    this._page = props.page
    this._perPage = props.perPage
    this._sort = props.sort
    this._sortDir = props.sortDir
    this._filter = props.filter
  }

  get page(): number {
    return this._page
  }

  private set page(page: number) {
  }

  get perPage(): number {
    return this._perPage
  }

  private set perPage(perPage: number) {
  }

  get sort(): string | null {
    return this._sort
  }

  private set sort(sort: string | null) {
  }

  get sortDir(): SortDirection {
    return this._sortDir
  }

  private set sortDir(sortDir: SortDirection) {
  }

  get filter(): string | null {
    return this._filter
  }

  private set filter(filter: string | null) {
  }
}

export interface SearchableRepositoryInterface<E extends Entity, SearchInput, SearchOutput> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}


