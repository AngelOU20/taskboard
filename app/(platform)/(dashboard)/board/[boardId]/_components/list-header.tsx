'use client';

import { FormInput } from '@/components/form/form-input';
import { List } from '@prisma/client';
import { useEditing } from '@/hooks/useEditing';
import { useState } from 'react';
import { useEscapeOutside } from '@/hooks/useEscapeOutside';
import { useAction } from '@/hooks/useAction';
import { updateList } from '@/actions/update-list';
import { toast } from 'sonner';
import { ListOptions } from './list-options';

interface ListHeaderProps {
  onAddCard: () => void;
  data: List;
}

export const ListHeader = ({ onAddCard, data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const { inputRef, formRef, enableInputEditing, disableEditing, isEditing } =
    useEditing();

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEscapeOutside({ formRef, disableEditing });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    if (title === data.title || title.length < 3) return disableEditing();

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableInputEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};
