'use client';

import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from '@/hooks/useCardModal';

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate cursor-pointer border-2 border-transparent hover:border-rose-500 py-2 px-3 text-sm bg-white rounded-md shadow-sm transition ease-out duration-500 delay-100"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
