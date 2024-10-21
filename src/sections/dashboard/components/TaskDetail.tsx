import { Task } from '../types/task'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type TaskDetailProps = {
    task: Task
    onEdit: () => void
    onDelete: () => void
}

export default function TaskDetail({ task, onEdit, onDelete }: TaskDetailProps) {
    return (
        <Card className="mt-4 bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-gray-100">{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-2 text-gray-300">{task.description}</p>
                <p className="mb-2 text-gray-300">Fecha límite: {task.dueDate}</p>
                <p className="mb-4 text-gray-300">
                    Prioridad:
                    <Badge className="ml-2" variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                        {task.priority}
                    </Badge>
                </p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={onEdit} variant="outline" className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600">
                    Editar
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                    Eliminar
                </Button>
            </CardFooter>
        </Card>
    )
}