import { ElementRef, RefObject, useRef, useState } from "react";

interface EditingOptions {
  isEditing: boolean,
  enableEditing: () => void,
  disableEditing: () => void,
  formRef: RefObject<HTMLFormElement>,
  inputRef: RefObject<HTMLInputElement>,
}

export const useEditing = (): EditingOptions => {
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    enableEditing,
    disableEditing,
    formRef,
    inputRef,
  };
};
