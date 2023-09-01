import { Component , OnInit, OnDestroy, AfterContentChecked} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Subscription, catchError } from 'rxjs';
import { Fattura } from 'src/app/model/fattura';
import { Foto } from 'src/app/model/foto';
import { StatoFattura } from 'src/app/model/stato-fattura';
import { FattureService } from 'src/app/service/fattura.service';
import { UserService } from 'src/app/service/user.service';
import { DateUtil } from 'src/app/util/date-util';

@Component({
  selector: 'app-fotos',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit, OnDestroy, AfterContentChecked{

  fatture?: Fattura[];
  sub!: Subscription;
  remove: number[] = [];
  removing:boolean=false;
  clienteId?:number;
  fattura?:{
    data: string;
    importo: number | undefined;
    anno: number | undefined;
    stato: StatoFattura | undefined;
    numero: number | undefined;
    clienteId: number | undefined;
    min: number | undefined;
    max:number | undefined;
  } = {
    data: '',
    importo: undefined,
    anno: undefined,
    stato: undefined,
    numero: undefined,
    clienteId: undefined,


      min:undefined,
      max:undefined


  };
  carica:boolean = false;
  data:Date = new Date();
  min?:number;
  max?:number;

constructor(private router: ActivatedRoute, private srv: FattureService, private userSrv: UserService,
  private rt: Router){}

  ngOnInit(): void {
   this.ricaricaLista();
  }

  ngAfterContentChecked(): void {
    if(this.removing){
      this.srv.fattura$.subscribe(item => {
        if(item){
          this.removing = false;
          this.remove.splice(this.remove.indexOf(item.id!), 1);
          this.srv.deregistraFattura();
        }
      });
    }
  }

  ricaricaLista(add?:Function):void{
    this.sub = this.router.params.subscribe(params => {
      const id = +params['id'];
      this.clienteId = id;
      this.srv.getFatture(id) .pipe(
        catchError((err, caught) => {
          this.fatture = [];
          this.removing = false;
          this.srv.fattura$.subscribe(item => {
          this.remove.splice(this.remove.indexOf(item!.id!), 1);
          this.srv.deregistraFattura();
        })

          return [];
        })
    ).subscribe(

        lista => {
        this.fatture = lista.reverse();
        if(add){
          add!();
        }

      });

    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  modifica(item:Fattura):void{
    if(this.clienteId){
    this.srv.registraFattura(item);
    this.rt.navigate(['/albums/gestioneFoto/'+ this.clienteId!]);
    }
  }

  isRemoving(item:Fattura):boolean{
      return this.remove.find(id => id == item.id)? true : false;
  }

  showModal(id:number){

    var myModal = new bootstrap.Modal(document.getElementById(`exampleModal${id}`) as HTMLElement);
    myModal.show();

  }

  rimuovi(item:Fattura):void{
      this.remove.push(item.id!);
      this.srv.cancellaFattura(item).subscribe({
        error: err=>{
          console.error(err);

        },
        complete: ()=>{

          this.ricaricaLista(() => {
            this.removing = true;
            this.srv.registraFattura(item);
          });

        }
      });
  }

  hasPermissions():boolean{
    return this.userSrv.hasWritePermission();
  }

  getStati():StatoFattura[]{
    return [StatoFattura.EMESSA, StatoFattura.PAGATA, StatoFattura.STORNATA];
  }

  submit(){
    if(this.fattura){
      this.fattura!.data = DateUtil.formatDate(this.data);
      this.fattura!.clienteId = this.clienteId
      if(this.fattura.max && this.fattura.min){
        this.srv.cercaFatture(this.fattura, this.fattura.min!, this.fattura.max!).pipe(
          catchError((err, caught) => {
            this.fatture = [];


            return [];
          })
      ).subscribe(lista => {
          this.fatture = lista.reverse();

        });
      }else{
        this.srv.cercaFatture(this.fattura).pipe(
          catchError((err, caught) => {
            this.fatture = [];


            return [];
          })
      ).subscribe(lista => {
          this.fatture = lista.reverse();

        });
      }

    }
  }
}
