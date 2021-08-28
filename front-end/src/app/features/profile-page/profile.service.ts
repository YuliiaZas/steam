import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

  public saveChangesRequest(formValue: UserI): Observable<any> {
    return this.http.patch('/api/profile', formValue);
  }
}
