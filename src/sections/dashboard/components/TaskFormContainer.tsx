import { useState, useEffect } from 'react'
import { TaskFormProps } from '../types/task'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const TaskFormContainer = ({ onSubmit, initialTask }: TaskFormProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title)
            setDescription(initialTask.description)
            setDueDate(initialTask.dueDate)
            setPriority(initialTask.priority)
        }
    }, [initialTask])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ title, description, dueDate, priority })
        setTitle('')
        setDescription('')
        setDueDate('')
        setPriority('medium')
    }

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-gray-100">{initialTask ? 'Editar Tarea' : 'Agregar Tarea'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300">Título</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="bg-gray-700 text-gray-100 border-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300">Descripción</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-700 text-gray-100 border-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dueDate" className="text-gray-300">Fecha límite</Label>
                        <Input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            className="bg-gray-700 text-gray-100 border-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="priority" className="text-gray-300">Prioridad</Label>
                        <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                            <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
                                <SelectValue placeholder="Selecciona la prioridad" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                                <SelectItem value="low">Baja</SelectItem>
                                <SelectItem value="medium">Media</SelectItem>
                                <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        {initialTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default TaskFormContainer