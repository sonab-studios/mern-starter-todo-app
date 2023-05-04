import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import { authSecretKey } from '@common/config';
import {
    DecodedToken,
    IUser,
    PublicUserInfo,
    IUserMethods,
    UserModel,
    IUserModel,
} from '@db/types/user.types';

const saltRounds = 10;

const schema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        firstName: { type: String },
        lastName: { type: String },
        password: { type: String, required: true, minLength: 7, trim: true },
        tokens: [{ token: { type: String, required: true } }],
    },
    {
        timestamps: true,
    },
);

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

schema.methods.toPublicJSON = function (): PublicUserInfo {
    const { _id, email, firstName, lastName } = this.toObject();
    return { _id: _id.toString(), email, firstName, lastName };
};

schema.methods.generateAuthToken = async function (): Promise<string> {
    const token = sign({ _id: this._id.toString() }, authSecretKey);

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
};

schema.statics.findByCredentials = async function (
    email: string,
    password: string,
): Promise<UserModel> {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found!');
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password!');
    }

    return user;
};

schema.statics.findUserByToken = async function (
    token: string,
): Promise<UserModel> {
    const decoded = verify(token, authSecretKey);
    const user = await User.findOne({
        _id: (decoded as DecodedToken)._id,
        'tokens.token': token,
    });

    if (!user) {
        throw new Error('User not found!');
    }

    return user;
};

const User = model<IUser, IUserModel>('User', schema);

export default User;
