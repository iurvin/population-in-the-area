import {IconButton} from "../../components/IconButton";
import EditIcon from '../../image/edit.svg?react';
import styled from "styled-components";

interface IEditButton {
  changeStatus: (isActive: boolean) => void;
  isActive: boolean;
}

export const EditButton = ({changeStatus, isActive}: IEditButton) => {
  const handleClick = () => {
    changeStatus(!isActive);
  }

  return (
    <EditButtonStyled onClick={handleClick}>
      <EditIconStyled isActive={isActive} />
    </EditButtonStyled>
  )
}

const EditButtonStyled = styled(IconButton)`
    position: absolute;
    top: 10%;
    right: 10px;
    z-index: 1000;
`;

const EditIconStyled = styled(EditIcon)<{isActive?: boolean}>`
  color: ${(props) => props.isActive ? 'white' : 'gray'};
`