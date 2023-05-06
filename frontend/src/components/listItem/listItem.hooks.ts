import { useCallback, useEffect, useMemo, useState } from 'react';

import { editListItem, deleteListItem } from 'api/toDoList';
import { useSelected } from 'hooks/useSelected';
import { useRefresh } from 'hooks/useRefresh';

type Props = {
    _id: string;
    addedAt: string;
    title: string;
    details?: string;
};

export const useListItem = ({ _id, title, details = '', addedAt }: Props) => {
    const { refresh } = useRefresh();
    const { selected } = useSelected();
    const [editMode, setEditMode] = useState(false);
    const [listItemTitle, setListItemTitle] = useState('');
    const [listItemDetails, setListItemDetails] = useState('');

    const reset = useCallback(() => {
        setListItemTitle('');
        setListItemDetails('');
        setEditMode(false);
    }, [setListItemTitle, setListItemDetails, setEditMode]);

    useEffect(() => {
        reset();
    }, [selected, reset]);

    const handleEditListItem = useCallback(() => {
        setListItemTitle(title);
        setListItemDetails(details);
        setEditMode(true);
    }, [title, details, setListItemTitle, setListItemDetails, setEditMode]);

    const handleCancelListItem = useCallback(() => {
        reset();
    }, [reset]);

    const handleDeleteListItem = useCallback(() => {
        (async () => {
            if (!selected) return;

            await deleteListItem(selected?._id, _id);
            refresh();

            reset();
        })();
    }, [reset, refresh, selected, _id]);

    const handleSaveListItem = useCallback(() => {
        (async () => {
            if (!selected) return;

            await editListItem(
                selected?._id,
                _id,
                listItemTitle,
                listItemDetails,
            );
            refresh();

            reset();
        })();
    }, [selected, refresh, reset, listItemTitle, listItemDetails, _id]);

    const handleListItemTitleChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setListItemTitle(value);
        },
        [setListItemTitle],
    );

    const handleListItemDetailsChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
            setListItemDetails(value);
        },
        [setListItemDetails],
    );

    const date = useMemo(() => {
        const newDate = new Date(addedAt);
        return newDate.toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }, [addedAt]);

    return {
        date,
        editMode,
        handleEditListItem,
        handleDeleteListItem,
        handleCancelListItem,
        handleSaveListItem,
        handleListItemTitleChange,
        handleListItemDetailsChange,
        listItemTitle,
        listItemDetails,
    };
};
