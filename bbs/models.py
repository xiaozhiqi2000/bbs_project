from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import datetime

class Article(models.Model):
    title = models.CharField(max_length=255,verbose_name='标题')
    brief = models.CharField(null=True,blank=True,max_length=255,verbose_name='简介')
    category = models.ForeignKey('Category',verbose_name='文章分类')
    content = models.TextField(verbose_name='帖子内容')
    author = models.ForeignKey('UserProfile',verbose_name='作者')
    pub_date = models.DateTimeField(null=True,blank=True,verbose_name='发布日期')
    last_modify = models.DateTimeField(auto_now=True,verbose_name='修改日期')
    priority = models.IntegerField(default=9999,verbose_name='优先级')
    head_img = models.ImageField(max_length=200,upload_to='article/%Y/%m/%d',
                                 default='article/default.png',null=True,blank=True,
                                 verbose_name='展示图片')

    status_choices = (
        ('draft','草稿'),
        ('pulished','已发布'),
        ('hidden','隐藏'),
    )

    status = models.CharField(choices=status_choices,default='pulished',max_length=50,verbose_name='文章状态')

    def clean(self):
        if self.status == 'draft' and self.pub_date is not None:
            raise ValidationError('Draft entries may not have a publication date.')
        if self.status == 'published' and self.pub_date is None:
            self.pub_date = datetime.date.today()

    class Meta:
        verbose_name = '帖子'
        verbose_name_plural = verbose_name
        ordering = ['id']

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=64,unique=True,verbose_name='分类名称')
    brief = models.CharField(null=True,blank=True,max_length=255,verbose_name='简介')
    set_as_top_menu = models.BooleanField(default=False,verbose_name='是否展示')
    position_index = models.SmallIntegerField(verbose_name='位置展示')
    admins = models.ManyToManyField('UserProfile',blank=True)

    class Meta:
        verbose_name = '分类信息'
        verbose_name_plural = verbose_name
        ordering = ['position_index']

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=32,blank=True,null=True)
    signature = models.CharField(max_length=255,blank=True,null=True)
    user_img = models.ImageField(max_length=255,upload_to="avatar/%Y/%m/%d",
                                 default='avatar/default.png',null=True,blank=True)
    # for web qq
    friends = models.ManyToManyField('self',related_name='my_friend',blank=True)


    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name



class Comment(models.Model):
    article = models.ForeignKey(Article,verbose_name='所属文章')
    parent_comment = models.ForeignKey('self',related_name='my_children',null=True,blank=True)
    comment_choices = (
        (1,'评论'),
        (2,'点赞'),
    )
    comment_type = models.IntegerField(choices=comment_choices,default=1)
    user = models.ForeignKey(UserProfile)
    comment = models.TextField(blank=True,null=True)
    date = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.comment_type == 1 and len(self.comment) == 0:
            raise ValidationError('评论内容不能为空,sb')

    class Meta:
        verbose_name = '评论'
        verbose_name_plural = verbose_name

    def __str__(self):
        return "%s" %(self.comment)


