import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TodoInterface} from "../interfaces/todo.interface";
import {map, Observable, switchMap} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly JSON_URL = 'https://jsonplaceholder.typicode.com'
  loggedInUserId = 1;
  constructor(public http: HttpClient) { }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.JSON_URL}/users`).pipe(
      switchMap((users) => {
        const idArr = users.map((user) => user.id);
        let params = new HttpParams({fromObject: {id: idArr}});
        return this.http.get<{ url: string }[]>(`${this.JSON_URL}/photos`, {params})
          .pipe(
            map((photos) => users.map((user) => ({
              ...user,
              photoUrl: photos[user.id - 1].url
            })))
          )
      })
    );
  }

  getUser(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.JSON_URL}/users/${id}`).pipe(
      switchMap((user) => {
        let params = new HttpParams({fromObject: {id: user.id}});
        return this.http.get<{ url: string }[]>(`${this.JSON_URL}/photos`, {params})
          .pipe(
            map((photo) => ({
              ...user,
              photoUrl: photo[0].url
            }))
          )
      })
    )
  }

  getUsersToDos(id: number):Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.JSON_URL}/todos?userId=${id}`);
  }

  deleteToDo(id: number) {
    return this.http.delete(`${this.JSON_URL}/todos/${id}`);
  }

  postToDo(todo: Partial<TodoInterface>) {
    return this.http.post(`${this.JSON_URL}/todos`, todo);
  }

  editToDo(todo: TodoInterface) {
    return this.http.patch(`${this.JSON_URL}/todos/${todo.id}`, todo);
  }
}
