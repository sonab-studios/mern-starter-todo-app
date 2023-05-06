import { Button, Header } from 'semantic-ui-react';

import { useLogout } from 'hooks/useLogout';
import { AddList } from 'components/addList/AddList';
import { Content } from 'components/content/Content';

import { useDashboard } from 'pages/dashboard/dashboard.hooks';
import {
    Wrapper,
    HeaderWrapper,
    Title,
    Container,
    SideWrapper,
    ContentWrapper,
    ListWrapper,
    Spacer,
} from 'pages/dashboard/dashboard.styles';

export const Dashboard = () => {
    const {handleSelect, selectedId, lists } = useDashboard();
    const { handleLogout } = useLogout();

    return (
        <Wrapper>
            <HeaderWrapper>
                <Title>
                    <Header as='h2'>List App</Header>
                </Title>
                <Button
                    onClick={handleLogout}
                    icon='sign-out'
                    labelPosition='right'
                    content='Logout'
                />
            </HeaderWrapper>
            <Container>
                <SideWrapper>
                    <AddList />
                    <ListWrapper>
                        <Button.Group vertical fluid>
                            {lists?.map((item) => (
                                <Button
                                    active={selectedId === item._id}
                                    id={item._id}
                                    key={item._id}
                                    onClick={handleSelect}
                                    size='large'
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Button.Group>
                    </ListWrapper>
                </SideWrapper>
                <ContentWrapper>
                    <Spacer />
                    <Content />
                </ContentWrapper>
            </Container>
        </Wrapper>
    );
};
