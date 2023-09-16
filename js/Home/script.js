let apiSPNoiBat = `http://127.0.0.1/Daily/api/sanphamnoibat`;
let count = 0;
let dataSPNoiBat = fetch(apiSPNoiBat)
.then((res) => res.json())
.then((dataSPNoiBat) => {
    let content = ``;
    dataSPNoiBat.forEach((data)=>{
		if (count <= 7){
        content += `
			<article class="product">
				<a href="http://127.0.0.1/Daily/Product/detailOfProduct/${data.sanphamID}">
				<div class="product-img">
					<img src='http://127.0.0.1/Daily/${data.hinhanh}' onerror="this.src='https://cdn.sstatic.net/Img/unified/sprites.svg?v=e5e58ae7df45';" alt="Stack Overflow logo and icons and such">
				</div>
				</a>
				
				<div class="product-discount"></div>
				
				<div class="product-content">
					<a style="text-decoration: none;" href="http://127.0.0.1/Daily/Product/detailOfProduct/${data.sanphamID}">
						<div class="product-content-name">${data.tensanpham}</div>
					</a>
					<div class="product-content-price">${formatCash((data.gia).toString())}đ</div>
                        <button class="product-content-button" id="${data.sanphamID}" value="${data.tensanpham}">
                            Thêm vào giỏ
                        </button>
					</div>
			</article>
			`;
		}
		count++;
    })
    document.querySelector(".box-best-seller-products").innerHTML += content;
});

// Thêm sản phẩm vào giỏ hàng 
// Nếu đã có tài khoản thì tiến hành thêm sản phẩm vào DB
// Ngược lại thì chuyển đến trang Login
let tokenUser = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")): [];

$(document).ready(function () {
    $(document).on("click", ".product-content-button", function () {
        if (tokenUser != undefined && tokenUser.length != 0){
            var row_id = $(this).attr("id");
            var row_title = $(this).attr("value");
            var row_price = 0;
            var row_quantity = 0;
            var row_thumbnail = "";
            var row_inventory_num = 0;
            //Tìm thông tin sản phẩm đã được thêm vào
            fetch(apiSPNoiBat)
            .then((res) => res.json())
            .then((dataProduct) => {
                dataProduct.forEach((element) => {
                    if (element["sanphamID"] == row_id) {
                        row_title = element["tensanpham"];
                        row_price = element["gia"];
                        row_thumbnail = element["hinhanh"];
                        row_inventory_num = element["soluongtonkho"];
                    }
                });
            })
            .then(()=>{
                let token = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) : [];
                $.ajax({
                    url: "http://127.0.0.1/Daily/Cart/getCartId",
                    type: "POST",
                    data: { authorization: token },
                    success: function (data) {
                        if (data != "0") {
                            let apiCarts = `http://127.0.0.1/Daily/api/chitietgiohang/${data}`;
                            fetch(apiCarts)
                            .then((res) => res.json())
                            .then((dataCart) => {
                                var cart_id = data;
                                //Kiểm tra SP vừa chọn có trong giỏ hàng hay chưa
                                var check = 0;
                                for (var i = 0; i < dataCart.length; i++) {
                                    if (dataCart[i].san_pham_id == row_id && row_price != 0) {
                                        check = 1; //Tang them 1 cho so luong SP da ton tai trong gio hang
                                        row_quantity = parseInt(dataCart[i].so_luong_sp) + 1;
                                        
                                        //Tiến hành thêm vào DB
                                        $.ajax({
                                            url: "http://127.0.0.1/Daily/Cart/addCartItemFromProduct",
                                            type: "POST",
                                            data: {
                                                authorization: token,
                                                cart_id: data,
                                                product_id: row_id,
                                                product_quantity: row_quantity,
                                                check_add: check,
                                            },
                                            success: function (data) {
                                                if (data != "0") {
                                                    $.ajax({
                                                        url: "http://127.0.0.1/Daily/Cart/updateTotalOfCart",
                                                        type: "POST",
                                                        data: {
                                                            authorization: token,
                                                            cart_id: cart_id,
                                                            check_add: check,
                                                        },
                                                        success: function (data) {
                                                            if (data != "0") {
                                                                showToast("Complete","success",`Đã thêm ${row_title} vào giỏ hàng`,2000);
                                                            } else {
                                                                showToast( "Error", "error",`Thêm ${row_title} không thành công.`, 2000);
                                                            }
                                                        },
                                                    });
                                                } else {
                                                    showToast(
                                                    "Error",
                                                    "error",
                                                    `Thêm ${row_title} không thành công.`,
                                                    2000
                                                    );
                                                }
                                            },
                                            error: function () {
                                                showToast("Error", "error", `Thêm ${row_title} không thành công.`,2000);
                                            },
                                        });
                                    }
                                }

                                if (check == 0 && row_price != 0) {
                                    //Tiến hành thêm sản phẩm mới vào DB
                                    var product_quantity_for_insert = 1;
                                    $.ajax({
                                        url: "http://127.0.0.1/Daily/Cart/addCartItemFromProduct",
                                        type: "POST",
                                        data: {
                                            authorization: token,
                                            cart_id: data,
                                            product_id: row_id,
                                            product_quantity: product_quantity_for_insert,
                                            check_add: check,
                                        },
                                        success: function (data) {
                                            if (data != "0") {
                                                $.ajax({
                                                    url: "http://127.0.0.1/Daily/Cart/updateTotalOfCart",
                                                    type: "POST",
                                                    data: {
                                                        authorization: token,
                                                        cart_id: cart_id,
                                                        check_add: check,
                                                    },
                                                    success: function (data) {
                                                        if (data != "0") {
                                                            //Thêm sản phẩm mới thì phải thay đổi icon số lượng 
                                                            document.querySelector('.numberOfCartInHead').innerHTML = data;
                                                            showToast( "Complete","success",`Đã thêm ${row_title} vào giỏ hàng`, 2000);
                                                        } else {
                                                            showToast("Error", "error", `Thêm ${row_title} không thành công.`, 2000 );
                                                        }
                                                    },
                                                });
                                            } else {
                                                showToast( "Error", "error",`Thêm ${row_title} không thành công.`,2000);
                                            }
                                        },
                                        error: function () {
                                            showToast("Error","error",`Thêm ${row_title} không thành công.`,2000);
                                        },
                                    });
                                }
                    
                            });
                        } else {
                            showToast("Error", "error", "Có lỗi xãy ra.", 2000);
                        }
                    },
                    error: function () {
                        showToast(
                          "Error",
                          "error",
                          `Thêm ${row_title} không thành công.`,
                          2000
                        );
                    },
                });
            })
        }
        else{
            window.location = "http://127.0.0.1/Daily/Account/Login";
        }
    })
})

