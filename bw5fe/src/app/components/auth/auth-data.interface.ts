export interface AuthData {
    accessToken: string;
    user: {
        id: number;
        email: string;
        nome: string;
        cognome: string;
        username: string;
        phone: string;
        website: string;
        address?: {};
        company?: {};
    };
}
