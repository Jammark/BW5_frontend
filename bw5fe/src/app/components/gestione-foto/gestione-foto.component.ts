import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/model/fattura';
import { Foto } from 'src/app/model/foto';
import { StatoFattura } from 'src/app/model/stato-fattura';
import { ClientiService } from 'src/app/service/cliente.service';
import { FattureService } from 'src/app/service/fattura.service';
import { DateUtil } from 'src/app/util/date-util';

@Component({
  selector: 'app-gestione-foto',
  templateUrl: './gestione-foto.component.html',
  styleUrls: ['./gestione-foto.component.scss']
})
export class GestioneFatturaComponent implements OnInit, OnDestroy{

  fattura?:Fattura;
  carica:boolean = false;
  sub!: Subscription;
  data:Date = new Date();

  constructor(private srv: FattureService, private clienteSrv: ClientiService, private router: Router,
    private rt: ActivatedRoute){}

  submit():void{
      this.carica = true;
      if(this.data){
        this.fattura!.data = DateUtil.formatDate(this.data);
      }
      if(this.fattura?.id){
        console.log(`data inserita:`+ this.data?.toString())


        this.srv.updateFattura(this.fattura).subscribe(
          {
            error: err =>{
              console.error(err);
            },
            complete: () => {
              this.router.navigate([`albums/fotos/${this.fattura?.clienteId}`]);
              this.carica = false;
            }
          }
        );
      }else{
        this.srv.addFattura(this.fattura!).subscribe(
          {
            error: err =>{
              console.error(err);
            },
            complete: () => {
              this.router.navigate([`albums/fotos/${this.fattura?.clienteId}`]);
              this.carica = false;
            }
          }
        );
      }
  }

  ngOnInit(): void {
    this.sub = this.rt.params.subscribe(params => {
      const id = +params['id'];
      this.clienteSrv.getCliente(id).subscribe(cliente => {
        if(cliente){
          this.srv.fattura$.subscribe(fattura => {
            if(fattura){
              this.fattura = fattura!;
              if(this.fattura?.data){
              this.data = new Date(this.fattura!.data);
              console.log('data server:'+this.data);
              }
            }else{

              this.fattura = {
                data: undefined,
                importo: undefined,
                anno: undefined,
                id : undefined,
                numero: undefined,
                stato: undefined,
                clienteId: cliente!.id
              };
              console.log(this.fattura);
            }

          });
        }else{
          alert('Non puoi accedere alla pagina senza il percorso corretto!');
          this.router.navigate(['/albums']);
        }
      });
    });
/*    this.srv.album$.subscribe(album => {

  });*/
  }

  getDateString():string{
    return DateUtil.format(this.data);
  }

  parseDate(s:string | null):Date{
    if (s) {
      return new Date(s);
    }
  return new Date();
  }

  ngOnDestroy(): void {
      this.srv.deregistraFattura();
  }

  getStati():StatoFattura[]{
    return [StatoFattura.EMESSA, StatoFattura.PAGATA, StatoFattura.STORNATA];
  }
}
