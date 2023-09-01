import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { ClientiService } from 'src/app/service/cliente.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from '../auth/auth.service';
import { Cliente } from 'src/app/model/cliente';
import { TipoCliente } from 'src/app/model/tipo-cliente';

@Component({
  selector: 'app-gestione-post',
  templateUrl: './gestione-cliente.component.html',
  styleUrls: ['./gestione-cliente.component.scss']
})
export class GestioneClienteComponent implements OnInit, OnDestroy{

  cliente?:Cliente | null;

  //users: User[] = [];


  constructor(private srv: ClientiService, private usrv: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.srv.post$.subscribe(item => {
      if(item){
        this.cliente = item;
      }else{
        this.cliente = {
          ragioneSociale: '',
      partitaIva:'',
      email:'',
      dataInserimento:undefined,
      dataUltimoContatto: undefined,
      fatturatoAnnuale: undefined,
      pec:'',
      telefono:'',
      emailContatto:'',
      nomeContatto:'',
      cognomeContatto:'',
      telefonoContatto:'',
      tipo:TipoCliente.SRL,
      id:undefined,
        };
      }
    });

    this.usrv.user$.subscribe(item => {
      if(this.cliente){
        //this.post!.userId = item?.user.id;
      }
    });



  }

  submit():void{
    console.table(this.cliente);
    if(this.cliente){
      if(this.cliente?.id){
        this.srv.update(this.cliente!).subscribe();
      }else{
        this.srv.send(this.cliente!).subscribe();
      }
      setTimeout(() => {
        this.router.navigate(['/posts']);
      }, 1000);

    }
  }

  ngOnDestroy(): void {
    this.srv.deregister();
  }

  getTipi():TipoCliente[]{
    return [TipoCliente.SAS, TipoCliente.SRL, TipoCliente.SPA];
  }
}
