// JavaScript Document

/**
** 代码制作人: 马泽棉
** 制作时间：2014-04-11
** 文件内容描述：
** 修改日期：无
** 修改内容：无
**********************************************/
document.write("<script type='text/javascript' language='javascript' src='/scripts/jquery.js'><\/script>");
document.write("<script type='text/javascript' language='javascript' src='/scripts/lhgdialog/lhgdialog.js?skin=default'><\/script>");
document.write("<script type='text/javascript' language='javascript' src='/Scripts/DatePicker/WdatePicker.js'><\/script>");
document.write("<script type='text/javascript' language='javascript' src='/scripts/jquery.landray.dialog.js?v=15'><\/script>");
document.write("<script type='text/javascript' language='javascript' src='/JSResource/JSResource.aspx?resourceFile=Landray.EIS.Common' ></script>");
document.write("<script type='text/javascript' language='javascript' src='/scripts/jquery.landray.folderSelect.js'><\/script>");

/*** 头部 下拉菜单 **************************************************************************************************************************************/
function LaodHeaderDropBox() {

    //一二级页面头部导航 多选下拉菜单
    $(".LEIS_header_nav .optionBar").hover(function () {
        $(this).find(".option").addClass("on").end().find("ul.LEIS_header_dropNav").stop(false, true).slideDown(200);
    }, function () {
        $(this).find(".option").removeClass("on").end().find("ul.LEIS_header_dropNav").stop(false, true).slideUp(100);
    });


    //一二级页面头部个人信息 下拉菜单
    $(".LEIS_header_perInfo .personBar").hover(function () {
        $(this).find(".person").addClass("on").end().find("ul.LEIS_header_dropPerInfo").stop(false, true).slideDown(200);
    }, function () {
        $(this).find(".person").removeClass("on").end().find("ul.LEIS_header_dropPerInfo").stop(false, true).slideUp(100);
    });

    $(".LEIS_header_dropPerInfo li").hover(function () {
        $(this).children("a").addClass("on").next(".LEIS_header_subDropPerInfo").stop(false, true).show(300);
    }, function () {
        $(this).children("a").removeClass("on").next(".LEIS_header_subDropPerInfo").stop(false, true).hide(100);
    });

    $(".LEIS_header_dropPerInfo li").hover(function () {
        $(this).children("a").addClass("on").next("ul").stop(false, true).show(300);
    }, function () {
        $(this).children("a").removeClass("on").next("ul").stop(false, true).hide(100);
    });


    //一二级页面头部收藏 下拉菜单
    $(".LEIS_header_perInfo .favBar").mousemove(function () {
        $(this).find(".fav").addClass("on").end()
            .find(".LEIS_header_dropPerInfo").stop(true).slideDown(300);
    });
    $(".LEIS_header_perInfo .favBar").mouseleave(function () {
        $(this).find(".LEIS_header_dropPerInfo").stop(true).slideUp(200).end()
            .find(".fav").removeClass("on");
    });


    $(".LEIS_header_perInfo .favBar").mousemove(function () {
        $(this).find(".fav").addClass("on").end()
            .find(".LEIS_memu-root").stop(true).slideDown(300);
    });
    $(".LEIS_header_perInfo .favBar").mouseleave(function () {
        $(this).find(".LEIS_memu-root").stop(true).slideUp(200).end()
            .find(".fav").removeClass("on");
    });
    $(".LEIS_memu-root li").mousemove(function () {
        $(this).children("a").addClass("on").next("ul").stop(true).show(200);
    });
    $(".LEIS_memu-root li").mouseleave(function () {
        $(this).children("a").removeClass("on").next("ul").stop(true).hide(200);
    });


    //一二级页面头部应用 下拉菜单
    $(".LEIS_header_applicationBar").mousemove(function () {
        $(this).find("p").addClass("on").end().find(".LEIS_header_app_mdrop").stop(true).show(300);
    });
    $(".LEIS_header_applicationBar").mouseleave(function () {
        $(this).find("p").removeClass("on").end().find(".LEIS_header_app_mdrop").stop(true).hide(100);
    });
    $(".LEIS_header_app_mdrop li").mousemove(function () {
        $(this).children("a").addClass("on").next(".LEIS_header_app_dropSubBox").stop(true).show(300);
    });
    $(".LEIS_header_app_mdrop li").mouseleave(function () {
        $(this).children("a").removeClass("on").next(".LEIS_header_app_dropSubBox").stop(true).hide(100);
    });

    //搜索门户 头部导航滚动定位
    $(window).scroll(function () {
        if ($(window).scrollTop() > 125) {
            $(".LEIS_bg_headerWrapper .LEIS_bg_header_navbar").addClass("fixedNavbar");
        } else {
            $(".LEIS_bg_headerWrapper .LEIS_bg_header_navbar").removeClass("fixedNavbar");
        }

    });


};
/********************************************************************************************************************************************************/


/*** 三页面头部按钮 下拉菜单 *********************************************************************************************************************************/
function LoadThirdHeaderBtnDrop() {
    $(".LEIS_third_header_btnGroup .optionItem").mousemove(function () {
        $(this).find(".btn_option").addClass("on").end()
            .find(".LEIS_third_header_dropOpt").css("display","block");
    });
    $(".LEIS_third_header_btnGroup .optionItem").mouseleave(function () {
        $(this).find(".LEIS_third_header_dropOpt").css("display", "none").end()
            .find(".btn_option").removeClass("on");
    });

};



/********************************************************************************************************************************************************/


/*** 动态信息菜单相关的效果 *********************************************************************************************************************************/

function LaodTrendsSlide() {
    //点击图标 内容的收展
    $(".LEIS_tab_trends_content:not(:first)").hide();
    $(".LEIS_tab_trends_head li:not(.btnIcon)").bind("click", function () {
        $(this).parent().find(".btnIcon").addClass("on");
        $(this).parent().next(".LEIS_tab_trends_content").stop(true).slideDown(500);
    });
    $(".LEIS_tab_trends_head .btnIcon").bind("click", function () {
        $(this).toggleClass("on").parent().next(".LEIS_tab_trends_content").slideToggle(500);
    });

    //信息反馈 选项卡 内容的收展与切换
    $(".LEIS_tab_feedback_head li").bind("click", function () {
        $(this).parent().next(".LEIS_tab_feedback_content").stop(true).slideDown(400);
    });
};

/********************************************************************************************************************************************************/


/*** 头部 文本框焦点 *********************************************************************************************************************************/
function inputFocus(className) {
    var jClassName = "LEIS_header_searchBar";
    if (className != undefined && className != null && className != '')
        jClassName = className;
    $("." + jClassName + " input[type=text]").focus(function () {
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });
};
/********************************************************************************************************************************************************/
/*** 流程查询 文本框焦点  可作为公用,传入类名即可*********************************************************************************************************************************/
function CommInputFocus(className) {
    $("." + className + " input[type=text]").focus(function () {
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });
};
/********************************************************************************************************************************************************/


/*** 返回顶部 *******************************************************************************************************************************************/
function ScrollToTop() {
    var ScrollToTop = ScrollToTop || {
        setup: function () {
            var a = $(window).height() / 2;
            $(window).scroll(function () {
                (window.innerWidth ? window.pageYOffset : document.documentElement.scrollTop) >= a ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
            });
            $("#ScrollToTop").click(function () {
                $("html, body").animate({ scrollTop: "0px" }, 300);
                return false
            })
        }
    };
    ScrollToTop.setup();


    //点击选项弹出二级菜单
    $(".LEIS_returnTopBar>li .LEIS_btn_drop").bind("click", function () {
        $(this).next("ul").toggle().parent().toggleClass("on");
    })


};

/********************************************************************************************************************************************************/


/*** 数据视图 头部各按钮JS效果 **************************************************************************************************************************/
function loadDataViewHeader() {
    //排序按钮 切换状态
    $(".LEIS_dView_sortingBar li").bind("click", function () {
        $(this).addClass("on").siblings().removeClass("on").find("span").removeClass("up");
        if ($(this).hasClass("on"))
            $(this).children("span").toggleClass("up");
    });

    //操作按钮 多选下拉菜单
    $(".LEIS_dView_operatBtnBar .moreBtnBar").mousemove(function () {
        $(this).find(".morebtn").addClass("on").end()
            .find(".LEIS_dView_dropOperatBtn").stop(true).slideDown(500);
    });
    $(".LEIS_dView_operatBtnBar .moreBtnBar").mouseleave(function () {
        $(this).find(".LEIS_dView_dropOperatBtn").stop(true).slideUp(200).end()
            .find(".morebtn").removeClass("on");
    });

    $(".LEIS_sidePanel_content_frame ul li a").click(function () {
        $(this).addClass("on").parent().siblings().find("a").removeClass("on");
    });

};

function loadMutiDimensionListButton() {
    $(".LEIS_dView_operatBtnBar .LEIS_dView_dropOperatBtn").html('');
    $(".LEIS_dView_operatBtnBar .moreBtnBar").hide();
    var len = 2;
    for (var i = 0; i < $("#div_button").children("li").length - 1; i++) {
        if ($("#div_button").children("li")[i].style.display == "block") {
            if (i > len) {
                $(".LEIS_dView_operatBtnBar .moreBtnBar").show();
                $(".LEIS_dView_operatBtnBar .LEIS_dView_dropOperatBtn").append($("#div_button").children("li")[i].innerHTML);
                $("#div_button").children("li")[i].style.display = "none";
            }
        }
        else {
            len = len + 1;
        }
    }

}

/********************************************************************************************************************************************************/



/*** 三级页面 内容区域 ************************************************************************************************************************/
function loadThirdPageArea() {
    //三级页面可折叠面板 收拉效果
    //$(".LEIS_accordionpanel_content_frame ul.LEIS_common_list6").hide();
    $(".LEIS_accordionpanel_content_frame h3").click(function () {
        $(this).find("i").toggleClass("down").end().next("ul.LEIS_common_list6").slideToggle(500);
        //$(this).parent().siblings().find("ul.LEIS_common_list6").stop(true).slideUp(500).end()
        //    .parent().siblings().find("i").removeClass("down");
    });

    //三级页面 阅读页面 左侧收展效果
    $("#btn_read_shrink").click(function () {
        if ($(this).hasClass("btn_shrink")) {
            $(this).attr("class", "btn_shrink_on").parent(".LEIS_read_content").stop(true).animate({ width: "725px" }, 800);
            $(this).parents(".LEIS_bodyL").next(".LEIS_mbodyR").fadeIn(600);
        } else if ($(this).hasClass("btn_shrink_on")) {
            $(this).attr("class", "btn_shrink").parent(".LEIS_read_content").stop(true).animate({ width: "982px" }, 800);
            $(this).parents(".LEIS_bodyL").next(".LEIS_mbodyR").fadeOut(600);
        };
    });
    //三级页面 知识地图阅读页面 左侧收展效果
    $("#btn_read_shrink_map").click(function () {
        if ($(this).hasClass("btn_shrink")) {
            $(this).attr("class", "btn_shrink_on").parent(".LEIS_read_content").stop(true).animate({ width: "725px" }, 800);
            $(this).parents(".LEIS_bodyL").next(".LEIS_mbodyR").fadeIn(600);
        } else if ($(this).hasClass("btn_shrink_on")) {
            $(this).attr("class", "btn_shrink").parent(".LEIS_read_content").stop(true).animate({ width: "981px" }, 800);
            $(this).parents(".LEIS_bodyL").next(".LEIS_mbodyR").fadeOut(600);
        };
    });
};

function loadThirdPageTabNav() {
    //三级页面导航选项卡 选中状态切换及滚动跳转效果
    $(".LEIS_tabNav ul li span").bind("click", function () {
        $(this).addClass("on").parent().siblings().find("span").removeClass("on");
    });
    $(".LEIS_tabNav ul li a").bind("click", function () {
        $(this).addClass("on").parent().siblings().find("a").removeClass("on");
    });
}
/********************************************************************************************************************************************************/


/*** 知识门户 专家推荐 页面 ***************************************************************************************************************/
function loadExpertAndKnow() {
    //知识门户 专家推荐 专家名鼠标经过弹出
    $(".LEIS_expertsRecommend .imgbox .titlebg").css("opacity", 0.3); //背景透明度
    $(".LEIS_expertsRecommend .imgbox").hover(function () {
        $(this).find("div").stop(true).slideDown(300);
    }, function () {
        $(this).find("div").stop(true).slideUp(300);
    });

    //知识门户 左侧导航隔行变色
    //$(".LEIS_libraryNav>li:nth-child(odd)>a").css("background-color", "#f8f8f8");

    //鼠标经过时 二级菜单展开
    $(".LEIS_libraryNav").hover(function () {
        $(this).css("background-color", "#ececec");
    }, function () {
        $(this).css("background", "none");
    });
    $(".LEIS_libraryNav li.Mitem").hover(function () {
        $(this).children("a").addClass("on").next(".LEIS_libraryNav_dropSubBox").stop(false, true).show(300);
    }, function () {
        $(this).children("a").removeClass("on").next(".LEIS_libraryNav_dropSubBox").stop(false, true).hide(100);
    });

    //常用查询列表 收拉效果
    $(".LEIS_sidePanel_content_frame h3").click(function () {
        $(this).next("ul.LEIS_common_list4").stop(true).slideToggle(500);
    });

};
/********************************************************************************************************************************************************/


/*** KK聊天窗 收拉效果 ***************************************************************************************************************/
//function sliderKKChat() {
//    $(".LEIS_KKChatWrapper .LEIS_KKChat_btnBar span").bind("click",function () {
//        if ($(this).attr("class") == "btn_KKSlide") {
//            $(this).attr({ "class": "btn_KKSlide_on", title: "展开" })
//                .parent().siblings().stop().slideUp(500);
//        }
//        if ($(this).attr("class") == "btn_KKSlide_on") {
//            $(this).attr({ "class": "btn_KKSlide", title: "收起" })
//                .parent().siblings(".LEIS_KKChatBox").stop().slidedown(500);
//        }


//        $(this).toggleClass("on").parent().siblings().stop(true).slideToggle(500);
//    });
//};
/********************************************************************************************************************************************************/


function loadNaviCondition() {
    /*** 分类导航带下拉菜单 *********************************************************************************************************************************/

    //鼠标经过时 一级菜单下拉
    $(".LEIS_classifyNavMenu").hover(function () {
        $(this).find(".head").addClass("on").end().find("ul.LEIS_clasNav_dropMlist").stop(false, true).slideDown(200);
    }, function () {
        $(this).find(".head").removeClass("on").end().find("ul.LEIS_clasNav_dropMlist").stop(false, true).slideUp(100);
    });

    //鼠标经过时 二级菜单展开
    $(".LEIS_classifyNavMenu li.CN_dropMItem").mousemove(function () {
        $(this).find(".CN_Mlink").addClass("on").end()
            .find(".LEIS_clasNav_dropSubBox").stop(false, true).show(200);
    });
    $(".LEIS_classifyNavMenu li.CN_dropMItem").mouseleave(function () {
        $(this).find(".CN_Mlink").removeClass("on").end()
            .find(".LEIS_clasNav_dropSubBox").stop(false, true).hide(100);
    });

    /********************************************************************************************************************************************************/


    /*** 分类导航与条件筛选菜单 下拉按钮 条件筛选菜单的收展效果 *********************************************************************************************/

    //当前分类与已选条件 列表收展
    $("#cdtSelSlide").click(function () {
        if ($(this).attr("class") == "LEIS_btn_cdtSelSlideUp") {
            $(this).attr({ "class": "LEIS_btn_cdtSelSlideDown", title: _Resource("Landray.EIS.Common").GetResource("Common_Retract") }); //收起
            $(".LEIS_criterionHeader").stop().animate({ height: "100px" }, 500);
        } else if ($(this).attr("class") == "LEIS_btn_cdtSelSlideDown") {
            $(this).attr({ "class": "LEIS_btn_cdtSelSlideUp", title: _Resource("Landray.EIS.Common").GetResource("Comm_Expand") }); //展开
            $(".LEIS_criterionHeader").stop().animate({ height: "33px" }, 300);
        };
    });

    //条件筛选菜单 收展
    $(".LEIS_criterion_btnBox .btn_linkL").bind("click", function () {
        if ($(this).attr("title") == _Resource("Landray.EIS.Common").GetResource("Common_Retract")) {//收起
            $(this).attr("title", _Resource("Landray.EIS.Common").GetResource("Comm_Expand")); //展开
            $("#idselAll").hide();
        } else if ($(this).attr("title") == _Resource("Landray.EIS.Common").GetResource("Comm_Expand")) {//展开
            $(this).attr("title", _Resource("Landray.EIS.Common").GetResource("Common_Retract")); //收起
            $("#idselAll").show();
        };
        $(this).toggleClass("on");
        $(".LEIS_cdtFilterBox").slideToggle(400);
    });

    //条件筛选菜单 收展
    $(".LEIS_filterMoreOpt li").mousemove(function () {
        $(this).find(".moreOptHead").addClass("on").end()
                .find(".LEIS_f_dropMoreOpt").stop(true).slideDown(300);
    });
    $(".LEIS_filterMoreOpt li").mouseleave(function () {
        $(this).find(".moreOptHead").removeClass("on").end()
                .find(".LEIS_f_dropMoreOpt").stop(true).slideUp(200);
    });

    /********************************************************************************************************************************************************/


    /*** 条件筛选 部门及相关 下拉内容 *********************************************************************************************************************************/

    //鼠标经过时 一级菜单下拉
    $(".LEIS_cdtFilter_layout").mousemove(function () {
        $(this).children(".head").addClass("on").end()
                .children(".LEIS_cdtF_layout_float").stop(true).slideDown(300);
    });
    $(".LEIS_cdtFilter_layout").mouseleave(function () {
        $(this).children(".LEIS_cdtF_layout_float").stop(true).slideUp(300).end()
                .children(".head").removeClass("on");
    });


    /********************************************************************************************************************************************************/

};


/*** 知识门户 广告图片翻转 ***
*********************************************************************************************************************************************************/
function showAdvert() {
    var sWidth = $("#advert").width();    //获取显示面积，单个焦点图宽度
    var len = $("#advert ul li").length; //获取焦点图个数;
    var tar = $("#advert ul");
    var index = 0;
    var autoShow;
    var showtime = 3000; //自动播放的间隔，单位：毫秒

    //以下代码添加数字按钮,按钮背影条
    var btn = "<div class='btnBg'></div><div class='btnBar'>";
    for (var i = 0; i < len; i++) {
        btn += "<span>" + (i + 1) + "</span>";
    }
    btn += "</div>";
    $("#advert").append(btn);
    $("#advert .btnBg").css("opacity", 0.4);

    //以下代码为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#advert .btnBar span").mouseenter(function () {
        index = $("#advert .btnBar span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");

    //向左滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    tar.css("width", sWidth * (len));

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $("#advert").hover(function () {
        clearInterval(autoShow);
    }, function () {
        autoShow = setInterval(function () {
            showPics(index);
            index++;
            if (index == len) { index = 0 }
        }, showtime)
    }).trigger("mouseleave");

    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) {
        var nowLeft = -index * sWidth;  //根据index值计算ul元素的left值
        tar.stop(true, false).animate({ "left": nowLeft }, 300);  //通过animate()调整ul元素滚动到计算出的position
        $("#advert .btnBar span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    };
};

function showAdvert(id) {
    var sWidth = $("#" + id).width();    //获取显示面积，单个焦点图宽度
    var len = $("#" + id + " ul li").length; //获取焦点图个数;
    var tar = $("#" + id + " ul");
    var index = 0;
    var autoShow;
    var showtime = 3000; //自动播放的间隔，单位：毫秒

    //以下代码添加数字按钮,按钮背影条
    var btn = "<div class='btnBg'></div><div class='btnBar'>";
    for (var i = 0; i < len; i++) {
        btn += "<span>" + (i + 1) + "</span>";
    }
    btn += "</div>";
    $("#" + id).append(btn);
    $("#" + id + " .btnBg").css("opacity", 0.4);

    //以下代码为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#" + id + " .btnBar span").mouseenter(function () {
        index = $("#" + id + " .btnBar span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");

    //向左滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $("#" + id + " ul li").css("width", sWidth);
    tar.css("width", sWidth * (len));

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $("#" + id).hover(function () {
        clearInterval(autoShow);
    }, function () {
        autoShow = setInterval(function () {
            showPics(index);
            index++;
            if (index == len) { index = 0 }
        }, showtime)
    }).trigger("mouseleave");

    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) {
        var nowLeft = -index * sWidth;  //根据index值计算ul元素的left值
        tar.stop(true, false).animate({ "left": nowLeft }, 300);  //通过animate()调整ul元素滚动到计算出的position
        $("#" + id + " .btnBar span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    };
};

/********************************************************************************************************************************************************/

//function showPhotoView() {
//    $('#photoview').kxbdSuperMarquee({
//        distance: 122,
//        time: 3,
//        btnGo: { left: '#pre', right: '#next' },
//        direction: 'left'
//    });
//}
/********************************************************************************************************************************************************/

/*** iframe高度自适应 ***
*********************************************************************************************************************************************************/
function iFrameHeight(id, name) {
    var ifm = document.getElementById(id);
    var subWeb = ifm.document ? ifm.document : ifm.contentDocument;
    ifm.height = 500;
    if (ifm != null && subWeb != null) {
        ifm.height = subWeb.body.scrollHeight + 30;
    }
}
//iframe自适应高度  add by yangss 2014年12月25日 12:36:41  ---服务门户常用联系人
function reinitIframe(id, name) {
    var iframe = document.getElementById(id);
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height + 30;
    } catch (ex) { }
}
/********************************************************************************************************************************************************/



/*** 选项卡切换 ***
*********************************************************************************************************************************************************/
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        if (menu != null)
            menu.className = i == cursel ? "on" : "";
        if (con != null)
            con.style.display = i == cursel ? "block" : "none";
    }
};

/********************************************************************************************************************************************************/

//组织架构联系人选择
function ConnectorSelect(url, txtID, hdID) {
    var dialog = new Object();
    dialog = $.dialog;
    if (frameElement != undefined) {
        var api = frameElement.api, A, DG;
        if (api != undefined) {A = api.opener;}
        if (A != undefined) {dialog = A.$.dialog;}
    }
    dialog({
        title: _Resource("Landray.EIS.Common").GetResource("Common_SelectPeople"), //选择联系人
        lock: true,
        min: false,
        max: false,
        fixed: true,
        width: 800,
        height: 440,
        top: '1%',
        content: 'url:' + url,
        init: function () {
            if (this.content.document.getElementById("seldata") != null) {
                this.content.$("#seldata").val(document.getElementById(hdID).value);
                this.content.$("#parent_name").val(txtID);
                this.content.$("#parent_id").val(hdID);
                this.content.$("#Connector_Tittle").hide();
                this.content.this_defaultsel();
                this.content.jQuery.fn.EMPlist(1);
                this.content.this_datasave();
            }
        },
        close: function () {
            var url = location.href.toLowerCase();
            if ((url.indexOf("knowledge_add.aspx") != -1 || url.indexOf("knowledge_edit.aspx") != -1) && hdID == "%u8bfb%u53d6") {
                if (confirm("请问是否复制权限给下面权限级别？")) {
                    i = txtID.replace("Rights", "");
                    i++;
                    while (document.getElementById("Rights" + i) && i < 5) {
                        var obj = $("#Rights" + i);
                        obj.val($("#" + txtID).val());
                        obj.parent().children("input:hidden").each(function () { $(this).val(document.getElementById(hdID).value); });
                        i++;
                    }
                }
            }
        }
    });
}

function SetMechanism(obj, url, type, val) {
    var str;
    if (val == 1) {
        switch (type) {
            case "Mechanism_SetTop": str = _Resource("Landray.EIS.Common").GetResource("Comm_CancelSetTop"); break; //"置顶"
            case "Mechanism_SetSuggest": str = _Resource("Landray.EIS.Common").GetResource("Comm_CancelRecommand"); break; //"推荐"
            case "Mechanism_SetEssence": str = _Resource("Landray.EIS.Common").GetResource("Comm_CancelEssence"); break; //精华"
        }
        obj.innerHTML = str; obj.onclick = function () { SetMechanism(this, url, type, 0); };
    }
    else {
        switch (type) {
            case "Mechanism_SetTop": str = _Resource("Landray.EIS.Common").GetResource("Comm_SetAsTop"); break; //"置顶"
            case "Mechanism_SetSuggest": str = _Resource("Landray.EIS.Common").GetResource("Comm_Recommand"); break; //"推荐"
            case "Mechanism_SetEssence": str = _Resource("Landray.EIS.Common").GetResource("Comm_Essence"); break; //精华"
        }
        obj.innerHTML = str; obj.onclick = function () { SetMechanism(this, url, type, 1); };
    }
    $.ajax({ url: '/Services/Mechanism.aspx?' + url + '&action=' + type + '&val=' + val + "&vnow=" + new Date().getTime(), async: true });
}

//收藏添加
function CollectAdd(url,obj) {
    $.dialog({
        title: _Resource("Landray.KMS.PersonalCenter").GetResource("PC_AddCollect"), //添加到收藏
        lock: true,
        min: false,
        max: false,
        width: 451,
        height: 200,
        content: 'url:' + url,
        button: [{
            name: _Resource("Landray.EIS.Common").GetResource("Common_Confirm"), //确定
            callback: function () {
                var rtn = this.content.BtnSubmit();
                if (rtn == "true") {
                    if (obj != null) {
                        var count = $(obj).children("span").text(); //加1
                        count = parseInt(count) + 1;
                        $(obj).children("span").text(count);
                    }
                    else {
                        $.dialog({
                            title: _Resource("Landray.EIS.Common").GetResource("Comm_Prompt"), //提示
                            min: false,
                            max: false,
                            content: _Resource("Landray.KMS.PersonalCenter").GetResource("PC_CollectSuccess") + '！'//收藏成功
                        });
                    }

                }
                else {
                    $.dialog({
                        title: _Resource("Landray.EIS.Common").GetResource("Comm_Prompt"), //提示
                        min: false,
                        max: false,
                        content: rtn
                    });
                    return false;
                }
            },
            focus: true
        },
            {
                name: _Resource("Landray.EIS.Common").GetResource("Comm_Close")//关闭
            }
        ]
    });
}


function TagSelect(url, tagstr, txtID) {
    $.dialog({
        title: _Resource("Landray.EIS.Common").GetResource("Comm_Sel") + _Resource("Landray.EIS.Common").GetResource("Comm_Tag"), //选择标签
        lock: true,
        min: false,
        max: false,
        fixed: true,
        width: 580,
        height: 410,
        content: 'url:' + url,
        init: function () {
            if (this.content.document.getElementById("seldata") != null) {
                this.content.document.getElementById("seldata").value = tagstr;
                this.content.document.getElementById("parent_name").value = txtID;
                this.content.bindParentTag();
                this.content.jQuery.fn.LoadPublicTagList(1);
                this.content.jQuery.fn.LoadPrivateTagList(1);
                this.content.btnreturn();
            }
        }
    });
}

/********************************************************************************************************************************************************/

function Attributesset_data(id, val) {
    $("#treename" + id).val(val);
    $('#tree' + id).hide();
}

/**正文复制**/
function SetBanCopy() {
    $(document).bind("contextmenu", function () { return false; });
    $(document).bind("selectstart", function () { return false; });
    $(document).keydown(function () { return key(arguments[0]) });
}

function key(e) {
    var keynum;
    if (window.event) {
        keynum = e.keyCode; // IE
    } else if (e.which) {
        keynum = e.which; // Netscape/Firefox/Opera
    }
    if (keynum == 67) {
        alert("禁止复制内容!");
        return false;
    }
}

//全选、反选
function setcheckalllist(obj) {
    if (obj.checked) {
        $("input:checkbox[name='checkbox']").each(function () { $(this).prop("checked", true); });
    }
    else {
        $("input:checkbox[name='checkbox']").each(function () { $(this).prop("checked", false); });
    }
}


function checkgroup() {
    var all = $("input:checkbox[name='checkbox']");
    var num = 0;
    for (var i = 0; i < all.length; i++) {
        if (all[i].checked == true) {
            num++;
        }
    }
    if (num == all.length) {
        document.getElementById("checkall").checked = true;
    }
    else {
        document.getElementById("checkall").checked = false;
    }
}

//赞：obj::type,listid,itemid
//收藏：obj:type,listid,itemid,title,url
//评论：obj:type,listid,itemid,userid,url,title
//转发：obj:type,listid,itemid,url
function savemechanism(obj) {
    try {
        var itemid = obj.getAttribute("itemid");
        var beginindex = itemid.indexOf('{');
        if (beginindex >= 0) {
            itemid = itemid.substring(beginindex + 1, itemid.length - 1);
        }
        switch (obj.getAttribute("type")) {
            case "praise": //赞
            case "step": //踩
                var has = _Resource("Landray.EIS.Common").GetResource("Comm_Has2");
                if ($(obj).text().indexOf(has) != -1) {
                    $(obj).removeAttr("onclick");
                    return;
                }
                $.ajax({
                    type: "POST",
                    url: "/Services/Mechanism.aspx",
                    data: "action=Mechanism_SetLibraryMechanism&Type=" + obj.getAttribute("m_type") + "&ModuleID=" + EISCom_Parameter.ModuleId + "&ListGuid=" + obj.getAttribute("listid") + "&ItemGuid=" + itemid + "&vnow=" + new Date().getTime(),
                    success: function (msg) {
                        if (obj != null) {
                            var count = $(obj).children("span").text(); //加1
                            if (count == "") count = 0;
                            count = parseInt(count) + 1;
                            $(obj).children("span").text(count);
                            var text = has + $(obj).text();
                            $(obj).text(text);
                            $(obj).removeAttr("onclick");
                        }
                    },
                    error: function (msg) { }
                });
                break;
            case "collect": //收藏
                var _url = "/PersonalCenter/PersonalCollect/AddCollect.aspx?title=" + escape(obj.getAttribute("titlename")) + "&|&mc_url=" + escape(obj.getAttribute("url")) + "&UniqueId=" + itemid + "&ListId=" + obj.getAttribute("listid");
                CollectAdd(_url, obj); //传obj操作：收藏+1
                break;
            case "comment": //评论
                var _url = "/Global/Pages/CommentAdd.aspx?ListGuid=" + obj.getAttribute("listid") + "&ItemGuid=" + itemid + "&ModuleID=" + EISCom_Parameter.ModuleId + "&Doc_user=" + obj.getAttribute("userid") + "&Url=" + escape(obj.getAttribute("url")) + "&TitleName=" + escape(obj.getAttribute("titlename"));
                $.dialog({
                    title: _Resource("Landray.EIS.Common").GetResource("Comm_Commennt"),
                    width: 575,
                    height: 200,
                    lock: true,
                    min: false,
                    max: false,
                    content: 'url:' + _url,
                    close: function () {
                        if (this.content.document.getElementById("hd_is_save_ok") != null && this.content.document.getElementById("hd_is_save_ok").value != "") {
                            if (obj != null) {
                                var count = $(obj).children("span").text(); //加1
                                count = parseInt(count) + 1;
                                $(obj).children("span").text(count);
                            }
                        }
                    }
                });
                break;
            case "suggest": //转发(推荐)
                var _url = "/Global/Pages/SuggestsAdd.aspx?ListGuid=" + obj.getAttribute("listid") + "&ItemGuid=" + itemid + "&ModuleID=" + EISCom_Parameter.ModuleId + "&Url=" + escape(obj.getAttribute("url")) + "&FileTitle=" + escape(obj.getAttribute("titlename"));
                $.dialog({
                    id: "dialog1",
                    title: _Resource("Landray.EIS.Common").GetResource("Comm_Recommanded"),
                    width: 570,
                    height: 240,
                    lock: true,
                    min: false,
                    max: false,
                    content: 'url:' + _url,
                    close: function () {
                        if (this.content.document.getElementById("hd_is_save_ok") != null && this.content.document.getElementById("hd_is_save_ok").value != "") {
                            if (obj != null) {
                                var count = $(obj).children("span").text(); //加1
                                count = parseInt(count) + 1;
                                $(obj).children("span").text(count);
                                setTimeout(function () { 5009 }, 0);
                            }
                        }
                    }
                });
                break;
            case "download": //下载
                var search = obj.getAttribute("url").substring(obj.getAttribute("url").indexOf('?'),
obj.getAttribute("url").length);
                var _url = "/Global/Pages/DownLoad/DownLoad.aspx" + search;
                $.dialog({
                    title: _Resource("Landray.EIS.Common").GetResource("Common_Downloading"), //下载
                    width: 570,
                    height: 210,
                    lock: true,
                    min: false,
                    max: false,
                    content: 'url:' + _url,
                    button: [{
                        name: _Resource("Landray.EIS.Common").GetResource("Common_Confirm"), //确定
                        callback: function () {
                            var rtn = this.content.selectFile();
                            if (rtn.indexOf("true") != -1) {
                                if (obj != null) {
                                    var arr = rtn.split('|||');
                                    var count = $(obj).children("span").text(); //加1
                                    for (var i = 1; i < arr.length; i++) {
                                        window.open(arr[i]);
                                        count = parseInt(count) + 1;
                                    }
                                    $(obj).children("span").text(count);
                                }
                            }
                            else {
                                $.dialog({
                                    title: _Resource("Landray.EIS.Common").GetResource("Comm_Prompt"), //提示
                                    min: false,
                                    max: false,
                                    content: rtn
                                });
                                return false;
                            }
                        },
                        focus: true
                    },
                        {
                            name: _Resource("Landray.EIS.Common").GetResource("Comm_Close")//关闭
                        }
                    ]
                });
                break;
        }
    } catch (e) {

    }
}

//打开页面
function openpage(obj) {
    if (obj != null) {
        window.open(obj.getAttribute("url"));
    }
}
function Getcheckboxlength(obj) {
    var len = $("input:checkbox[name='checkbox']:checked").length;
    if (len == 0) {
        alert("请至少选择一项!");
        return false;
    }
    else {
        if (obj && len > 1) {
            alert("请只选择一项!");
            return false;
        }
    }
    return true;
}

function GetAjaxData(url, sdata, id) {
    $.ajax({
        type: "POST",
        async: true,
        url: url,
        data: sdata + "&vnow=" + new Date().getTime(),
        beforeSend: function () { $("#" + id).html("<img src='/App_Themes/Default/images/spinner.gif'/>" + _Resource("Landray.EIS.Common").GetResource("Comm_DataLoad") + "..."); },
        success: function (msg) { $("#" + id).html(msg); },
        error: function (msg) { $("#" + id).html(_Resource("Landray.EIS.Common").GetResource("Comm_Msg0003")); }
    });
}
//js 字符串Format
//两种调用方式
//var template1 = "我是{0}，今年{1}了";
//var template2 = "我是{name}，今年{age}了";
//var result1 = template1.format("loogn", 22);
//var result2 = template2.format({ name: "loogn", age: 22 });
//两个结果都是"我是loogn，今年22了"
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

//获取url参数
function QueryString(key) {

    var paras = location.search;

    if (paras) {

        var arr = paras.substr(1).split("&"), data;

        for (i in arr) {

            data = arr[i].split("=");

            if (data[0] == key) {

                return data[1]

            }

        }

    }

}