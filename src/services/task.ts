import { type Task, type ListTasksResponse, type CreateTaskRequest, type DeleteTaskResponse } from "@/types/task"
import http from "@/utils/http"

export const ListTaskServices = async (): Promise<Task[]> => {
    const {data } = await http.get<ListTasksResponse>("/task")
    return data.data;
}

export const CreateTaskService = async (task: Task): Promise<boolean> => {
    const { data } = await http.post<CreateTaskRequest>("/task", { 
        title : task.title,
        desc : task.desc,
        label: task.label,

    })
    return data.success;
}

export const DeleteTaskService = async (taskId: string): Promise<boolean> => {
    const { data } = await http.delete<DeleteTaskResponse>(`/task/${taskId}`)
    return data.success;
}