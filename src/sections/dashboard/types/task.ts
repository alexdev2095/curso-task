type Priority = 'low' | 'medium' | 'high'

export type Task = {
    id: number
    title: string
    description: string
    dueDate: string
    priority: Priority
    completed: boolean
}


export type TaskListProps = {
    tasks: Task[]
    onTaskClick: (task: Task) => void
    onTaskToggle: (id: number) => void
    onTaskDelete: (id: number) => void
}

export type TaskDetailProps = {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
};

export type TaskFormProps = {
    onSubmit: (task: Omit<Task, 'id' | 'completed'>) => void
    initialTask: Task | null
}