export interface User {
    id: number;
    role: 'admin' | 'user';
    name: string;
    friends: number[];
}
