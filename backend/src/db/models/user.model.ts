import mongoose, { Schema, InferSchemaType } from 'mongoose';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, minLength: 7, trim: true },
});

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

schema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export type User = InferSchemaType<typeof schema>

export default mongoose.model<User>('User', schema);
