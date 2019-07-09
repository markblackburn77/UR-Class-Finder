import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  // API Endpoints
  private baseUrl = 'http://127.0.0.1:5000/';
  private searchClassesUrl: string = this.baseUrl + 'SearchClasses';
  private sameClassesSearchUrl: string = this.baseUrl + 'SameClassSearch';

  constructor(private http: HttpClient) {}

  /**
   * Encode data from search form and send request to API
   * @param data dictionary of params to send to server
   */
  sendSearchData(data) {
    // Post data to send
    const requestBody = {
      class_name: data.class_name,
      crn: data.crn,
      professor: data.professor,
      department: data.department
    };
    return this.sendPostRequest(requestBody, this.searchClassesUrl);
  }

  /**
   * Encode data and send request to API
   * @param data String of class names to be sent as value
   */
  sendSameClassSearchData(namesArray: string[]) {
    // Add the parameter
    const requestBody = { classes_names: namesArray };

    return this.sendPostRequest(requestBody, this.sameClassesSearchUrl);
  }

  /**
   * Send post request to server and return JSON response
   * @param params
   * @param url
   */
  private sendPostRequest(requestBody: any, endpoint: string) {
    // Add headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    // Send request
    return this.http.post(endpoint, requestBody, httpOptions);
  }
}
