import mongoose, { Schema, InferSchemaType } from 'mongoose';

export const listItemSchema = new Schema(
    {
        title: { type: String, required: true },
        details: { type: String },
    },
    {
        timestamps: { createdAt: 'addedAt' },
    },
);

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: String, required: true },
        title: { type: String, required: true },
        listItems: [listItemSchema],
    },
    {
        timestamps: true,
    },
);

export type List = InferSchemaType<typeof schema>;

export default mongoose.model<List>('List', schema);
