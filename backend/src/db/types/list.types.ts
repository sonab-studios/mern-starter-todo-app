/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Schema, Document, Model, Types } from 'mongoose';

export interface IListItem {
    title: string;
    details?: string;
}

export interface IList {
    user: { type: Schema.Types.ObjectId; ref: 'User' };
    name: string;
    listItems?: Types.DocumentArray<IListItem>;
}

export interface IListMethods {
    // methods
}

export type CreateListInput = Omit<IList, 'user'>;
export type EditListInput = Pick<IList, 'name'>;
export type EditListItemInput = Partial<IListItem>;
export type ListModel = IList & IListMethods & Document;

export interface IListModel
    extends Model<IList, Record<string, never>, IListMethods> {
    // statics
}
