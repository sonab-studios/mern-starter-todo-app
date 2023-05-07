import { useMemo } from 'react';

import { useSelected } from 'hooks/useSelected';

export const useContent = () => {
    const { selected } = useSelected();

    const items = useMemo(() => {
        return (
            selected?.listItems?.sort(
                (a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt),
            ) || []
        );
    }, [selected?.listItems]);

    return {
        show: !!selected,
        items,
    };
};
