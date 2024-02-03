import { JSX } from "react/jsx-runtime";
import {StyledIconButton} from "./styles.ts";

export function IconButton(props): JSX.Element {
  return <StyledIconButton {...props} />;
}
