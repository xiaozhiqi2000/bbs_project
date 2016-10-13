from django.shortcuts import render,HttpResponse
from django.contrib.auth.decorators import login_required
from django.core.cache import cache
from webchat import models
import queue,json,time,os

GLOBAL_MSG_QUEUES = {

}

@login_required(login_url='/login/')
def dashboard(request):

    return render(request,'webchat/dashboard.html')


@login_required(login_url='/login/')
def send_msg(request):
    '''发送数据'''
    print(request.POST)
    print(request.POST.get('msg'))

    msg_data = request.POST.get('data')
    if msg_data:
        msg_data = json.loads((msg_data))
        msg_data['timestamp'] = time.time()
        if msg_data['type'] == 'single':
            if not GLOBAL_MSG_QUEUES.get(int(msg_data['to'])):
               GLOBAL_MSG_QUEUES[int(msg_data["to"])] = queue.Queue()
            GLOBAL_MSG_QUEUES[int(msg_data["to"])].put(msg_data)
        elif msg_data['type'] == 'group': #group
            group_obj = models.WebGroup.objects.get(id=msg_data['to'])
            for member in group_obj.members.select_related():
                if not GLOBAL_MSG_QUEUES.get(member.id): # 如果字典里不存在这个用户的queue就创建
                    GLOBAL_MSG_QUEUES[member.id] = queue.Queue()
                if member.id != request.user.userprofile.id:
                    GLOBAL_MSG_QUEUES[member.id].put(msg_data)


    print(GLOBAL_MSG_QUEUES)
    return HttpResponse('---msg reviced')


def get_new_msgs(request):
    '''AJAX发送数据'''
    if request.user.userprofile.id not in GLOBAL_MSG_QUEUES:
        print("no queue for [%s]" %request.user.userprofile.id)
        GLOBAL_MSG_QUEUES[request.user.userprofile.id] = queue.Queue()

    msg_count = GLOBAL_MSG_QUEUES[request.user.userprofile.id].qsize()
    q_obj = GLOBAL_MSG_QUEUES[request.user.userprofile.id]
    msg_list = []
    if msg_count > 0:
        for msg in range(msg_count):
            msg_list.append(q_obj.get())
        print("new msgs:",msg_list)
    else: # 没消息，要挂起
        pass
        print("no new msgs for ",request.user,request.user.userprofile.id)
        try:
            msg_list.append(q_obj.get(timeout= 60))
        except queue.Empty:
            print("\033[41;1mno msg for [%s][%s] ,timeout\033[0m" % (request.user.userprofile.id, request.user))

    return HttpResponse(json.dumps(msg_list))


def file_upload(request):
    '''处理Ajax发送过来的文件'''
    print(request.POST,request.FILES)
    file_obj = request.FILES.get('file')

    user_home_dir = "upload/files/%s" %request.user.userprofile.name
    if not os.path.isdir(user_home_dir):
        os.mkdir(user_home_dir)

    new_file_name = "%s/%s" %(user_home_dir,file_obj.name)
    recv_size = 0
    with open(new_file_name,'wb+') as new_file_obj:
        for chunk in file_obj.chunks():
            new_file_obj.write(chunk)

            # 进度条功能
            recv_size += len(chunk)
            # 将文件名作为key,recv_size作为值存入内存
            cache.set(file_obj.name,recv_size)

    return HttpResponse('---upload success')


def file_upload_progress(request):
    filename = request.GET.get("filename")
    progress = cache.get(filename)
    # print("file[%] uploading process [%s]" %(filename,progress))
    return HttpResponse(json.dumps({"recv_size":progress}))


def delete_cache(request):
    cache_key = request.GET.get("cache_key")
    cache.delete(cache_key)
    return HttpResponse("delete cache key [%s]" %cache_key)





