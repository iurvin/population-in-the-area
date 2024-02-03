import {IconButton} from "../../components/IconButton";
import EditIcon from '../../image/edit.svg?react';
import styled from "styled-components";

export const EditButton = () => {
  return (
    <EditButtonStyled onClick={() => {
      debugger;
    }}
    >
      <EditIconStyled isActive={true} />
    </EditButtonStyled>
  )
}

const EditButtonStyled = styled(IconButton)`
    position: absolute;
    top: 100px;
    right: 100px;
    z-index: 1000;
`;

const EditIconStyled = styled(EditIcon)<{isActive?: boolean}>`
  color: ${(props) => props.isActive ? 'white' : 'gray'};
`