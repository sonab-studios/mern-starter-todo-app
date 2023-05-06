import { Button, Input, Header } from 'semantic-ui-react';
import {
    Wrapper,
    InputWrapper,
    Controls,
    Editable,
} from 'components/listName/listName.styles';

import { useListName } from 'components/listName/listName.hooks';

export const ListName = () => {
    const {
        editMode,
        title,
        tmpTitle,
        handleCancel,
        handleEdit,
        handleDelete,
        handleChange,
        handleSave,
    } = useListName();

    return (
        <Wrapper>
            {editMode ? (
                <>
                    <InputWrapper>
                        <Input
                            onChange={handleChange}
                            value={tmpTitle}
                            fluid
                            size='small'
                        />
                    </InputWrapper>

                    <Controls>
                        <Button onClick={handleSave} icon='save' size='tiny' />
                        <Button
                            onClick={handleDelete}
                            icon='trash'
                            size='tiny'
                        />
                        <Button
                            onClick={handleCancel}
                            icon='cancel'
                            size='tiny'
                        />
                    </Controls>
                </>
            ) : (
                <Editable onClick={handleEdit}>
                    <Header as='h2'>{title}</Header>
                </Editable>
            )}
        </Wrapper>
    );
};
