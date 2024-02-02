import { RefObject } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface EscapeOutsideProps {
  formRef: RefObject<HTMLFormElement>,
  disableEditing: () => void,
  isClickOutside?: boolean;
}

export const useEscapeOutside = ({ formRef, disableEditing, isClickOutside = false }: EscapeOutsideProps) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);

  useOnClickOutside(formRef, isClickOutside ? disableEditing : () => { });
};