import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, MaxValidator, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  personTypes = [{value: 'PESSOA_FISICA', viewValue: 'Pessoa física'}, {
    value: 'PESSOA_JURIDICA',
    viewValue: 'Pessoa jurídica'
  }]
  isEditing: boolean = false;

  ngOnInit() {
    this.createForm();
    this.verifyEditing();
  }

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private customerService: CustomerService) {
  }

  createForm() {
    const telephones = this.data?.customer?.telephoneNumbers || [];
    this.customerForm = this.formBuilder.group({
      name: [this.data?.customer?.name || null, Validators.required],
      personType: [this.data?.customer?.personType || null, Validators.required],
      documentNumber: [this.data?.customer?.documentNumber || null],
      registerNumber: [this.data?.customer?.registerNumber || null],
      telephoneNumbers: this.formBuilder.array(
        telephones.map((telephone: any) =>
          this.formBuilder.group({
            number: [telephone.number || null, Validators.max(8)],
            ddd: [telephone.ddd || null, Validators.max(2)],
          })
        )
      ),
    });
  }

  get telephones() {
    return this.customerForm.controls["telephoneNumbers"] as FormArray;
  }

  addTelephones() {
    const telephoneForm = this.formBuilder.group({
      number: ['',],
      ddd: ['',]
    });
    this.telephones.push(telephoneForm);
  }

  deleteTelephone(telephoneIndex: number) {

    this.telephones.removeAt(telephoneIndex);
  }

  createCustomer() {
    this.customerService.create(this.getCustomerRequestObject()).subscribe((res) => {
      console.log(res);
    })
  }

  editCustomer() {
    this.customerService.update(this.getCustomerRequestObject(), this.data.customer.id).subscribe((res) => {
      console.log(res);
    })
  }

  save() {
    this.isEditing ? this.editCustomer() : this.createCustomer();
  }

  getCustomerRequestObject() {
    const form = this.customerForm.value;
    return {
      name: form.name,
      personType: form.personType,
      documentNumber: form.documentNumber,
      registerNumber: form.registerNumber,
      telephoneNumbers: this.telephones.value
    }
  }

  verifyEditing(): void {
    this.isEditing = !!this.data?.customer?.id;
  }
}
