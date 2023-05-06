import { Button, Input, Form } from 'semantic-ui-react';

import { useAddListItem } from 'hooks/useAddListItem';
import {
    Wrapper,
    InputWrapper,
    Controls,
    TextArea,
    AddWrapper,
} from 'components/addListItem/addListItem.styles';

export const AddListItem = () => {
    const {
        handleAddListItem,
        handleCancelListItem,
        handleCreateListItem,
        handleListItemTitleChange,
        handleListItemDetailsChange,
        listItemTitle,
        listItemDetails,
        showForm,
    } = useAddListItem();

    return (
        <Wrapper>
            {showForm ? (
                <AddWrapper>
                    <InputWrapper>
                        <Input
                            value={listItemTitle}
                            onChange={handleListItemTitleChange}
                            placeholder='New Item'
                            fluid
                            size='small'
                        />
                        <Form>
                            <TextArea
                                value={listItemDetails}
                                onChange={handleListItemDetailsChange}
                                placeholder='Details'
                                size='small'
                            />
                        </Form>
                    </InputWrapper>

                    <Controls>
                        <Button
                            onClick={handleCreateListItem}
                            icon='checkmark'
                            size='mini'
                        />
                        <Button
                            onClick={handleCancelListItem}
                            icon='cancel'
                            size='mini'
                        />
                    </Controls>
                </AddWrapper>
            ) : (
                <Button
                    onClick={handleAddListItem}
                    icon='add'
                    labelPosition='right'
                    content='New Item'
                    size='mini'
                />
            )}
        </Wrapper>
    );
};
