import { Observable } from 'rxjs';
import {PageableRequest} from "./pageable-request";
import {PageableResponse} from "./pageable-response";

export interface FindPageableStrategy {
  findPageable(params: PageableRequest): Observable<PageableResponse<any>>;
}
