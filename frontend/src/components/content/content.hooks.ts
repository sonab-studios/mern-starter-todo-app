
import { useSelected } from 'hooks/useSelected';

export const useContent = () => {
    const { selected } = useSelected();

    return {
        show: !!selected,
        items: selected?.listItems || [],
    };
};
