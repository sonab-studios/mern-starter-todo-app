import { Button, Input } from 'semantic-ui-react';

import { useAddList } from 'hooks/useAddList';
import {
    Wrapper,
    InputWrapper,
    Controls,
} from 'components/addList/addList.styles';

export const AddList = () => {
    const {
        handleAddList,
        handleCancelList,
        handleCreateList,
        handleListChange,
        newList,
        showForm,
    } = useAddList();

    return (
        <Wrapper>
            {showForm ? (
                <>
                    <InputWrapper>
                        <Input
                            value={newList}
                            onChange={handleListChange}
                            placeholder='New List'
                            fluid
                        />
                    </InputWrapper>

                    <Controls>
                        <Button
                            onClick={handleCreateList}
                            icon='checkmark'
                            size='small'
                        />
                        <Button
                            onClick={handleCancelList}
                            icon='cancel'
                            size='small'
                        />
                    </Controls>
                </>
            ) : (
                <Button
                    onClick={handleAddList}
                    icon='add'
                    labelPosition='right'
                    content='New List'
                    color='blue'
                />
            )}
        </Wrapper>
    );
};
