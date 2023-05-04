/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

import { dbUri } from '@common/config';
import List from '@db/models/list.model';
import User from '@db/models/user.model';
import { CreateUserInput, UserModel } from '@db/types/user.types';
import { CreateListInput, IListItem, ListModel } from '@db/types/list.types';
import {
    createList,
    editList,
    deleteList,
    addListItem,
    editListItem,
    deleteListItem,
} from '@server/handlers/list.handler';

describe('List Collection', function () {
    let user: UserModel | null;
    let list: ListModel | null;

    beforeAll(async () => {
        await mongoose.connect(dbUri);

        const fName = `${Math.random().toString(36).substring(2)}`;
        const lName = `${Math.random().toString(36).substring(2)}`;

        const newUser: CreateUserInput = {
            email: `${fName}.${lName}@test.com`,
            password: 'Password!23',
        };

        user = await User.create(newUser);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Adds new list', async () => {
        expect(user).toBeTruthy();
        if (!user) return;

        const rand1 = `tst-${Math.random().toString(36).substring(2)}`;
        const rand2 = `tst-${Math.random().toString(36).substring(2)}`;

        const newList: CreateListInput = {
            name: `${rand1} ${rand2}`,
        };

        const createdList = await createList(user, newList);

        expect(createdList.user.toString()).toMatch(user?._id.toString());
        expect(createdList.name).toMatch(`${rand1} ${rand2}`);
        list = createdList;
    });

    it('Adds item to a list', async () => {
        expect(user).toBeTruthy();
        if (!user) return;

        const rand1 = `tst-${Math.random().toString(36).substring(2)}`;
        const rand2 = `${Math.random().toString(36).substring(2)}`;
        const listItems: IListItem[] = [
            {
                title: `tst-${rand1}`,
                details: `${rand2}`,
            },
            {
                title: `tst-${rand2}`,
                details: `${rand1}`,
            },
        ];

        const addToList = await addListItem(
            user,
            list?._id.toString(),
            listItems[0],
        );

        expect(addToList?.listItems?.length).toEqual(1);
        if (addToList?.listItems?.length !== 1) return;

        const list1 = addToList.listItems[0];
        expect(list1?.title).toMatch(listItems[0].title);
        expect(list1?.details).toMatch(listItems[0]?.details ?? '');

        const addToList2 = await addListItem(
            user,
            list?._id.toString(),
            listItems[1],
        );

        expect(addToList2?.listItems?.length).toEqual(2);
        if (addToList2?.listItems?.length !== 2) return;

        const list2 = addToList2?.listItems[1];
        expect(list2?.title).toMatch(listItems[1].title);
        expect(list2?.details).toMatch(listItems[1]?.details ?? '');
        list = addToList2;
    });

    it('Edits list details', async () => {
        expect(user).toBeTruthy();
        if (!user) return;

        const newName = `tst-${Math.random().toString(36).substring(2)}`;
        const listUpdate = await editList(user, list?._id.toString(), {
            name: newName,
        });

        expect(listUpdate?.name).toMatch(`${newName}`);
    });

    it('Edits list item', async () => {
        expect(user).toBeTruthy();
        if (!user) return;

        if (!list?.listItems || !list.listItems[0]) return;

        const rand1 = `tst-${Math.random().toString(36).substring(2)}-edited`;
        const rand2 = `tst-${Math.random().toString(36).substring(2)}-edited`;

        const targetListItemId = list?.listItems[0]._id?.toString() || '';
        const listItemEdit = await editListItem(
            user,
            list?._id.toString(),
            targetListItemId,
            { title: rand1, details: rand2 },
        );

        expect(listItemEdit?.listItems?.length).toEqual(2);
        if (listItemEdit?.listItems?.length !== 2) return;

        const listItem2 = listItemEdit?.listItems[0];
        expect(listItem2.title).toMatch(rand1);
        expect(listItem2.details).toMatch(rand2);
        list = listItemEdit;
    });

    it('Deletes list item', async () => {
        expect(user).toBeTruthy();
        if (!user) return;

        if (!list?.listItems || !list.listItems[0]) return;

        const targetListItemId = list?.listItems[0]._id?.toString() || '';
        const targetListItemTitle = list?.listItems[0].title;
        const listItemDelete = await deleteListItem(
            user,
            list?._id.toString(),
            targetListItemId,
        );

        expect(listItemDelete?.listItems?.length).toEqual(1);
        if (listItemDelete?.listItems?.length !== 1) return;

        const deletedListItem = listItemDelete?.listItems[0];
        expect(deletedListItem.title).not.toMatch(targetListItemTitle);
    });

    it('Deletes list', async () => {
        expect(user).toBeTruthy();
        if (!user) return;

        await deleteList(user, list?._id.toString());

        const checkDelete = await List.findById(list?._id.toString());
        expect(checkDelete).toEqual(null);
    });
});
