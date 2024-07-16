import { type Task } from "./task";

export type Board = {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Tasks?: Task[];
};
