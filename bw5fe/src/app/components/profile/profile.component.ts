import { Component , OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user?: User;
  carica:boolean=false;

  constructor(private srv: UserService, private authSrv: AuthService){}

  ngOnInit(): void {
     this.getUser();
  }

  getUser():void{
    this.authSrv.user$.subscribe(item => {
      if(item){
        this.srv.getUser(item!.user.id).subscribe(item => {
          this.user = item;
          this.srv.registra(this.user);
        });
      }

    });
  }

  salva(form: NgForm) {
    this.carica = true;
      form.value['id']= this.user?.id;

      this.srv.salvaImmagineUtente(form.value).subscribe( {
        error: (err:Error) => {
        console.log(err);
          this.carica = false;
          form.reset();
    }, complete: () =>{
        this.getUser();
        form.reset();
        this.carica = false;


      }} );
  }
}
