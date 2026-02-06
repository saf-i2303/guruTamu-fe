export type Task = {
    id: string;
    userId: string;
    title: string;
    label?: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  
}