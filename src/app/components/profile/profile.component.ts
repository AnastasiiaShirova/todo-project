import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {UserInterface} from "../../shared/interfaces/user.interface";
import {TodoInterface} from "../../shared/interfaces/todo.interface";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatAnchor, MatButton, MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatCheckboxModule,
    MatButtonModule,
    MatAnchor,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: UserInterface | null = null;
  toDos: TodoInterface[] = [];
  userId = +this.activatedRoute.snapshot.params["id"];
  isFormOpened = false;

  newTodoForm: FormControl = new FormControl(null, Validators.required);

  constructor(public userService: UserService, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    if(this.userId === this.userService.loggedInUserId) {
      this.userService.getUsersToDos(this.userId).subscribe((todos: TodoInterface[]) => this.toDos = todos);
    }
    this.userService.getUser(this.userId).subscribe((user) => this.user = user);

  }


  editTodos(todo:TodoInterface) {
    if(todo.completed === false) {
      this.userService.editToDo(todo).subscribe(()=> todo.completed = true);
    } else {
      this.userService.editToDo(todo).subscribe(()=> todo.completed = false);
    }
  }

  addTodo() {
    const newTodo = {
      title: this.newTodoForm.getRawValue(),
      username: this.user?.username,
      completed: false,
    }
    this.userService.postToDo(newTodo).subscribe((data: any) =>
      this.toDos.push(data));
  }

}
