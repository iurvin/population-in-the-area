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
    <IconButton onClick={handleClick}>
      <EditIconStyled isActive={isActive} />
    </IconButton>
  )
}

const EditIconStyled = styled(EditIcon)<{isActive?: boolean}>`
  color: ${(props) => props.isActive ? 'white' : 'gray'};
`