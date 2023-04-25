import {AfterViewInit, Directive, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {tap} from 'rxjs/operators';
import {FindPageableStrategy} from './findPageableStrategy';
import {DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZES} from './paginator-config';
import {PageableRequest} from "./pageable-request";
import {PageableResponse} from "./pageable-response";

@Directive()
export abstract class DefaultPaginatorSortDirective<T> implements AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  abstract dataSource: MatTableDataSource<T>;

  protected defaultSortColumn: string;
  private findPageableStrategy: FindPageableStrategy;
  private defaultPageSize = DEFAULT_PAGE_SIZE;

  constructor(findPageableStrategy: FindPageableStrategy, defaultSortColumn: string) {
    this.findPageableStrategy = findPageableStrategy;
    this.defaultSortColumn = defaultSortColumn;
  }

  ngAfterViewInit(): void {
    if (
      this.paginator.pageSizeOptions.toString() !== DEFAULT_PAGE_SIZES.toString() ||
      this.defaultPageSize !== this.paginator.pageSize
    ) {
      throw new Error(
        'To extend the DefaultPaginatorSort class you must call the super.init() method on the OnInit lifecycle'
      );
    }
    this.startSort();
    this.startPaginator();
  }

  getFilter(): void {
    this.paginator.pageIndex === 0 ? this._loadData() : this.paginator.firstPage();
  }

  protected init(): void {
    this.paginator.pageSizeOptions = DEFAULT_PAGE_SIZES;
    this.paginator.pageSize = this.defaultPageSize;
  }

  protected startSort(): void {
    this.sort.sortChange
      .pipe(
        tap(() => {
          this._loadData();
        })
      )
      .subscribe();
  }

  protected startPaginator(): void {
    this.paginator.page
      .pipe(
        tap(() => {
          this._loadData();
        })
      )
      .subscribe();
  }

  protected _loadData(): void {
    if (!this.findPageableStrategy) {
      throw new Error(
        'Could not find findPageableStrategy for this request. You must inject a FindPageableStrategy through super ' +
        'class constructor or implement the _loadData() method in the class'
      );
    }
    this.dataSource.data = [];
    const params = this._getParams();
    this.findPageableStrategy.findPageable(params).subscribe((response: PageableResponse<any>) => {
      this.paginator.length = response.totalElements;
      this.dataSource.data = response.content;
    });
  }

  protected _getParams(): PageableRequest {
    return new PageableRequest(
      this.sort.active || this.defaultSortColumn,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction
    );
  }

  protected handleReloadAfterDelete(): void {
    if (this.dataSource.data.length === 1 && this.paginator.pageIndex !== 0) {
      this.paginator.previousPage();
    } else {
      this._loadData();
    }
  }
}
