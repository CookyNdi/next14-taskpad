import { type Board } from "./board";

export type Workspace = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Board?: Board[];
};
