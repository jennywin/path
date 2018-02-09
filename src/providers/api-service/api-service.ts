import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  apiUrl: string = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=displayData&lang=en";
  quoteData: any = {};

  constructor(public http: Http, public jsonp: Jsonp) {

  }

  getQuote() {
    return this.jsonp.get(this.apiUrl)
      .map( res => res.json() )
      .catch( e => console.log(e) )
  }

}
