import { api } from './myFetch';
import type { User } from '../../../server/types/index';
import type { DataListEnvelope, DataEnvelope } from '../../../server/types/dataEnvelopes';

export function getUsers() {
    return api<DataListEnvelope<User>>('users');
}

export function getUser(id: number) {
    return api<DataEnvelope<User>>(`users/${id}`);
}

export function createUser(user: Omit<User, 'id'>) {
    return api<DataEnvelope<User>>('users', user);
}

export function updateUser(id: number, user: Partial<User>) {
    return api<DataEnvelope<User>>(`users/${id}`, user, { method: 'PATCH' });
}

export function deleteUserById(id: number) {
    return api<DataEnvelope<User>>(`users/${id}`, undefined, { method: 'DELETE' });
}

export function login(email: string, password: string) {
    return api<DataEnvelope<User>>('users/login', { email, password });
}
