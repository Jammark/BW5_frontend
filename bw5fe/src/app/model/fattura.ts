import { StatoFattura } from "./stato-fattura";

export interface Fattura {

  data:string | undefined;
  anno:number | undefined;
  importo:number | undefined;
  numero:number | undefined;
  stato:StatoFattura | undefined;
  clienteId:number | undefined;
  id:number | undefined;
}
