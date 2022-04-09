import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkWrapperHelper
{

  constructor(
    private _httpClient: HttpClient
  )
  {
  }

  headers = new HttpHeaders()
    .set('content-type', 'application/json');

  post<T>(data: postMethod)
  {

    return this._httpClient.post<T>(
      data.url,
      data.data,
      { headers: this.headers }
    );
  }

  get<T>(data: getMethod)
  {

    return this._httpClient.get<T>(
      data.url,
      {
        params: data.params as any,
        headers: this.headers
      }
    );

  }

  delete<T>(data: getMethod)
  {

    return this._httpClient.delete<T>(
      data.url,
      {
        params: data.params as any,
        headers: this.headers
      }
    );

  }

  put<T>(data: postMethod)
  {

    return this._httpClient.put<T>(
      data.url,
      data.data,
      { headers: this.headers }
    );
  }
}

export interface postMethod
{
  url: string,
  data: any;
}

export interface getMethod
{
  url: string,
  params?: any;
}
