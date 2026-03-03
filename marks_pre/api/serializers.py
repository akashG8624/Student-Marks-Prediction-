from rest_framework import serializers
from .models import StudentMarks


class StudentSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = StudentMarks
        fields = '__all__'