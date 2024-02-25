from rest_framework import viewsets, permissions, status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()  # Este queryset es el que se va a mostrar en la API
    permission_classes = [permissions.AllowAny]  # Permisos para acceder a la API
    serializer_class = TaskSerializer

    @action(detail=True, methods=["post"])
    def done(self, request, pk=None):
        task = self.get_object()  # Busca una unica tarea por su id
        task.done = not task.done  # Cambia el estado de la tarea
        task.save()
        return Response(
            {"status": "Task done" if task.done else "Task undone"},
            status=status.HTTP_200_OK,
        )
