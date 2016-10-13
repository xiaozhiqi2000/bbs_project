// JavaScript custom code

$(function() {
	var screenWidth = document.body.scrollWidth;
	var screenHeight = document.body.scrollHeight;
	var lay_background_img = $(".lay_background_img");
	//lay_background_img.css({ "width": screenWidth, "height": screenHeight });

	var random_bg = Math.floor(Math.random() * 3 + 1);
	var bg = '/static/images/login_bg0' + random_bg + '.jpg';
	$(".login-background-img > img").attr("src", bg);

	var login_iframe=$(".login_iframe");
	var iframe_height=login_iframe.height();
	
	//浜岀淮鐮�
	$(".login-dropbox").hover(function() {
		iframe_height = login_iframe.height();
		$(this).find(".login-dropbox-toggle > .iconbox").stop().animate({
			left: "-45px"
		}, 300).end().find(".login-dropbox-menu").css("height", iframe_height).stop(true, true).show(300);
	}, function() {
		$(this).find(".login-dropbox-toggle > .iconbox").stop().animate({
			left: "0"
		}, 300).end().find(".login-dropbox-menu").stop(true, true).hide(300);
	});

	/*** 娴忚鍣ㄥ吋瀹规€у鐞� ***/
	var ie = document.documentMode; /*** 鏂囨。妯″紡 ***/
	if (/msie/.test(navigator.userAgent.toLowerCase()) && ie <= 8) {
		$('body').addClass('ltie8');
	}

	//澧炲姞鍒犻櫎灏忓浘鏍�
	initFunction();

});

function initFunction() {
	//娣诲姞鍒犻櫎鎸夐挳
	var input_txt;
	$("<i class='icon_del'></i>").insertAfter($(".login_input_user input")[0]);
	$("<i class='icon_del'></i>").insertAfter($(".login_input_pwd input")[0]);
	$("<i class='icon_user'></i>").insertBefore('.login_input_user input')[0];
	$("<i class='icon_pwd'></i>").insertBefore('.login_input_pwd input')[0];

	$(".login_iframe .login_input_item input").each(function() {
		input_txt = $(this).val();
		input_txt = $.trim(input_txt);
		if (input_txt != "") {
			$(this).parent(".login_input_item").addClass('show');
		}
	});

	$(".login_input_item input").keyup(function() {
		input_txt = $(this).val();
		input_txt = $.trim(input_txt);
		if (input_txt != "") {
			$(this).parent(".login_input_item").addClass('show');
		}
	});

	$(".login_input_item input").change(function() {
		input_txt = $(this).val();
		input_txt = $.trim(input_txt);
		if (input_txt != "") {
			$(this).parent(".login_input_item").addClass('show');
		}
	});

	$(".login_input_item input").focus(function() {
		input_txt = $(this).val();
		input_txt = $.trim(input_txt);

		$(this).parent(".login_input_item").addClass('input_focus');

		if (input_txt != "") {
			$(this).parent(".login_input_item").addClass('show');
		}
	});

	$(".login_input_item input").blur(function() {
		input_txt = $(this).val();
		input_txt = $.trim(input_txt);

		$(this).parent(".login_input_item").removeClass('input_focus');
		if (input_txt == "") {
			$(this).parent(".login_input_item").removeClass('show');
		}
	});
	
	$(".login_input_item .icon_del").click(function(){
		$(this).siblings("input").val("").focus().parent(".login_input_item").removeClass('show');
	});

}


//缇庡寲鐨勪笅鎷夋
function dropdown(obj) {
	var top = obj.offset().top;
	var left = obj.offset().left;
	var height = obj.height();
	var width = obj.width();
	var select = $(".login_input_item select");

	var options = select.find("option");
	var nheight = options.height();
	var className = select.attr("class");

	var uli = "",
		val = "",
		txt = "";
	var ul = $("#dropdownOptionsFor" + className);
	if (ul.length > 0) {
		ul.remove();
		obj.removeClass("current");
	} else {
		$(".dropdown-options").remove();
		ul = document.createElement("ul");
		$(ul).attr("id", "dropdownOptionsFor" + className).addClass("dropdown-options").css({
			position: "absolute",
			left: left,
			top: top + height
		});

		options.each(function(i) {
			val = $(this).val();
			var icon_class = getIcon(val);
			txt = $(this).text();

			if ($(".login_input_item select option:selected").val() != val)
				uli += "<li><a data-value='" + val + "' href='javascript:void(0);'>" + txt + "</a></li>";
		});
		obj.addClass("current");
		$(ul).html(uli);
		$("body").append(ul);
	}

	$(document).on("click", "li a", function() {
		val = $(this).attr("data-value");
		txt = $(this).html();
		select.val(val);
		$("span.dropdown-input", obj).html(txt);
		$(ul).remove();

		var url = document.location.href;
		url = Com_SetUrlParameter(url, "lang", val);
		url = Com_SetUrlParameter(url, "username", document.getElementsByName("j_username")[0].value);
		location.href = url;
	});

	$(document).click(function() {
		$(ul).remove();
		obj.removeClass("current");
	});
}

