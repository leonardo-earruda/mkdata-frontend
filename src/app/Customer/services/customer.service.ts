import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../dto/Customer";
import {FindPageableStrategy} from "../../utils/findPageableStrategy";
import {PageableResponse} from "../../utils/pageable-response";

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements FindPageableStrategy {
  private url = 'https://296c-2804-14d-8470-80da-51ab-c209-28ea-c984.ngrok-free.app/clientes';

  constructor(private http: HttpClient) {
  }

  findPageable(params: any): Observable<PageableResponse<any>> {
    return this.http.get<PageableResponse<any>>(`${this.url}/pageable`, {
      params,
    });
  }

  findById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  create(reqBody: Customer): Observable<void> {
    return this.http.post<void>(this.url, reqBody);
  }

  update(reqBody: Customer, id: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, reqBody);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
