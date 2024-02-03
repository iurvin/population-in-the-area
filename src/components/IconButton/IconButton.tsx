import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";
import { ExecutionProps } from "styled-components";
import { FastOmit, Substitute } from "styled-components/dist/types";
import {StyledIconButton} from "./styles.ts";

export function IconButton(props: JSX.IntrinsicAttributes & FastOmit<Substitute<FastOmit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, never>, FastOmit<{}, never>>, keyof ExecutionProps> & FastOmit<ExecutionProps, "as" | "forwardedAs"> & { as?: void | undefined; forwardedAs?: void | undefined; }): JSX.Element {
  return <StyledIconButton {...props} />;
}
