import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/album';
import { User } from 'src/app/model/user';
import { FattureService } from 'src/app/service/fattura.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit{

  albums?: Album[];
  users?: User[];


  constructor(private srv: FattureService, private usrv: UserService){}

ngOnInit(): void {
 // this.srv.getAllFatture().subscribe(lista => this.albums = lista);
  this.usrv.getUsers().subscribe(lista => this.users = lista);
}

getUser(album: Album):User | undefined{
  return this.users?.find(item => item.id == album.userId)
}

registra(item:Album):void{
 // this.srv.registraCliente(item);
}

}
