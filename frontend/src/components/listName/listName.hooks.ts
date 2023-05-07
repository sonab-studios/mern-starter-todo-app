import { useCallback, useEffect, useState } from 'react';

import { useSelected } from 'hooks/useSelected';
import { useRefresh } from 'hooks/useRefresh';
import { updateList, deleteList } from 'api/toDoList';

export const useListName = () => {
    const { refresh } = useRefresh();
    const { reset: unSelect, selected } = useSelected();
    const [editMode, setEditMode] = useState(false);
    const [tmpTitle, setTmpTitle] = useState('');

    useEffect(() => {
        setEditMode(false);
    }, [selected]);

    const handleEdit = useCallback(() => {
        setTmpTitle(selected?.name || '');
        setEditMode(true);
    }, [setTmpTitle, setEditMode, selected]);

    const handleCancel = useCallback(() => {
        setTmpTitle('');
        setEditMode(false);
    }, [setTmpTitle, setEditMode]);

    const handleSave = useCallback(() => {
        (async () => {
            if (!selected?._id) return;

            await updateList(selected._id, tmpTitle);
            refresh();

            setTmpTitle('');
            setEditMode(false);
        })();
    }, [refresh, selected, tmpTitle, setTmpTitle, setEditMode]);

    const handleDelete = useCallback(() => {
        (async () => {
            if (!selected?._id) return;

            await deleteList(selected._id, tmpTitle);
            unSelect();
            refresh();

            setTmpTitle('');
            setEditMode(false);
        })();
    }, [refresh, unSelect, selected, tmpTitle, setTmpTitle, setEditMode]);

    const handleChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setTmpTitle(value);
        },
        [setTmpTitle],
    );

    return {
        editMode,
        title: selected?.name ?? 'Title',
        tmpTitle,
        handleEdit,
        handleCancel,
        handleChange,
        handleDelete,
        handleSave,
    };
};
