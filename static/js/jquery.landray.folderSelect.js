//输出后缀参数名称ParamName 
//跳转地址TargetUrl
//要写入选择分类ID的隐藏控件hiddenID
//是否跳转 true false
//编辑分类传入的分类id
function folderSelectToLink(ParamName, TargetUrl, hiddenID, isJump, FolderGuid) {
    if (window.location.href.toLowerCase().indexOf("/home.aspx?") != -1) {
        isJump = "true";
    }
    var moduleId = '';
    if (TargetUrl != "") {
        var targetUrl = TargetUrl.toLowerCase();
        if (targetUrl.indexOf('moduleid=') != -1) {
            moduleId = targetUrl.substring(targetUrl.indexOf('moduleid=') + 9, targetUrl.indexOf('moduleid=') + 12);
        }
    }
    var canel = _Resource("Landray.EIS.Common").GetResource("Comm_Cancel");
    var comm_Alert0079 = _Resource("Landray.EIS.Common").GetResource("Comm_Alert0079");
    DGFolder = $.dialog({
        id: 'DGFolder1',
        title: _Resource("Landray.EIS.Common").GetResource("Comm_Type"),
        width: '695px',
        height: '381px',
        lock: true,
        min: false,
        max: false,
        content: 'url:/Global/Pages/CommonFolderSelect.aspx?moduleid=' + (moduleId != "" ? moduleId : EISCom_Parameter.ModuleId) + '&ParamName=' + ParamName + '&TargetUrl=' + encodeURIComponent(TargetUrl) + '&FolderGuid=' + FolderGuid,

        button: [{
            name: _Resource("Landray.EIS.Common").GetResource("Common_Confirm"),
            callback: function () {
                var isSure = DGFolder.content.document.getElementById('hfIsSure').value;
                if (isSure == "true") {
                    var url = DGFolder.content.document.getElementById('hfUrl').value;
                    if (hiddenID != undefined)
                        $("#" + hiddenID).val(DGFolder.content.document.getElementById('hfFolderID').value);
                    DGFolder.close();
                    if (isJump == "true")
                        window.open(url);
                    else {
                        if (TargetUrl != "")
                            window.location.href = url;
                        else {
                            if (window.location.href.indexOf(ParamName) == -1)
                                window.location.href = window.location.href + url;
                            else {
                                window.location.href = window.location.href.substring(0, window.location.href.indexOf("&" + ParamName)) + url;
                            }
                        }
                    }
                } else {
                    $.dialog({
                        title: _Resource("Landray.EIS.Common").GetResource("Comm_Prompt"),
                        min: false,
                        max: false,
                        content: _Resource("Landray.EIS.Common").GetResource("Comm_Msg0008")
                    });
                }
                return false;
            },
            focus: true
        },
                {
                    name: canel,
                    callback: function () {

                        if (confirm(comm_Alert0079)) {

                            var url = window.location.href.toLowerCase();
                            if (url.indexOf("home.aspx?") != -1 || url.indexOf("/default.aspx") != -1) {
                                try {
                                    var api = frameElement.api, W = api.opener, cDG;
                                    api.close();
                                } catch (e) {
                                }

                            } else {
                                window.opener = null;
                                window.open('', '_self');
                                window.close();
                            }
                        }
                        else {
                            return false; 
                        }
                    }
                }
            ]


    });
}