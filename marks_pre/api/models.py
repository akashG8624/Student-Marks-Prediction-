from django.db import models

class StudentMarks(models.Model):
    name = models.CharField(max_length=50)
    math_marks = models.IntegerField()
    physics_marks = models.IntegerField()
    chemistry_marks = models.IntegerField()
    
    
    def __str__ (self):
        return self.name
    
    