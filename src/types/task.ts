export type Task = {
    id?: string;
    userId?: string;
    title: string;
    label?: string;
    desc: string;
    createdAt?: Date;
    updatedAt?: Date;
  
}

export type ListTasksResponse = {
    data: Task[];
    success: boolean;
    message: string;
    pagination: {
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }
}

export type CreateTaskRequest = {
    data: Task;
    success: boolean;
    message: string;
}

export type DeleteTaskResponse = CreateTaskRequest;