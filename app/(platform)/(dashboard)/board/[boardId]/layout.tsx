import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { BoardNavbar } from './_components/board-navbar';

interface Params {
  boardId: string;
}

interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: Params;
}

interface GenerateMetadataProps {
  params: Params;
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: 'Board',
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || 'Board',
  };
}

const BoardIdLayout = async ({ children, params }: BoardIdLayoutProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
