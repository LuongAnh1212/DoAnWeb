function formatCash(str) {
    return str 
		.toString()
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
        });
}
function returnformatCash(str) {
    return str 
		.toString()
        .split(".")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + "") + prev;
        });
}

let token = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")): [];
let fullname = localStorage.getItem("fullname")? JSON.parse(localStorage.getItem("fullname")): [];

if (fullname != undefined && fullname.length != 0){
    document.querySelector(".main-top-header-user-title").innerHTML = "Xin Chào, " + fullname;
    document.querySelector(".no-login").style.display = "none";
    document.querySelector(".user-option").style.display = "block";
}

function UserLogout(){
	localStorage.removeItem("token");
	localStorage.removeItem("fullname");
}

if (token != undefined && token.length != 0){
	$.ajax({
		url: "http://127.0.0.1/Daily/Cart/getQuantityItemInCart",
		type: "POST",
		data: { authorization: token },
		success: function (data) {
		  	if (data != "0") {
				let iconNumberOfCart = document.querySelector('.numberOfCartInHead');
				iconNumberOfCart.innerHTML = data;
			}
		},
	});
}
$(document).ready(function(){
	var btXn = $("#button_backtop");

	//Xử lý Show / Hide khi kéo thanh trượt 
	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			btXn.addClass("show");
		} else {
			btXn.removeClass("show");
		}
  	});

	//Sự kiện click Backtop thì trở lại đầu trang 
	btXn.on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "300");
	});
});
