import React, { useCallback, useEffect, useState } from 'react';

import { useRefresh } from 'hooks/useRefresh';
import { useSelected } from 'hooks/useSelected';
import { createList } from 'api/toDoList';

export const useAddList = () => {
    const { refresh } = useRefresh();
    const { selected } = useSelected()
    const [showForm, setShowForm] = useState(false);
    const [newList, setNewList] = useState('');

    useEffect(() => {
        setShowForm(false);
    }, [selected]);

    const handleAddList = (e: React.MouseEvent<HTMLElement>) => {
        setShowForm(true);
    };

    const handleCancelList = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            setShowForm(false);
            setNewList('');
        },
        [setShowForm],
    );

    const handleCreateList = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            (async () => {
                await createList(newList);
                refresh();

                setShowForm(false);
                setNewList('');
            })();
        },
        [newList, refresh, setShowForm],
    );

    const handleListChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setNewList(value);
        },
        [],
    );

    return {
        handleAddList,
        handleCancelList,
        handleCreateList,
        handleListChange,
        newList,
        showForm,
    };
};
