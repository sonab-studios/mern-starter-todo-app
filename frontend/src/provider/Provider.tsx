import { ReactNode } from 'react';

import { StateContext, UpdaterContext } from 'provider/context';
import { useProvider } from 'provider/hooks';

type Props = {
    children: ReactNode;
};

export const Provider = ({ children }: Props) => {
    const { dispatch, state } = useProvider();

    return (
        <UpdaterContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </UpdaterContext.Provider>
    );
};
