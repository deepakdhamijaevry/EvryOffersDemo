import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class MockWrapperService {
  private jsonFileURL: string = "../../assets/mock.json";
  result :any[];
  constructor(private http: Http) {
  }

  getMockData(): Observable<any> {
    return this.http
        .get(this.jsonFileURL)
        .map((response: Response) => {
            return response.json();
        })
        .catch(this.handleError);
}

private handleError(error: Response) {
  return Observable.throw(error.statusText);
}

 

}
