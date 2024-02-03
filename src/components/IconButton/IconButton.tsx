import { JSX } from "react/jsx-runtime";
import {StyledIconButton} from "./styles.ts";

export function IconButton(props: any): JSX.Element {
  return <StyledIconButton {...props} />;
}
