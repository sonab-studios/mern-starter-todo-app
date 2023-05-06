import mongoose from 'mongoose';

import { dbUri } from '@common/config';
import User from '@db/models/user.model';
import { CreateUserInput, UserModel } from '@db/types/user.types';
import { userLogin, userLogout } from '@server/handlers/user.handler';

beforeAll(async () => {
    await mongoose.connect(dbUri);

    // try add default user for frontend usage
    try {
        await User.create({
            email: `foo.bar@test.com`,
            password: 'Password!23',
        });
    } catch (e) {
        // user may already exist
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Collection', function () {
    it('Adds new user', async () => {
        const fName = `${Math.random().toString(36).substring(2)}`;
        const lName = `${Math.random().toString(36).substring(2)}`;

        const newUser: CreateUserInput = {
            email: `${fName}.${lName}@test.com`,
            firstName: fName,
            lastName: lName,
            password: 'Password!23',
        };

        const user = await User.create(newUser);
        const { _id, firstName, lastName, email } = user.toPublicJSON();

        expect(_id).toBeTruthy();
        expect(firstName).toMatch(fName);
        expect(lastName).toMatch(lName);
        expect(email).toMatch(`${fName}.${lName}@test.com`);
    });
});

describe('User Handler', function () {
    let user: UserModel | null;
    let token: string;

    beforeAll(async () => {
        const fName = `${Math.random().toString(36).substring(2)}`;
        const lName = `${Math.random().toString(36).substring(2)}`;

        const newUser: CreateUserInput = {
            email: `${fName}.${lName}@test.com`,
            password: 'Password!23',
        };

        user = await User.create(newUser);
    });

    it('Handles user login', async () => {
        if (!user) return;

        expect.assertions(2);
        try {
            const login = await userLogin(user.email, 'Password!23');
            expect(login.user.email).toMatch(user.email);
            expect(login.token).toBeTruthy();

            token = login.token;
        } catch (e: unknown) {
            if (e instanceof Error) {
                expect(e.message).toMatch('');
            }
        }
    });

    it('Handles user login email error', async () => {
        if (!user) return;

        try {
            await userLogin('wrong@email.com', 'Password!23');
        } catch (e: unknown) {
            if (e instanceof Error) {
                expect(e.message).toMatch('User not found!');
            }
        }
    });

    it('Handles user login password error', async () => {
        if (!user) return;

        try {
            await userLogin(user.email, 'wrong-password');
        } catch (e: unknown) {
            if (e instanceof Error) {
                expect(e.message).toMatch('Incorrect password!');
            }
        }
    });

    it('Handles user logout', async () => {
        if (!user) return;

        expect.assertions(0);
        try {
            await userLogout(user, token);
        } catch (e) {
            expect(e).toEqual('error');
        }
    });
});
