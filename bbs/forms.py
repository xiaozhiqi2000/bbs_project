#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.forms import ModelForm
from bbs import models

class ArticleModelForm(ModelForm):

    class Meta:
        model = models.Article
        exclude = ('author','pub_date','priority',)

    def __init__(self,*args,**kwargs):
        '''
        最好不要这么做,会有BUG不稳定,需要刷新才能显示样式,最好在前端js中添加样式
        '''
        super(ArticleModelForm,self).__init__(*args,**kwargs)
        # 给单个字段加样式
        # self.fields['customer_note'].widget.attrs['class'] = 'form-control'

        # 给全部字段加样式
        for field_name in self.base_fields:
            field = self.base_fields[field_name]

            field.widget.attrs.update({'class':'form-control'})


