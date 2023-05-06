import User from '@db/models/user.model';
import { UserModel, PublicUserInfo } from '@db/types/user.types';

export async function userLogin(
    email: string,
    password: string,
): Promise<{ user: PublicUserInfo; token: string }> {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken()

    return { user: user.toPublicJSON(), token };
}

export async function userLogout(
    user: UserModel,
    token: string,
): Promise<void> {
    user.tokens = user.tokens.filter((tk) => tk.token !== token);
    user.markModified('tokens')

    await user.save();
}
