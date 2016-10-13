from django.db import models
from bbs.models import UserProfile

class WebGroup(models.Model):
    name = models.CharField(max_length=64,verbose_name='群名字')
    brief = models.CharField(max_length=255,blank=True,null=True,verbose_name='群简介')
    owner = models.ForeignKey(UserProfile,verbose_name='群主')
    admins = models.ManyToManyField(UserProfile,blank=True,related_name='group_admins',verbose_name='群管理员')
    members = models.ManyToManyField(UserProfile,blank=True,related_name='group_members',verbose_name='群成员')
    max_members = models.IntegerField(default=200)


    class Meta:
        verbose_name = '群组'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name





































