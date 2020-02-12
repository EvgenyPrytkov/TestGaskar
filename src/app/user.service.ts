import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  /** GET user by id. Will 404 if id not found */
  // getUser(id: number): Observable<User> {
  //   const url = `${this.usersUrl}/${id}`;
  //   return this.http.get<User>(url)
  //     .pipe(
  //       tap(_ => console.log(`fetched user id=${id}`)),
  //       catchError(this.handleError<User>(`getUser id=${id}`))
  //     );
  // }

  getUser(id: number): Observable<User> {
    return of((JSON.parse(localStorage.getItem('users'))).filter(x => x.id == id)[0]);
  }

  /** GET users from the server */
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl)
  //     .pipe(tap(_ => console.log('Users fetched')),
  //       catchError(this.handleError<User[]>('getUsers', [])));
  // }

  getUsers(): Observable<User[]> {
    return of(JSON.parse(localStorage.getItem('users')));
  }

  /** PUT: update user on the server */
  // updateUser(user: User): Observable<any> {
  //   return this.http.put(this.usersUrl, user, this.httpOptions)
  //     .pipe(
  //       tap(_ => console.log(`updated user id=${user.id}`)),
  //       catchError(this.handleError<any>('updateUser'))
  //     );
  // }

  updateUser(user: User): Observable<any> {
    let users = JSON.parse(localStorage.getItem('users')).filter(u => u.id !== user.id);
    users.push(user);
    users.sort((a, b) => a.id - b.id);
    localStorage.setItem('users', JSON.stringify(users));
    return of(user);
  }

  /** POST: add a new user to the server */
  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.usersUrl, user, this.httpOptions)
  //     .pipe(
  //       tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
  //       catchError(this.handleError<User>('addUser'))
  //     );
  // }

  addUser(user: User): Observable<User> {
    user.id = JSON.parse(localStorage.getItem('users')).reduce((prev, cur) => {
      if (prev.id > cur.id) {
        return prev;
      }
      return cur;
    }).id + 1;
    let editUser = JSON.parse(localStorage.getItem('users'));
    editUser.push(user);
    // localStorage.clear();
    localStorage.setItem('users', JSON.stringify(editUser));
    return of(user);
  }

  /** DELETE user from server */
  // deleteUser(user: User | number): Observable<User> {
  //   const id = typeof user === 'number' ? user : user.id;
  //   const url = `${this.usersUrl}/${id}`;

  //   return this.http.delete<User>(url, this.httpOptions).pipe(
  //     tap(_ => console.log(`deleted user id=${id}`)),
  //     catchError(this.handleError<User>('deleteUser'))
  //   );
  // }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    let newUsers = JSON.parse(localStorage.getItem('users')).filter(user => user.id !== id);
    console.log(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    return of(JSON.parse(localStorage.getItem('users')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
