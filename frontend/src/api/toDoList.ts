import axios from 'axios';

import { LoginData, List } from 'api/todoList.types';
const baseURL = process.env.REACT_APP_API_URL;

const todoListApi = axios.create({
    baseURL,
});

export function addAuthorization(token: string) {
    todoListApi.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

export async function login(
    email: string,
    password: string,
): Promise<LoginData | null> {
    try {
        const data = await todoListApi.post('/users/login', {
            email,
            password,
        });

        if (data.status === 200) {
            addAuthorization(data.data.token);
            return data.data as LoginData;
        }
        return null;
    } catch (e) {
        // TODO
        return null;
    }
}

export async function logout(token: string): Promise<void> {
    await todoListApi.post('/users/logout', {});
}

export async function getAllList(): Promise<List[]> {
    try {
        const data = await todoListApi.get('/lists/');

        if (data.status === 200) {
            return data.data.list.sort(
                (a: List, b: List) =>
                    Date.parse(b.createdAt) - Date.parse(a.createdAt),
            ) as List[];
        }
        return [];
    } catch (e) {
        // TODO
        return [];
    }
}

export async function createList(name: string): Promise<void> {
    try {
        await todoListApi.post('/lists/', { name });
    } catch (e) {
        // TODO
    }
}

export async function updateList(lid: string, name: string): Promise<void> {
    try {
        await todoListApi.patch(`/lists/${lid}`, { name });
    } catch (e) {
        // TODO
    }
}

export async function deleteList(lid: string, name: string): Promise<void> {
    try {
        await todoListApi.delete(`/lists/${lid}`);
    } catch (e) {
        // TODO
    }
}

export async function createListItem(
    lid: string,
    title: string,
    details: string,
): Promise<void> {
    try {
        await todoListApi.post(`/lists/${lid}/items`, {
            title,
            details,
        });
    } catch (e) {
        // TODO
    }
}

export async function editListItem(
    lid: string,
    iid: string,
    title: string,
    details: string,
): Promise<void> {
    try {
        await todoListApi.patch(`/lists/${lid}/items/${iid}`, {
            title,
            details,
        });
    } catch (e) {
        // TODO
    }
}

export async function deleteListItem(lid: string, iid: string): Promise<void> {
    try {
        await todoListApi.delete(`/lists/${lid}/items/${iid}`);
    } catch (e) {
        // TODO
    }
}
