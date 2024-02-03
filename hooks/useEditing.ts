import { ElementRef, RefObject, useRef, useState } from "react";

interface EditingOptions {
  isEditing: boolean,
  enableInputEditing: () => void,
  enableTextareaEditing: () => void,
  disableEditing: () => void,
  formRef: RefObject<HTMLFormElement>,
  inputRef: RefObject<HTMLInputElement>,
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export const useEditing = (): EditingOptions => {
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableInputEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const enableTextareaEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    enableInputEditing,
    enableTextareaEditing,
    disableEditing,
    formRef,
    inputRef,
    textareaRef,
  };
};
