'use client';

import { Board } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { toast } from 'sonner';
import { updateBoard } from '@/actions/update-board';
import { useAction } from '@/hooks/useAction';
import { useEditing } from '@/hooks/useEditing';
import { useState } from 'react';
import { useEscapeOutside } from '@/hooks/useEscapeOutside';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { inputRef, formRef, isEditing, enableInputEditing, disableEditing } =
    useEditing();

  const [title, setTitle] = useState(data.title);

  useEscapeOutside({ formRef, disableEditing });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    if (title === data.title || title.length < 3) return disableEditing();

    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <div>
      <Button
        onClick={enableInputEditing}
        className="font-bold text-lg h-auto w-auto p-1 px-2"
        variant="transparent"
      >
        {title}
      </Button>
    </div>
  );
};
