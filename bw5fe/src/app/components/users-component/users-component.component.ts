import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.scss']
})
export class UsersComponentComponent {

  utenti?: User[];

  constructor(private srv: UserService){}

  ngOnInit(): void {
    this.srv.getUsers().subscribe(lista => {
      this.utenti = lista;
    });
}

upgrade(u:User):void{
  this.srv.upgrade(u).subscribe(() =>{
    this.srv.getUsers().subscribe(lista => {
      this.utenti = lista;
    });
  });
}

isAdmin(u:User):boolean{
  return u.ruolo == 'ADMIN';
}

hasPermissions():boolean{
  return this.srv.hasWritePermission();
}
}
