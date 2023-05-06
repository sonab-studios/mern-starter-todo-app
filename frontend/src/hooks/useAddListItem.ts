import React, { useCallback, useEffect, useState } from 'react';

import { useRefresh } from 'hooks/useRefresh';
import { useSelected } from 'hooks/useSelected';
import { createListItem } from 'api/toDoList';

export const useAddListItem = () => {
    const { selected } = useSelected();
    const { refresh } = useRefresh();
    const [showForm, setShowForm] = useState(false);
    const [listItemTitle, setListItemTitle] = useState('');
    const [listItemDetails, setListItemDetails] = useState('');

    const resetForm = useCallback(() => {
        setShowForm(false);
        setListItemTitle('');
        setListItemDetails('');
    }, [setShowForm, setListItemTitle, setListItemDetails]);

    useEffect(() => {
        resetForm();
    }, [selected, resetForm]);

    const handleAddListItem = (e: React.MouseEvent<HTMLElement>) => {
        setShowForm(true);
    };

    const handleCancelListItem = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            resetForm();
        },
        [resetForm],
    );

    const handleCreateListItem = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            (async () => {
                if (!selected) return;

                await createListItem(
                    selected?._id,
                    listItemTitle,
                    listItemDetails,
                );
                refresh();

                resetForm();
            })();
        },
        [listItemTitle, listItemDetails, refresh, selected, resetForm],
    );

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

    return {
        showForm,
        handleAddListItem,
        handleCancelListItem,
        handleCreateListItem,
        handleListItemTitleChange,
        handleListItemDetailsChange,
        listItemTitle,
        listItemDetails,
    };
};
