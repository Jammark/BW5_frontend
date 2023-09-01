import { Component } from '@angular/core';
import { Post } from 'src/app/model/post';
import { ClientiService } from 'src/app/service/cliente.service';
import { OnInit , AfterContentChecked} from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Cliente } from 'src/app/model/cliente';
import { DateUtil } from 'src/app/util/date-util';

@Component({
  selector: 'app-posts',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit, AfterContentChecked{

  clienti: Cliente[];
 // comments : Comment[];
 // users : User[];
  forms: number[] =[];
  remove: number[]=[];
  removing: boolean = false;
  userId? : number;
  comment: number[] = [];
  commenting: boolean = false;

  constructor(private srv: ClientiService, private usrv: UserService,
    private router: Router){
    this.clienti = [];
 //   this.comments = [];
  //  this.users = [];
  }

  ngOnInit(): void {
        this.srv.getClienti().subscribe(items => {
          this.clienti = items.reverse();
        });

        this.usrv.user$.subscribe(item => {
          this.userId = item?.id;
        });
  }

  ngAfterContentChecked(): void {
    if(this.removing){
      this.srv.post$.subscribe(item => {
        if(item){
        this.removing = false;
        this.remove.splice(this.remove.indexOf(item.id!), 1);
        this.srv.deregister();
        }
      });
    }
    if(this.commenting){
      this.srv.post$.subscribe(item => {
          if(item){
            this.commenting = false;
            this.comment.splice(this.comment.indexOf(item.id!), 1);
            this.srv.deregister();
          }
      });
    }
  }



modifica(item:Cliente):void{
  this.srv.register(item);
  this.router.navigate(['/post']);
}

rimuovi(item:Cliente):void{
  this.srv.register(item);
  this.remove.push(item.id!);
  this.srv.rimuovi(item).subscribe({
    error: (err: Error) =>{
      console.error(err);
    },
    complete: () => {
      this.srv.getClienti().subscribe(items => {
        this.clienti = items.reverse();
        this.removing = true;
      });
    }
  });
}

canModify(item:Cliente):boolean{
  return true;//item.userId == this.userId;
}

isRemoving(item:Cliente):boolean{
  if( this.remove.find(val => val == item.id)){
    return true;
  }else{
    return false;
  };
}

getDataString(data?:Date):string{
  return DateUtil.format(data ? data : new Date());
}

 showModal(id:number){

  var myModal = new bootstrap.Modal(document.getElementById(`exampleModal${id}`) as HTMLElement);
  myModal.show();

}

hasPermissions():boolean{
  return this.usrv.hasWritePermission();
}

}
