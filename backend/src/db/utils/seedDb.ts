import UserModel, { User } from '../models/user.model';

const defaultUsers: User[] = [
    {
        email: 'foo@bar.com',
        firstName: 'Foo',
        lastName: 'Bar',
        password: 'Password!23',
    },
    {
        email: 'goo@bar.com',
        firstName: 'Goo',
        lastName: 'Bar',
        password: 'Password!23',
    },
];

export async function seedDbDefaultUsers() {
    for (const user of defaultUsers) {
        const foundUser = await UserModel.findOne({ email: user.email });

        if (!foundUser) {
            const newUser = new UserModel({ ...user });
            await newUser.save();
        }
    }
}
