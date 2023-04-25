import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../../dto/Customer";
import {CustomerService} from "../../services/customer.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DefaultPaginatorSortDirective} from "../../../utils/default-paginator-sort";
import {CustomerFormComponent} from "../../components/customer-form/customer-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends DefaultPaginatorSortDirective<Customer> implements OnInit {
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
  });
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['name', 'personType', 'documentNumber', 'registerNumber', 'telephoneNumbers', 'isActive', 'actions'];
  allStatus = [{value: 'ATIVO', viewValue: 'Ativo'}, {value: 'INATIVO', viewValue: 'Inativo'}]
  isEditing: boolean = false;

  constructor(public customerService: CustomerService, public dialog: MatDialog) {
    super(customerService, 'name');
  }

  ngOnInit() {
    super.init();
    super._loadData();
  }

  openCreateEditDialog(row?: Customer) {
    this.dialog.open(CustomerFormComponent, {
      data: {
        customer: row
      },
    })
      .afterClosed()
      .subscribe(() => this._loadData());
  }

  create() {
    this.openCreateEditDialog();
  }

  edit(id: string) {
    this.customerService.findById(id).subscribe((res) => {
      this.openCreateEditDialog(res);
    })
  }

  delete(id: string) {
    this.customerService.delete(id).subscribe((res) => {
      this._loadData();
    })
  }

  getRequestObject() {
    const form = this.searchForm.value;
    return {
      name: form.name,
      customerStatus: form.status
    }
  }

  override _getParams() {
    const params: any = super._getParams();
    const reqObj = this.getRequestObject();
    const paramsObject: any = {...reqObj, ...params,};
    return paramsObject;
  }

}
