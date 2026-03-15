export interface User {
    id: number;
    role: 'admin' | 'user';
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    friends: number[];
}
