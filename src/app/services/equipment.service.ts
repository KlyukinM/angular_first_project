import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  apiUrl = 'https://core.nekta.cloud/api/device/metering_devices'

  request = {"page":1,"last_page":0,"sort_field":"id","sort":"desc","search_string":null,"device_state":"all","is_archived":false,"paginate":true,"append_fields":["active_polling","attributes","tied_point"],"per_page":10}

  constructor(private http: HttpClient) {     
  }

  getDevices() {
    return this.http.post(this.apiUrl, this.request).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {    
    return throwError(() => error)
  }
}
