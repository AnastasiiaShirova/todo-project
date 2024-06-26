import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {TodoInterface} from "../../shared/interfaces/todo.interface";
import {NgForOf} from "@angular/common";
import {UserInterface} from "../../shared/interfaces/user.interface";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  userList:UserInterface[] = [];
  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.postToDo(this.mockToDo).subscribe((data) => console.log(data))
    this.userService.getUsers().subscribe((users) => this.userList = users);
  }
  mockToDo: TodoInterface = {
    id: 1,
    title: 'todo1',
    username: 'Mark',
    completed: true,
  }
}
