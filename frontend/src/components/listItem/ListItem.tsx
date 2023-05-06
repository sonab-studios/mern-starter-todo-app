import { Button, Input, Form, List, Icon } from 'semantic-ui-react';

import { ListItem as ListItemProps } from 'api/todoList.types';

import { useListItem } from 'components/listItem/listItem.hooks';
import {
    InputWrapper,
    Controls,
    TextArea,
    EditWrapper,
    DateWrapper,
} from 'components/listItem/listItem.styles';

type Props = {
    item: ListItemProps;
};

export const ListItem = ({ item: { _id, title, details, addedAt } }: Props) => {
    const {
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
    } = useListItem({ _id, addedAt, title, details });

    return (
        <List.Item>
            {editMode ? (
                <List.Content>
                    <EditWrapper>
                        <Controls>
                            <Button
                                onClick={handleSaveListItem}
                                icon='save'
                                size='mini'
                            />
                            <Button
                                onClick={handleDeleteListItem}
                                icon='trash'
                                size='mini'
                            />
                            <Button
                                onClick={handleCancelListItem}
                                icon='cancel'
                                size='mini'
                            />
                        </Controls>
                        <InputWrapper>
                            <Input
                                value={listItemTitle}
                                onChange={handleListItemTitleChange}
                                placeholder='Title'
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
                    </EditWrapper>
                </List.Content>
            ) : (
                <List.Content>
                    <List.Header as='a' onClick={handleEditListItem}>
                        {title}
                    </List.Header>
                    <List.Description>{details || ' '}</List.Description>
                    <DateWrapper>
                        <Icon name='calendar outline' />
                        {`added at ${date}`}
                    </DateWrapper>
                </List.Content>
            )}
        </List.Item>
    );
};
