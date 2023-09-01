export interface User {
        id: number,
        username: string,
        nome: string,
        cognome: string,
        email: string,
        eta: number,
        phone: string,
        ruolo: string,
        address: Address,
        company: Company,
        imageUrl?: string,

}

export interface Company{
        name: string,
        catchPhrase: string,
        bs: string,
}

export interface Address{
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
}

export interface Geo{
  lat: number,
  lng: number,
}
