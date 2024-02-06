'use client';

import { createList } from '@/actions/create-list';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { ListWrapper } from './list-wrapper';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAction } from '@/hooks/useAction';
import { useEditing } from '@/hooks/useEditing';
import { useParams, useRouter } from 'next/navigation';
import { useEscapeOutside } from '@/hooks/useEscapeOutside';

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const { inputRef, formRef, isEditing, enableInputEditing, disableEditing } =
    useEditing();

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEscapeOutside({ formRef, disableEditing, isClickOutside: true });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;

    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit className="w-full">Add list</FormSubmit>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableInputEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm text-black"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
