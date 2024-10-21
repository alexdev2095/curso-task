import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from '../types/task'
import TaskList from '@/sections/dashboard/components/TaskListContainer'
import TaskForm from '../components/TaskFormContainer'
import TaskDetail from '../components/TaskDetailContainer'

const DashboradContainer = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const addTask = (task: Omit<Task, 'id' | 'completed'>) => {
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }])
    }

    const updateTask = (updatedTask: Task) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
        setSelectedTask(null)
        setIsEditing(false)
    }

    const handleUpdate = (updatedTask: Omit<Task, 'id' | 'completed'>) => {
        if (selectedTask) {
            const taskToUpdate = { ...selectedTask, ...updatedTask };
            updateTask(taskToUpdate);
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
        if (selectedTask?.id === id) {
            setSelectedTask(null)
        }
    }

    const toggleComplete = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }
    return (
        <div>
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="container mx-auto p-4 max-w-6xl">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-gray-100">Lista de Tareas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <TaskList
                                        tasks={tasks}
                                        onTaskClick={setSelectedTask}
                                        onTaskToggle={toggleComplete}
                                        onTaskDelete={deleteTask}
                                    />
                                </div>
                                <div className="mt-4">
                                    <TaskForm
                                        onSubmit={isEditing ? handleUpdate : addTask}
                                        initialTask={isEditing ? selectedTask : null}
                                    />
                                    {selectedTask && (
                                        <TaskDetail
                                            task={selectedTask}
                                            onEdit={() => setIsEditing(true)}
                                            onDelete={() => {
                                                deleteTask(selectedTask.id)
                                                setSelectedTask(null)
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboradContainer
