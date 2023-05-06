import styled from '@emotion/styled';

import { TextArea as BaseTextArea} from 'semantic-ui-react';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 300px;
`;

export const InputWrapper = styled.div`
    display : flex;
    flex-flow: column nowrap;
    gap: 8px;
    width: 415px;
`;

export const Controls = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
    gap: 3px;
`;

export const TextArea = styled(BaseTextArea)`
    font-size: 12px !important;
    font-weight: 300 !important;
`

export const AddWrapper = styled.div`
    width: 900px;
    display: flex;
    flex-flow: row nowrap;
    gap: 12px;
`