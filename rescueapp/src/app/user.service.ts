import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://rescueapprescue.000webhostapp.com/servidor/";
  private getAllUsersUrl = "get_all_users.php";
  private updateUserUrl = "update_user_su.php"; 
  private getUserByIdUrl = "get_user_by_id.php"; 

  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<ApiResponse> {
    const url = `${this.apiUrl}${this.getAllUsersUrl}`;
    return this.http.get<ApiResponse>(url);
  }


  getUserById(userId: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}${this.getUserByIdUrl}?id=${userId}`;
    return this.http.get<ApiResponse>(url);
  }

  updateUser(user: any): Observable<ApiResponse> {
    const url = `${this.apiUrl}${this.updateUserUrl}`;
    
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    return this.http.post<ApiResponse>(url, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
     
      console.error('Error del cliente:', error.error.message);
    } else {
      
      console.error(`Código de error del servidor: ${error.status}, ` + `Mensaje: ${error.error.message}`);
    }
    return throwError('Hubo un error en la solicitud. Por favor, intenta nuevamente.');
  }
}
