import List from '@db/models/list.model';
import { UserModel } from '@db/types/user.types';
import {
    CreateListInput,
    EditListInput,
    EditListItemInput,
    IList,
    ListModel,
    IListItem,
} from '@db/types/list.types';

async function getUserListById(user: UserModel, listId: string): Promise<ListModel> {
    const list = await List.findById(listId);

    if (!list) {
        throw new Error('List not found!');
    }

    if (list?.user.toString() !== user._id.toString()) {
        throw new Error('Forbidden!');
    }

    return list;
}

export async function getAllList(user: UserModel): Promise<ListModel[]> {
    const list = await List.find({ user: user._id.toString() });

    return list;
}

export async function getList(user: UserModel, listId: string): Promise<ListModel | null> {
    const list = await List.findOne({ _id: listId, user: user._id.toString() });

    return list;
}

export async function createList(
    user: UserModel,
    list: CreateListInput,
): Promise<ListModel> {
    const newList: IList = {
        user: user._id,
        ...list,
    };
    return List.create(newList);
}

export async function editList(
    user: UserModel,
    listId: string,
    update: EditListInput,
): Promise<ListModel> {
    const list = await getUserListById(user, listId);

    list.name = update.name;
    return list.save();
}

export async function deleteList(
    user: UserModel,
    listId: string,
): Promise<ListModel> {
    const list = await getUserListById(user, listId);

    return list.deleteOne();
}

export async function addListItem(
    user: UserModel,
    listId: string,
    listItem: IListItem,
): Promise<ListModel> {
    const list = await getUserListById(user, listId);

    list?.listItems?.push(listItem);
    list?.markModified('listItems');
    return list.save();
}

export async function editListItem(
    user: UserModel,
    listId: string,
    listItemId: string,
    update: EditListItemInput,
): Promise<ListModel> {
    const list = await getUserListById(user, listId);

    const listItem = list.listItems?.id(listItemId);
    if (!listItem) {
        throw new Error('List item not found!');
    }

    update.title && (listItem.title = update.title);
    update.details && (listItem.details = update.details);

    list.markModified('listItems');
    return list.save();
}

export async function deleteListItem(
    user: UserModel,
    listId: string,
    listItemId: string,
): Promise<ListModel> {
    const list = await getUserListById(user, listId);

    const listItem = list.listItems?.id(listItemId);
    if (!listItem) {
        throw new Error('List item not found!');
    }

    await listItem.deleteOne();

    list.markModified('listItems');
    return list.save();
}
