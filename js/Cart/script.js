// Kiểm tra khách hàng đăng nhập chưa = Kiểm tra token
let tokenUser = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")): [];
if (tokenUser != undefined && tokenUser.length != 0){
	console.log("Nguoi dung da dang nhap");

	//1. Hiển thị giỏ hàng
	//1.1 - Rỗng nếu không có Database
	//1.2 - Hiển thị ra các sản phẩm nêú giỏ hàng không rỗng 
	$.ajax({
		url: "http://127.0.0.1/Daily/Cart/getCartId",
		type: "POST",
		data: { authorization: tokenUser },
		success: function (data) {
		  	if (data != "0") {
				let apiCarts = `http://127.0.0.1/Daily/api/chitietgiohang/${data}`;
				fetch(apiCarts)
			  		.then((res) => res.json())
			  		.then((dataCart) => {
						if (dataCart.length == 0) {
							document.getElementById("Gio").style.display = "none";
							document.getElementById("X_product").style.display = "block";
							} else {
							document.getElementById("Gio").style.display = "block";
							loadCart(dataCart); //Hiển thị các sản phẩm có trong giỏ hàng
						}
						return dataCart;
			  		})
					.then((dataCart) => {
						loadEventDB(dataCart, data);
					});
			} else {
				showToast("Error", "error", "Có lỗi xãy ra.", 2000);
			}
		},
	});
}else{
	console.log("Nguoi dung chua dang nhap");
	document.getElementById("Gio").style.display = "none";
	document.querySelector(".cart-done").style.display = "none";
	document.getElementById("X_product").style.display = "block";
}

function loadCart(carts) {
	console.log(carts);
	let totalOfCart = 0;
	let content = "<div>";
	let priceOfProduct = 0
	for (var i = 0; i < carts.length; i++) {
	  	var product_quantity = parseInt(carts[i].so_luong_sp);
		console.log(carts[i].trang_thai);
		if(carts[i].trang_thai == "1" || carts[i].trangthai == "1" ){
			priceOfProduct = parseInt(Math.floor(carts[i].gia_sp * carts[i].so_luong_sp));
		}

		totalOfCart += priceOfProduct;
		content = ` 
			<div class="cart-item">
				<div class="cart-item-sanpham" onclick="linkProduct(${carts[i].san_pham_id});">
					<div class="cart-item-img">
						<img src="http://127.0.0.1/Daily/${carts[i].hinhanh_sp}" alt="hinhanh_sanpham"/>
					</div>
					<div class="cart-item-name">${carts[i].ten_san_pham}</div>
				</div>
				<div class="res">`;
		content += `
					<div class="cart-item-res price">${formatCash(String(Math.floor(carts[i].gia_sp)))}đ</div>`;
	
	  	content += `<div class="cart-item-res product-quantity">
					  	<button class="cart-btn cart-btn-tru" id="${carts[i].san_pham_id}">-</button>
					  	<input class="cart_quantity" type="number" value="${product_quantity}" min="1" max="" id = "${i}"/>
					  	<button class="cart-btn cart-btn-cong" id="${carts[i].san_pham_id}">+</button>
				 	</div>
				  	<div class="cart-item-res priceOfProduct">${formatCash(String(priceOfProduct))}đ</div>
			 	</div>
			  	<div class="cart-item-phu" id="${carts[i].san_pham_id}">
					<button class="cart-remove" id="${carts[i].san_pham_id}">
						Xóa
					</button>
			  	</div>
			  	<div class="cart-item-phu-mb" id="${carts[i].san_pham_id}">
				  	<button class="cart-remove" id="${carts[i].san_pham_id}">
				  		<i class="fas fa-trash-alt" id="icon-remove-mobile"></i>
					</button>
			  	</div>
		  	</div>`;
	  	
		document.querySelector(".cart-list-tbody").insertAdjacentHTML("beforeend", content);
	  	if (carts != []) {
			let content = "<div>";
			content = `
					<div class="cart-product-quantity">
						<div style="font-weight:bold;"> Tổng sản phẩm: </div>
						<span class="cart-pro-quantity">${i+1}</span>
					</div>

					<div class="cart-tong">
						<div style="font-weight:bold;"> Tổng tiền hàng: </div>
						<span class="cart-price">${formatCash(String(totalOfCart))}đ</span>`;

			content += `<a href="#"><button class="muahang">Mua hàng</button></a>`;
					`</div>`;
			document.querySelector(".cart-done").innerHTML = content;
	  	}
	}
  }

function loadEventDB(carts, data) {
	let apiProducts = `http://127.0.0.1/Daily/api/products`;
	
	var cart_id = data;
	let token = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")): [];
	
	$(document).ready(function () {
	  	let productQuantity = document.querySelectorAll(".cart_quantity");
	  	productQuantity.forEach((element) => {

			//Bật vô hiệu hóa - nếu <= 1 (Xét ban đầu)
			if (element.value <= 1) {
				let buttonTru = element.parentElement.querySelector(".cart-btn-tru");
				buttonTru.disabled = true;
			}
  
			//Bật vô hiệu hóa + nếu đã hơn số lượng hàng tồn kho (Xét ban đầu)  //Không vô hiệu hóa nữa (Lý do: js/Product/detail.js)
			// var inputQuantity = document.querySelectorAll(".cart_quantity");
			// var maxQuantityArray = [];
			// var m = 0;
			// fetch(apiProducts)
		  	// 	.then((res) => res.json())
		  	// 	.then((dataCart) => {
			// 		dataCart.forEach((data) => {
			//   			if (data["sanphamID"] == element.parentElement.querySelector(".cart-btn-tru").id) {
			// 				if (data["soluongtonkho"] <= element.value) {
			// 					let buttonCong = element.parentElement.querySelector(".cart-btn-cong");
			// 					buttonCong.disabled = true;
			// 				}
			//   			}
			// 			// Thêm max của input quantity
			// 			if (carts != undefined && carts.length != 0) {
			// 				for (var i = 0; i < carts.length; i++) {
			// 					if (data["sanphamID"] == carts[i]["san_pham_id"]) {
			// 						maxQuantityArray[m] = data["soluongtonkho"];
			// 						m++;
			// 					}
			// 				}
			// 			}
			// 		});
		  	// 	})
		  	// 	.then(() => {
			// 		var n = 0;
			// 		inputQuantity.forEach((element) => {
			//   			element.max = maxQuantityArray[n];
			//   			n++;
			// 		});
		  	// 	});

	 		 });
  
			$(document).on("click", ".cart-btn-cong", function (event) {
				var product_id = event.target.id;
				var row_id = $(this).attr("id");
				var a = "#" + row_id;
				var priceOfProduct = event.target.parentElement.nextElementSibling.innerHTML;		
				var price = event.target.parentElement.previousElementSibling;
  
				var soTien = Number(returnFormatCash(price.innerHTML.slice(0, price.innerHTML.length - 1))) +
		 		Number(returnFormatCash(priceOfProduct.slice(0, priceOfProduct.length - 1)));
				event.target.parentElement.nextElementSibling.innerHTML = formatCash(String(soTien)) + "đ";
				$(a + "+input").val(Number($(a + "+input").val()) + 1);
				var sum = document.querySelectorAll(".priceOfProduct");
				var total = 0;
				sum.forEach((item) => {
					total += Number(returnFormatCash(item.innerHTML.slice(0, item.innerHTML.length - 1)));
				});
				$(".cart-price").html(formatCash(String(total)) + "đ");

				var quantityNow = event.target.parentElement.querySelector(".cart_quantity");
  
				var operation = "+";

				// TH: Thêm thay đổi về số lượng vào DB
				$.ajax({
		  			url: "http://127.0.0.1/Daily/Cart/updateQuantity",
					type: "POST",
					data: {
						authorization: token,
						cart_id: cart_id,
						product_id: product_id,
						operation: operation,
					},
					success: function (data) {
						if (data != "0") {
							var check_add = 1;
							$.ajax({
								url: "http://127.0.0.1/Daily/Cart/updateTotalOfCart",
								type: "POST",
								data: {
									authorization: token,
									cart_id: cart_id,
									check_add: check_add,
								},
								success: function (data) {},
								error: function () {
								showToast("Error", "error", "Có lỗi xãy ra.", 2000);
								},
							});
						}
					},
					error: function (data) {
						showToast("Error", "error", "Có lỗi xãy ra.", 2000);
					},
				});
  
				// //Tắt vô hiệu hóa nút - nếu số lượng > 1;
				if (quantityNow.value > 1) {
				let buttonTru =event.target.parentElement.querySelector(".cart-btn-tru");
				buttonTru.disabled = false;
				}
  
				//Bật vô hiệu hóa + nếu đã hơn số lượng hàng tồn kho //Không vô hiệu hóa nữa (Lý do: js/Product/detail.js)
				// fetch(apiProducts)
				// .then((res) => res.json())
				// .then((dataCart) => {
				// 	dataCart.forEach((element) => {
				// 	if (element["sanphamID"] == event.target.id) {
				// 		if (element["soluongtonkho"] <= quantityNow.value) {
				// 			let buttonCong =event.target.parentElement.querySelector(".cart-btn-cong");
				// 			buttonCong.disabled = true;
				// 		}
				// 	}
				// 	});
				// });
	  		});
  
			$(document).on("click", ".cart-btn-tru", function (event) {
				var product_id = event.target.id;
				var row_id = $(this).attr("id");
				var a = "#" + row_id;
				var priceOfProduct = event.target.parentElement.nextElementSibling.innerHTML;
				var price = event.target.parentElement.previousElementSibling;
				var soTien = Number(returnFormatCash(priceOfProduct.slice(0, priceOfProduct.length - 1))) -
				Number(returnFormatCash(price.innerHTML.slice(0, price.innerHTML.length - 1)));
				event.target.parentElement.nextElementSibling.innerHTML = formatCash(String(soTien)) + "đ";
				var tru = event.target;
		
				$(a + "+input").val(Number($(a + "+input").val()) - 1);
				let quantityAfter = tru.parentElement.querySelector(".cart_quantity");
		
				// Vô hiệu hóa - nếu quantity = 1;
				if (quantityAfter.value <= 1) {
					let buttonTru =quantityAfter.parentElement.querySelector(".cart-btn-tru");
					buttonTru.disabled = true;
				}
		
				//Tắt vô hiệu hóa + nếu đã nhỏ hơn số lượng hàng tồn kho //Không vô hiệu hóa nữa (Lý do: js/Product/detail.js)
				// fetch(apiProducts)
				// .then((res) => res.json())
				// .then((dataCart) => {
				// 	dataCart.forEach((element) => {
				// 	if (element["sanphamID"] == event.target.id) {
				// 		if (element["soluongtonkho"] > quantityNow.value) {
				// 			let buttonCong =event.target.parentElement.querySelector(".cart-btn-cong");
				// 			buttonCong.disabled = false;
				// 		}
				// 	}
				// 	});
				// });
		
				var sum = document.querySelectorAll(".priceOfProduct");
				var total = 0;
				sum.forEach((item) => {
					total += Number(returnFormatCash(item.innerHTML.slice(0, item.innerHTML.length - 1)));
				});
		
				$(".cart-price").html(formatCash(String(total)) + "đ");
		
				var quantityNow = event.target.parentElement.querySelector(".cart_quantity");
		
				var operation = "-";
				//TH: DB - Thêm thay đổi số lượng vào DB
				$.ajax({
				url: "http://127.0.0.1/Daily/Cart/updateQuantity",
				type: "POST",
				data: {
					authorization: token,
					cart_id: cart_id,
					product_id: product_id,
					operation: operation,
				},
				success: function (data) {
					if (data != "0") {
					var check_add = 1;
					$.ajax({
						url: "http://127.0.0.1/Daily/Cart/updateTotalOfCart",
						type: "POST",
						data: {
						authorization: token,
						cart_id: cart_id,
						check_add: check_add,
						},
						success: function (data) {},
						error: function () {
							showToast("Error", "error", "Có lỗi xãy ra.", 2000);
						},
					});
					}
				},
				error: function (data) {
					showToast("Error", "error", "Có lỗi xãy ra.", 2000);
				},
				});
			});
  
	// Xóa sản phẩm có trong DB của người dùng đã đăng ký tài khoản
	$(document).on("click", ".cart-remove", function (event) {
		var product_id = event.target.parentElement.id;
		var row_id = $(this).attr("id");
		tools__.confirm("show", "Bạn có muốn xóa sản phẩm này không?", () => {
		  	$.ajax({
			url: "http://127.0.0.1/Daily/Cart/removeItem",
			type: "POST",
			data: {
				authorization: token,
				cart_id: cart_id,
				product_id: product_id,
			},
			success: function (data) {
			  if (data != "0") {
				$.ajax({
				  url: "http://127.0.0.1/Daily/Cart/updateCart",
				  type: "POST",
				  data: { authorization: token, cart_id: cart_id },
				  success: function (data) {
					if (data != "0") {
						var btn_remove = event.target.id;
						if (String(btn_remove) == "icon-remove-mobile") {
							event.target.parentElement.parentElement.parentElement.remove();
						} else {
							event.target.parentElement.parentElement.remove();
						}
					  	//Cap nhat tong so tien, tong san pham sau khi xoa
						let apiCarts = `http://127.0.0.1/Daily/api/cart/${cart_id}`;
						fetch(apiCarts)
						.then((res) => res.json())
						.then((dataCart) => {
							console.log(dataCart);
							if (dataCart.length == 0) {
								document.getElementById("Gio").style.display = "none";
								document.getElementById("X_product").style.display = "block";
								document.querySelector(".cart-done").innerHTML = "";
							} else {
								document.getElementById("Gio").style.display ="block";
								var total = parseInt(dataCart[0].tong_gio_hang);
								var productQuantityTotal = parseInt(dataCart[0].tong_so_luong_sp);
							
								if (total != 0) {
									document.querySelector(".cart-price").innerHTML = formatCash(total) + "đ";
									document.querySelector(".cart-pro-quantity").innerHTML = productQuantityTotal;
								} else {
									document.querySelector("#X_product").style.display = "block";
									document.querySelector("#Gio").style.display = "none";
									document.querySelector(".cart-done").innerHTML = "";
								}
							}
						});

						//Xoa sản phẩm thì phải thay đổi icon số lượng 
						let numberCart = parseInt(document.querySelector('.numberOfCartInHead').innerHTML) - 1;
						document.querySelector('.numberOfCartInHead').innerHTML = numberCart;
						console.log(numberCart);

						//Thong bao
						showToast("Complete","success","Đã xóa Sản phẩm khỏi giỏ hàng",2000);

					}
					tools__.displayOpacity("hidden");
				  },
				  error: function () {
					showToast("Error", "error", "Có lỗi xãy ra.", 2000);
					tools__.displayOpacity("hidden");
				  },
				});
			  }
			},
			error: function (data) {
			  showToast("Error", "error", "Có lỗi xãy ra.", 2000);
			  tools__.displayOpacity("hidden");
			},
		  });
		});
	});
  
	//Xét điều kiện khi nhập số lượng 
	var inputQuantity = document.querySelectorAll(".cart_quantity");
  
	inputQuantity.forEach((element) => {
		element.addEventListener("input", function (event) {
		  	var product_id = event.target.parentElement.querySelector(".cart-btn-tru").id;
		  	window.setTimeout(function () {
				var nowQuantity = element.value;
				var maxQuantity = element.max;
	
				if (nowQuantity == "" || nowQuantity == NaN) {
					element.value = 0;
				} else if (nowQuantity > 0) {
					if (element.value.length > 1) {
						element.value = parseInt(element.value);
					}
				}
				if (nowQuantity > 0) {
					if (element.value.length > 1) {
						element.value = parseInt(element.value);
					}
				}
				//Không vô hiệu hóa nữa (Lý do: js/Product/detail.js)
				// var nowQuantitySS = parseInt(nowQuantity);
				// var maxQuantitySS = parseInt(maxQuantity);
				// if (nowQuantitySS >= maxQuantitySS) {
				// 	element.value = maxQuantity;
				// 	element.parentElement.querySelector(".cart-btn-cong").disabled = true; //Vo hieu hoa
				// } else {
				// 	element.parentElement.querySelector(".cart-btn-cong").disabled = false; //Tat Vo hieu hoa
				// }
	
				if (nowQuantity <= 1) {
					element.parentElement.querySelector(".cart-btn-tru").disabled = true; //Vo hieu hoa
				} else {
					element.parentElement.querySelector(".cart-btn-tru").disabled = false; //Tat Vo hieu hoa
				}
  
				//Thay doi So tien
				var pricePNow = element.parentElement.parentElement.querySelector(".price").innerHTML;
	
				var pricePNow = pricePNow.replace("đ", "");
				element.parentElement.parentElement.querySelector(".priceOfProduct").innerHTML = formatCash(String(element.value * returnFormatCash(pricePNow))) + "đ";
  
				// Lưu thay đổi vào DB
				var quantityR = element.value;
				var operation = "input_quantity";
				$.ajax({
				url: "http://127.0.0.1/Daily/Cart/updateQuantity",
				type: "POST",
				data: {
					authorization: token,
					cart_id: cart_id,
					product_id: product_id,
					operation: operation,
					product_quantity: quantityR,
				},
				success: function (data) {
					if (data != "0") {
					var check_add = 1;
					$.ajax({
						url: "http://127.0.0.1/Daily/Cart/updateTotalOfCart",
						type: "POST",
						data: {
							authorization: token,
							cart_id: cart_id,
							check_add: check_add,
						},
						success: function (data) {
							if (data != "0") {
								//Cap nhat tong so tien sau khi input
								let apiCarts = `http://127.0.0.1/Daily/api/cart/${cart_id}`;
								fetch(apiCarts)
								.then((res) => res.json())
								.then((dataCart) => {
									console.log(dataCart);
									if (dataCart.length == 0) {
										document.getElementById("Gio").style.display = "none";
										document.getElementById("X_product").style.display = "block";
										document.querySelector(".cart-done").innerHTML = "";
									} else {
										document.getElementById("Gio").style.display ="block";
										var total = parseInt(dataCart[0].tong_gio_hang);
										var productQuantityTotal = parseInt(dataCart[0].tong_so_luong_sp);
									
										if (total != 0) {
											document.querySelector(".cart-price").innerHTML = formatCash(String(total)) + "đ";
											document.querySelector(".cart-pro-quantity").innerHTML = productQuantityTotal;
										} else {
											document.querySelector("#X_product").style.display = "block";
											document.querySelector("#Gio").style.display = "none";
											document.querySelector(".cart-done").innerHTML = "";
										}
									}
								});
							}
						},
						error: function () {
							showToast("Error", "error", "Có lỗi xãy ra.", 2000);
						},
					});
					}
				},
				error: function (data) {
					showToast("Error", "error", "Có lỗi xãy ra.", 2000);
				},
				});
			}, 1);
			});
		});
  
	  	inputQuantity.forEach((element) => {
			element.addEventListener("blur", function (event) {
				console.log(carts[event.target.id]);
		  		var product_id = event.target.parentElement.querySelector(".cart-btn-tru").id;
		  		if (event.target.value == 0) {					
					if (carts[event.target.id].ten_san_pham != undefined) {
			  			var productTitle = carts[event.target.id].ten_san_pham;
			 			var indexCart = event.target.id;
						console.log('Xoa San pham trong gio hang khong du so luong');
			  			tools__.confirm("show",`Bạn có muốn xóa ${productTitle} không?`,() => {
				  			$.ajax({
								url: "http://127.0.0.1/Daily/Cart/removeItem",
								type: "POST",
								data: {
									authorization: token,
									cart_id: cart_id,
									product_id: product_id,
								},
							success: function (data) {
							if (data != "0") {
								$.ajax({
									url: "http://127.0.0.1/Daily/Cart/updateCart",
									type: "POST",
									data: { authorization: token, cart_id: cart_id },
									success: function (data) {
										if (data != "0") {
										//Cap nhat tong so tien, tong san pham sau khi xoa
										let apiCarts = `http://127.0.0.1/Daily/api/cart/${cart_id}`;
										fetch(apiCarts)
										.then((res) => res.json())
										.then((dataCart) => {
											console.log(dataCart);
											if (dataCart.length == 0) {
												document.getElementById("Gio").style.display = "none";
												document.getElementById("X_product").style.display = "block";
												document.querySelector(".cart-done").innerHTML = "";
											} else {
												document.getElementById("Gio").style.display ="block";
												var total = parseInt(dataCart[0].tong_gio_hang);
												var productQuantityTotal = parseInt(dataCart[0].tong_so_luong_sp);
											
												if (total != 0) {
													document.querySelector(".cart-price").innerHTML = formatCash(String(total)) + "đ";
													document.querySelector(".cart-pro-quantity").innerHTML = productQuantityTotal;
												} else {
													document.querySelector("#X_product").style.display = "block";
													document.querySelector("#Gio").style.display = "none";
													document.querySelector(".cart-done").innerHTML = "";
												}
											}
										});	

										element.parentElement.parentElement.parentElement.remove();
										//Xoa sản phẩm thì phải thay đổi icon số lượng 
										let numberCart = parseInt(document.querySelector('.numberOfCartInHead').innerHTML) - 1;
										document.querySelector('.numberOfCartInHead').innerHTML = numberCart;
										console.log(numberCart);
										showToast("Complete","success",`Đã xóa ${productTitle} khỏi giỏ hàng`,2000);
										
										}
										tools__.displayOpacity("hidden");
									},
									error: function () {
										showToast("Error", "error", "Có lỗi xãy ra.", 2000);
										tools__.displayOpacity("hidden");
									},
								});
							}
							},
							error: function (data) {
								showToast("Error", "error", "Có lỗi xãy ra.", 2000);
								tools__.displayOpacity("hidden");
							},
						});
						},
						() => {
							console.log("Huy");
							event.target.value = 1;
							console.log(event.target.parentElement.querySelector(".cart-btn-tru").id);
							var row_id = event.target.parentElement.querySelector(".cart-btn-tru").id;
							var row_quantity = 1;
							var check = 1;
							var pricePNow =event.target.parentElement.parentElement.querySelector(".price").innerHTML;
							event.target.parentElement.parentElement.querySelector(".priceOfProduct").innerHTML = pricePNow;
			
							//upload cartitems va cart
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
											//Cập nhật Tổng tiền
											let apiCarts = `http://127.0.0.1/Daily/api/cart/${cart_id}`;
											fetch(apiCarts)
											.then((res) => res.json())
											.then((dataCart) => {
												console.log(dataCart);
												if (dataCart.length == 0) {
													document.getElementById("Gio").style.display = "none";
													document.getElementById("X_product").style.display = "block";
													document.querySelector(".cart-done").innerHTML = "";
												} else {
													document.getElementById("Gio").style.display ="block";
													var total = parseInt(dataCart[0].tong_gio_hang);
												
													if (total != 0) {
														document.querySelector(".cart-price").innerHTML = formatCash(String(total)) + "đ";
													} else {
														document.querySelector("#X_product").style.display = "block";
														document.querySelector("#Gio").style.display = "none";
														document.querySelector(".cart-done").innerHTML = "";
													}
												}
											});	
										}
									},
									});
								}
								},
								error: function () {
								showToast("Error", "error", `Error E123.`, 2000);
								},
							});
						}
			  		);
				}
		 	 }
		});
	});
  
	// Khi click nut mua hang
	$(document).on("click", ".muahang", function (event) {
		let apiProducts = `http://127.0.0.1/Daily/api/products`;
		//Phai lay lai du lieu trong gio hang vi luc kiem tra ton kho khi bam MUA HANG se co thay doi
		//Lưu đơn hàng này vào bảng don_hang_tam 
		//Đồng thời thông báo cho khách hàng về số lượng tồn kho không dủ.

		let apiCarts = `http://127.0.0.1/Daily/api/chitietgiohang/${data}`;
		fetch(apiCarts)
		.then((res) => res.json())
		.then((carts) => {
			let lenCarts = carts.length;
			let arrayProductValid = [];
			let check = 1;

			// Kiểm tra sản phẩm có đủ số tồn kho không
			fetch(apiProducts)
			.then((res) => res.json())
			.then((dataCart) => {
				dataCart.forEach((element) => {
					for (var i = 0; i < lenCarts; i++) {
						if(element["sanphamID"] == carts[i].san_pham_id && arrayProductValid.length <= lenCarts){
							arrayProductValid[i] = element["sanphamID"];

							if(element["soluongtonkho"] < carts[i].so_luong_sp){
								check = 0;
								console.log(element["soluongtonkho"]);
								console.log(carts[i].so_luong_sp);
								//1.1: Lưu đơn hàng này (chỉ lưu những sp không đủ số lượng đáp ứng nhu cầu của khách hàng) vào bảng don_hang_tam 
								
								var itemQuantity = document.querySelectorAll(".cart_quantity");
								itemQuantity.forEach((item)=>{
									if (item.id == i){
										item.style.backgroundColor = "red";
									}
								})

								tools__.confirm("show", `Sản phẩm <strong>${element["tensanpham"]}</strong> không còn đủ lượng tồn kho.</br>
								<strong>KHO: ${element["soluongtonkho"]} </strong></br></br>
								Vui lòng điều chỉnh hoặc chọn sản phẩm khác.</br></br>
								Chúng tôi sẽ sớm bổ sung thêm mặt hàng này. Cảm ơn bạn đã quan tâm.`, () => {									
									tools__.displayOpacity("hidden");
								});
							}
						}
					}
					
				});

			}).then(()=>{
				console.log(check);
				if (check == 1){
					window.location.replace("http://127.0.0.1/Daily/Order");
				}
			});
		});

	  });
	});
}


function returnFormatCash(str) {
return str
	.toString()
	.split(".")
	.reverse()
	.reduce((prev, next, index) => {
		return (index % 3 ? next : next + "") + prev;
	});
}

function linkProduct(san_pham_id){
	window.location=`http://127.0.0.1/Daily/Product/detailOfProduct/${san_pham_id}`;
}
