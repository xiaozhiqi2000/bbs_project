from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from webchat import views

urlpatterns = [
    url(r'^$',views.dashboard,name='chat_dashboard'),
    url(r'^msg_send/$',views.send_msg,name='send_msg'),
    url(r'^get_new_msgs/$',views.get_new_msgs,name='get_new_msgs'),
    url(r'^file_upload/$',views.file_upload,name='file_upload'),
    url(r'^file_upload_progress/$',views.file_upload_progress,name='file_upload_progress'),
    url(r'^delete_cache/$',views.delete_cache,name='delete_cache_key'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
