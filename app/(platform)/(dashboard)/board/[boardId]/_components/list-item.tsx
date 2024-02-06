'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ListWithCards } from '@/types';
import { ListHeader } from './list-header';
import { useEditing } from '@/hooks/useEditing';
import { CardForm } from './card-form';
import { cn } from '@/lib/utils';
import { CardItem } from './card-item';
import { Card } from '@prisma/client';

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const {
    isEditing,
    formRef,
    textareaRef,
    enableTextareaEditing,
    disableEditing,
  } = useEditing();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader onAddCard={enableTextareaEditing} data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                    data.cards.length > 0 ? 'mt-2' : 'mt-0'
                  )}
                >
                  {data.cards.map((card: Card, index: number) => (
                    <CardItem key={card.id} index={index} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              formRef={formRef}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableTextareaEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
