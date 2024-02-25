from rest_framework import routers
from .api import TaskViewSet  # Importamos el viewset de la API

router = routers.DefaultRouter()

router.register("api/tasks", TaskViewSet, "tasks")  # Registramos la URL de la API

urlpatterns = router.urls  # Asignamos las URLs de la API a urlpatterns
