import { useState } from 'react'
import { Task } from '@/sections/dashboard/types/task'
// import { TaskListProps } from '@/sections/dashboard/types/task'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type TaskListProps = {
    tasks: Task[]
    onTaskClick: (task: Task) => void
    onTaskToggle: (id: number) => void
    onTaskDelete: (id: number) => void
}

const TaskListContainer = ({ tasks, onTaskClick, onTaskToggle, onTaskDelete }: TaskListProps) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    const [sort, setSort] = useState<'dueDate' | 'priority'>('dueDate')

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed
        if (filter === 'completed') return task.completed
        return true
    })

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === 'dueDate') {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        } else {
            const priorityOrder = { low: 0, medium: 1, high: 2 }
            return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
    })

    return (
        <Card className="mt-4 bg-gray-800 border-gray-700">
            <CardContent>
                <div className="mb-4 flex justify-between mt-2">
                    <Select value={filter} onValueChange={(value: 'all' | 'active' | 'completed') => setFilter(value)}>
                        <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100 border-gray-600">
                            <SelectValue placeholder="Filtrar tareas" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="active">Activas</SelectItem>
                            <SelectItem value="completed">Completadas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={sort} onValueChange={(value: 'dueDate' | 'priority') => setSort(value)}>
                        <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100 border-gray-600">
                            <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                            <SelectItem value="dueDate">Fecha límite</SelectItem>
                            <SelectItem value="priority">Prioridad</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-700">
                            <TableHead className="w-[50px] text-gray-300">Estado</TableHead>
                            <TableHead className="text-gray-300">Título</TableHead>
                            <TableHead className="text-gray-300">Fecha límite</TableHead>
                            <TableHead className="text-gray-300">Prioridad</TableHead>
                            <TableHead className="text-right text-gray-300">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedTasks.map(task => (
                            <TableRow key={task.id} className="border-gray-700">
                                <TableCell>
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() => onTaskToggle(task.id)}
                                    />
                                </TableCell>
                                <TableCell
                                    className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}
                                    onClick={() => onTaskClick(task)}
                                >
                                    {task.title}
                                </TableCell>
                                <TableCell className="text-gray-300">{task.dueDate}</TableCell>
                                <TableCell>
                                    <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" onClick={() => onTaskDelete(task.id)} className="text-gray-300 hover:text-gray-100">
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default TaskListContainer
