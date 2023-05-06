import styled from '@emotion/styled';

import { TextArea as BaseTextArea} from 'semantic-ui-react';

export const EditWrapper = styled.div`
    max-width: 500px;
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;
    padding: 12px 0px;
`;

export const InputWrapper = styled.div`
    flex-grow: 1;
    display : flex;
    flex-flow: column nowrap;
    gap: 8px;
`;

export const Controls = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 3px;
`;

export const TextArea = styled(BaseTextArea)`
    font-size: 12px !important;
    font-weight: 300 !important;
`

export const DateWrapper = styled.div`
    font-size: 10px;
`