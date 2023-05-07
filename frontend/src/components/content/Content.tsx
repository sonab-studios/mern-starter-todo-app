import { List } from 'semantic-ui-react';

import { ListName } from 'components/listName/ListName';
import { AddListItem } from 'components/addListItem/AddListItem';
import { ListItem } from 'components/listItem/ListItem';

import { Wrapper } from 'components/content/content.styles';
import { useContent } from 'components/content/content.hooks';

export const Content = () => {
    const { show, items } = useContent();
    return (
        <>
            {show ? (
                <Wrapper>
                    <ListName />

                    <AddListItem />
                    <List divided relaxed size='large'>
                        {items.map((item) => (
                            <ListItem
                                key={item._id}
                                _id={item._id}
                                title={item.title}
                                details={item.details}
                                addedAt={item.addedAt}
                            />
                        ))}
                    </List>
                </Wrapper>
            ) : null}
        </>
    );
};
