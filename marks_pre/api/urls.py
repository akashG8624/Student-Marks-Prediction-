from django.urls import path
from .views import StudentPreView


urlpatterns = [
    path("pre/",StudentPreView.as_view(),name = "Student_pre")
]

