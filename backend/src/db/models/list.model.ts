import { Schema, model } from 'mongoose';
import { IListItem, IList, IListModel, IListMethods } from '@db/types/list.types';

export const listItemSchema = new Schema<IListItem>(
    {
        title: { type: String, required: true },
        details: { type: String },
    },
    {
        timestamps: { createdAt: 'addedAt' },
    },
);

const schema = new Schema<IList, IListModel, IListMethods>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        listItems: [listItemSchema],
    },
    {
        timestamps: true,
    },
);

const List = model<IList, IListModel>('List', schema);

export default  List
