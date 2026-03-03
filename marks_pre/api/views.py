from django.shortcuts import render
from rest_framework import generics
from .serializers import StudentSerializers
from rest_framework.response import Response
from .models import StudentMarks
import numpy as np
from rest_framework import status
import joblib

model = joblib.load('marks_pre.pkl')

class StudentPreView(generics.CreateAPIView):
    queryset = StudentMarks.objects.all()
    serializer_class = StudentSerializers
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        
        self.perform_create(serializer)
        
        marks_data = serializer.validated_data
        input_features = [
            marks_data['math_marks'],
            marks_data['physics_marks'],
            marks_data['chemistry_marks']
        ]
        
        input_array = np.array(input_features).reshape(1, -1)

        prediction = model.predict(input_array)[0]

        
        return Response(
            {
                "student": serializer.data,
                "predicted_result": prediction

            },
            status=status.HTTP_201_CREATED

        )

