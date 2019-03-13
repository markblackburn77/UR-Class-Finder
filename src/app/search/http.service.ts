import { map } from "rxjs/operators";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URLSearchParams } from "@angular/http";

@Injectable()
export class HttpService {
  private url: string = "http://127.0.0.1:5000/RequestDatabase";

  constructor(private http: Http) {}

  sendData(data): Observable<Object> {
    // Encode the parameters in the URL
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("class_name", data.class_name);
    urlSearchParams.append("crn", data.crn);
    urlSearchParams.append("professor", data.professor);
    urlSearchParams.append("department", data.department);

    // Headers for request
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.url, urlSearchParams, options)
      .pipe(map((res: Response) => res.json() || {}));
  }
}
