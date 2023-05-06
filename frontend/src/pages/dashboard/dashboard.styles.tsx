import styled from '@emotion/styled';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
`;

export const HeaderWrapper = styled.div`
    padding: 16px;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.div``;

export const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

export const SideWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    padding: 8px 8px 16px 16px;
    width: 30%;
    min-width: 250px;
`;

export const ContentWrapper = styled.div`
    padding: 8px 16px 16px 16px;
    width: 70%;
`;

export const ListWrapper = styled.div`
    margin-top: 10px;
    padding: 0;
`;

export const Spacer = styled.div`
    width: 100%;
    height: 55px;
`