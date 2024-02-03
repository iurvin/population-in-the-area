import styled from "styled-components";

export const ButtonsBlock = styled.div`
    position: absolute;
    top: 20px;
    right: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    & button {
        margin-bottom: 10px;
    }
`;