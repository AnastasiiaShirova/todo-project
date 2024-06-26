import { Routes } from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {ProfileComponent} from "./components/profile/profile.component";

export const routes: Routes = [
  { path: 'users',
    component: UserListComponent,
  },
  { path: 'user/:id',
    component: ProfileComponent,
  },
  {
    path: '**',
    component: UserListComponent,
    pathMatch: "full",
  }
];
