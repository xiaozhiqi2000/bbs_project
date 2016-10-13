from django.shortcuts import render,HttpResponseRedirect,redirect,HttpResponse
from bbs import models
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from bbs import comment_hander
from bbs import forms
import json
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage,InvalidPage


def global_settings(request):
    '''
    用于放置全局通用配置
    :param request:
    :return:
    '''
    category_list = models.Category.objects.filter(set_as_top_menu=True).order_by('position_index')
    return locals()


def fenye(request,page_list):
    '''django分页'''
    paginator = Paginator(page_list,5)
    total_page = paginator.num_pages
    page = int(request.GET.get('page',1))
    try:
        page_list = paginator.page(page)
    except (EmptyPage,InvalidPage,PageNotAnInteger):
        page_list = paginator.page(1)
    return page_list,total_page


def index(request):
    '''
    主页
    '''
    categroy_obj = models.Category.objects.get(position_index=1)
    article_list = models.Article.objects.filter(status='pulished').order_by('-pub_date')

    article_list,total_page = fenye(request,article_list)

    return render(request,'bbs/index.html',locals())


def category(request,id):
    '''
    导航栏，分类
    :param request:
    :param id:
    :return:
    '''
    categroy_obj = models.Category.objects.get(id=id)
    if categroy_obj.position_index == 1:
        article_list = models.Article.objects.filter(status='pulished').order_by("-pub_date")
    else:
        article_list = models.Article.objects.filter(category_id=categroy_obj.id,status='pulished').order_by("-pub_date")
    print(categroy_obj)
    article_list,total_page = fenye(request,article_list)

    return render(request,'bbs/index.html',locals())


def article_detail(request):
    '''
    文章详情页
    :param request:
    :return:
    '''
    article_id = request.GET.get('article')
    article_obj = models.Article.objects.get(id=article_id)

    return render(request,'bbs/article_detail.html',locals())


@login_required(login_url='/login/') #或者在settings中设置LOGIN_URL='/login/',view中@login_required
def new_article(request):
    '''
    发表新文章
    '''
    if request.method == 'GET':
        article_form = forms.ArticleModelForm()
        return render(request,'bbs/new_article.html',locals())

    elif request.method == 'POST':
        print(request.POST)
        article_form = forms.ArticleModelForm(request.POST,request.FILES)
        if article_form.is_valid():
            data = article_form.cleaned_data
            data['author_id'] = request.user.userprofile.id
            article_obj = models.Article(**data)
            article_obj.save()
            # article_form.save()
            return HttpResponse('发帖成功')
        else:
            return render(request,'bbs/new_article.html',locals())


def file_upload(request):
    '''
    文件上传功能
    '''
    print(request.FILES,type(request.FILES.get('filename')))
    file_obj = request.FILES.get('filename')
    with open('upload/files/%s' % file_obj.name,'wb+') as destination:
        for chunk in file_obj.chunks():
            destination.write(chunk)

    return render(request,'bbs/new_article.html',locals())


def comment(request):
    '''
    提交评论,将Ajax提交的数据写入数据库
    :param request:
    :return:
    '''
    print(request.POST)
    if request.method == 'POST':
        new_comment_obj = models.Comment(
            article_id = request.POST.get('article_id'),
            parent_comment_id = request.POST.get('parent_comment_id') or None,
            comment_type = request.POST.get('comment_type'),
            user_id = request.user.userprofile.id,
            comment = request.POST.get('comment')
        )

        new_comment_obj.save()

    return HttpResponse('ok')


def get_comments(request,article_id):
    '''
    获取Ajax评论在前端的展示
    '''
    article_obj = models.Article.objects.get(id=article_id)
    comment_tree = comment_hander.build_tree(article_obj.comment_set.select_related())
    tree_html = comment_hander.render_comment_tree(comment_tree)

    return HttpResponse(tree_html)


def get_latest_article_count(request):
    latest_article_id = request.GET.get("latest_id")
    # print(latest_article_id)
    if latest_article_id:
        new_article_count = models.Article.objects.filter(id__gt = latest_article_id).count()
        # print("new_article_count",new_article_count)
    else:
        new_article_count = 0
    return HttpResponse(json.dumps({'new_article_count':new_article_count}))


def acc_login(request):
    '''
    登录，使用django自带验证和登录，authenticate,login
    :param request:
    :return:
    '''
    ret = {'message': ''}

    if request.method == 'POST':
        user = authenticate(username=request.POST.get('txtUserName'),
                            password=request.POST.get('txtPassword'))

        if user is not None:
            user.backend = 'django.contrib.auth.backends.ModelBackend' # 指定默认的登录验证方式
            login(request,user)
            return HttpResponseRedirect(request.GET.get('next') or '/')
        else:
            ret['message'] = '用户名或密码错误'
            return render(request,'login.html',{'data':ret})

    return render(request,'login.html')


def acc_register(request):
    '''
    注册
    :param request:
    :return:
    '''
    if request.method == 'POST':
        ret = {'status': False, 'message': ''}
        username = request.POST.get('user', None)
        pwd = request.POST.get('pwd', None)
        print(username, pwd)
        is_empty = all([username, pwd])

        if is_empty:
            count = models.UserProfile.objects.filter(user=username).count()
            if count == 1:
                ret['message'] = '用户名已经存在'
                return HttpResponse(json.dumps(ret))
            elif count == 0:
                models.UserProfile.objects.create(user=username, password=pwd)
                ret['status'] = True
                return HttpResponse(json.dumps(ret))
        else:
            ret['message'] = '用户名或密码不能为空'
            return HttpResponse(json.dumps(ret))

    return render(request, 'register.html')


def acc_logout(request):
    '''
    注销，使用django自带logout
    :param request:
    :return:
    '''
    print(request.META['HTTP_REFERER'])
    try:
        logout(request)
    except Exception as e:
        print(e)
        logger.error(e)
    # return redirect(request.META['HTTP_REFERER'])
    return HttpResponseRedirect('/')
