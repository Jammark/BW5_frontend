import { TipoCliente } from "./tipo-cliente";

export interface Cliente {

      ragioneSociale: string;
      partitaIva:string;
      email:string;
      dataInserimento:string | undefined;
      dataUltimoContatto: string | undefined;
      fatturatoAnnuale: number | undefined;
      pec:string;
      telefono:string;
      emailContatto:string;
      nomeContatto:string;
      cognomeContatto:string;
      telefonoContatto:string;
      tipo:TipoCliente;
      id:number | undefined;

}
