import {IconButton} from "../../components/IconButton";
// @ts-ignore
import Trash from '../../image/trash.svg?react';
import styled from "styled-components";

interface IEditButton {
  changeStatus: (isActive: boolean) => void;
  isActive: boolean;
}

export const RemovePolygonButton = ({changeStatus, isActive}: IEditButton) => {
  const handleClick = () => {
    changeStatus(!isActive);
  }

  return (
    <IconButton onClick={handleClick}>
      <TrashIconStyled isActive={isActive} />
    </IconButton>
  )
}

const TrashIconStyled = styled(Trash)<{isActive?: boolean}>`
  color: ${(props) => props.isActive ? 'white' : 'gray'};
`