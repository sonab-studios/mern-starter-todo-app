
export type User = {
    _id: string;
    email: string;
}

export type LoginData = {
    token: string;
    user: User
};

export type ListItem = {
    _id: string
    title: string;
    details?: string;
    addedAt: string;
    updateAt: string;
}

export type List = {
    _id: string;
    name: string;
    listItems?: ListItem[]
    createdAt: string;
    updatedAt: string;
}