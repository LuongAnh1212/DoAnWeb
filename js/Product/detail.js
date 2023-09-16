var urlSearch = document.URL;
const uList = urlSearch.split("/");
const keySearch = uList[uList.length - 1];
let apiProduct = `http://127.0.0.1/Daily/api/sanpham/${keySearch}`;

// var imageNo=0; //Move left and right image

$(document).ready(function () {
    if (apiProduct != []) {
      fetch(apiProduct)
        .then((res) => res.json())  
        .then((dataCart) => {
          dataCart.forEach((product) => {
            if (keySearch != undefined) {
							console.log(product);
              var description = "";
              var img =  product["hinhanh"];
							var arr_small_img = product["small_imgs"];
							if(arr_small_img instanceof Array)
								console.log("Represents an array");
							else
								console.log("Does not represent an array");
							console.log(arr_small_img);
  
              if (product["chitiet"] != null) {
								description = product["chitiet"];
              }
  
              var content = `
              							<!-- Place somewhere in the <body> of your page -->     
														<div class="row">
																<div class="col-lg-4" style="padding: 0px 0px;">
																	<div class="flexslider">
																		<div id="myCarousel" class="carousel slide" data-interval="false">
																				<!-- Wrapper for slides -->
																				<div class="carousel-inner">		
																					<div class="item active">
																						<img class="now_img-showcase" src="http://127.0.0.1/Daily/${img}" alt="product image" style="width:auto;height:300px;margin:auto;" onclick="showPopup(this)">
																					</div>
                         `;
												
												if (product["small_imgs"] != undefined && product["small_imgs"].length != 0){
													for(var i=0; i < product["small_imgs"].length; i++){
														content += `
																			<div class="item">
																				<img src="http://127.0.0.1/Daily/${product["small_imgs"][i]}" alt="product image" style="width:auto;height:300px;margin:auto;" onclick="showPopup(this)">
																			</div>
														`;
													}
												}
  
							content += `				</div>
																	<!-- Left and right controls -->
																	<a class="left carousel-control" href="#myCarousel" data-slide="prev">
																		<span class="glyphicon glyphicon-chevron-left"></span>
																		<span class="sr-only">Previous</span>
																	</a>
																	<a class="right carousel-control" href="#myCarousel" data-slide="next">
																		<span class="glyphicon glyphicon-chevron-right"></span>
																		<span class="sr-only">Next</span>
																	</a>
																</div>
							`;
												if (product["small_imgs"] != undefined && product["small_imgs"].length != 0){
													content += `
																		<ul class="img-select">
																			<li class="img-item item">
																				<img class="a_img-item" src="http://127.0.0.1/Daily/${img}" alt="product image" style="height:auto;">
																			</li>
													`;
													for(var i=0; i < product["small_imgs"].length; i++){
														content += `
																			<li class="img-item item">
																				<img class="a_img-item" src="http://127.0.0.1/Daily/${product["small_imgs"][i]}" alt="product image" style="height:auto;">
																			</li>
														`;
													}
												}
              content += `				</ul>
																</div>
                        			</div>
															<div class="col-lg-8">
																<div class="tieude_detal">
																		<p class="tieude_detal-p">${product["tensanpham"]}</p>
																		<hr>
																</div>
                              
																<div class="giatien_detail">
																	<p>${formatCash(Math.floor(product["gia"] ))} <sup> &#8363 </sup> </p>`;
  
              content += `			</div>                                                  
                  
                              	<div class="dmucchinh_detal">
                              		<p>Đã bán: ${product["soluongdaban"]} sản phẩm</p>
                              		<hr>
                          			</div>`;
  
              // if (product["soluongtonkho"] != 0) {
                content += `		<div class="productDetail_addCart">
                                  <div class="item_detail">
                                      <button class="cart-btn cart-btn-tru" id="${product["sanphamID"] }" disabled="">-</button> 
                                      <input class="cart_quantity" type="number" value="1" min="1" max="${product["soluongtonkho"]}" id="${product["sanphamID"]}" />
                                      <button class="cart-btn cart-btn-cong" id="${product["sanphamID"]}">+</button>
                                  </div>
  
                                  <div class="item_detail">
                                      <button class="button_Add_detail">Thêm Vào Giỏ</button>
                                  </div>                            
                              	</div>`;
              // } 
              // else {
              //   content += `		<div style="color:red;">Hết hàng</div>`;
              // }
  
              content += `			<div class="dmuc_detail">
																	<hr>
																	<p>Danh Mục : ${product["ten_loai_sp"]} > <a class="dmuc_detaildd" style="text-decoration: none;" href="http://127.0.0.1/Daily/Product/danhmucsanpham/${product["loaiID"]}/${product["danhmucID"]}">${product["ten_danh_muc"]}</a></p>
																	<hr>
																</div>
                          		</div>
                      			</div>
														</div>

														<!--Bắt đầu khung thông tin chi tiết về sản phẩm-->
														<div class="max-width">
															<div class="content_pro-item">
																<nav class="info_pro-title">
																	<ul>
																		<li class="tab_item active">Chi tiết sản phẩm</li>
																		<li class="tab_item">Mô tả sản phẩm</li>
																		<li class="tab_item">Đánh giá sản phẩm</li>
																	</ul>
																</nav>
																<div class="info_pro-tab" id="scroll-react">
																	<div class="info_pro-item active">
																		<nav class="list_specifications">
																			<ul>
																				${product["chitiet"]}
																			</ul>
																		</nav>					
																	</div>

																	<div class="info_pro-item">
																		${product["mota"]}
																	</div>

																	<div class="info_pro-item">
																		<p><strong>Tiêu chí đánh giá</strong></p>
																		<p>- Sản phẩm chất lượng<br> - Đáng đồng tiền<br> - Dễ sử dụng<br> - Độ bền và thẩm mỹ </p>
																	</div>
																	
																</div>
															</div>
														</div>
														<!--Kết thúc khung thông tin chi tiết về sản phẩm-->
                      `;
            }
            document.querySelector(".all_detail").innerHTML = content;  //Hiển thị thông tin sản phẩm ra màn hình

						var contentPopup = `
									<div class="main_popup_product_image"> 
										<div class= "row">
											<div class="col-lg-8 popup_product_image_col_left popup_item_img">
												<img src="http://127.0.0.1/Daily/${img}">
											</div>
											<div class="col-lg-4 popup_product_image_col_right">
												<div class="name_product">${product["tensanpham"]}</div> 
												<div class="small_imgs">
												`;
											contentPopup += `
												<div class="popup_small_img popup_item_img">
													<img src="http://127.0.0.1/Daily/${img}" alt="product image">
												</div>
												`;
											if (product["small_imgs"] != undefined && product["small_imgs"].length != 0){
												for(var i=0; i < product["small_imgs"].length; i++){
													contentPopup += `
													<div class="popup_small_img popup_item_img">
														<img src="http://127.0.0.1/Daily/${product["small_imgs"][i]}" alt="product image">
													</div>
													`;
												}
											}
												contentPopup += `		
												</div>
											</div>
											<div class="close_popup"></div>
										</div>
									</div>
						`;

            document.querySelector(".popup_product_image").innerHTML = contentPopup;  //Thêm thông tin popup sản phẩm vào .popup_product_image

						//Chọn ảnh hiển thị - flexslider
						const now_img = document.querySelector('.now_img-showcase');
						// console.log(now_img);
						const small_imgs = document.querySelectorAll('.img-item img');
						// console.log(small_imgs);

						small_imgs.forEach((imgItem) => {
							imgItem.addEventListener('click', (event) => {
									console.log("click small img")
									event.preventDefault();
									now_img.src = imgItem.src;
							});
						});

						//Chuyen tab chuyen noi dung tab trong khung mo ta thong tin chi tiet cua san pham
						const $ = document.querySelector.bind(document);
						const $$ = document.querySelectorAll.bind(document);

						const tabs = $$('.tab_item');
						const panes = $$('.info_pro-item');
						// console.log(tabs,panes);
						
						//Lang nghe su kien tren cac tabs
						tabs.forEach((tab,index) => {
							// console.log(tab,index);

							const pane = panes[index];

							tab.onclick = function (){
								//Kiem tra tab nào đang có 'active' thì bỏ 'active' đi
								$('.tab_item.active').classList.remove('active');
								$('.info_pro-item.active').classList.remove('active');

								this.classList.add('active');
								pane.classList.add('active');

								// console.log(pane);
							}
						})


          });
        })
  
        .then(() => {
            //Close Popup
						const closePopup = document.querySelector('.close_popup');
						console.log(closePopup);
						closePopup.addEventListener('click', function(){
							const popupImgProduct = document.querySelector('.popup_product_image');
							popupImgProduct.style.display = "none";
						});
						//Chọn ảnh hiển thị - Popup product
						const popup_now_img = document.querySelector('.popup_product_image_col_left img');
						const popup_small_imgs = document.querySelectorAll('.popup_item_img img');
						popup_small_imgs.forEach((imgItem) => {
							imgItem.addEventListener('click', (event) => {
									console.log("click small img popup")
									event.preventDefault();
									popup_now_img.src = imgItem.src;
							});
						});

          var inputQuantity = document.querySelectorAll(".cart_quantity");
          //Kiem tra tu dau

          //Bật vô hiệu hóa - nếu <= 1 
          disableMinus(inputQuantity);
  
          //Bật vô hiệu hóa + nếu đã hơn số lượng hàng tồn kho
					// disablePlus(apiProduct,inputQuantity); //Không vô hiệu hóa nữa
          //Bởi vì: Việc này giúp admin biết được sản phẩm nào khách hàng đang muốn mua mà mình lại không có sản phẩm để đáp ứng
          //Điều này giúp nâng cao chất lượng phục vụ khách hàng

					// Thao tac cua nut cong
          $(document).on("click", ".cart-btn-cong", function (event) {
            var row_id = $(this).attr("id");
            var a = "#" + row_id;
            $(a + "+input").val(Number($(a + "+input").val()) + 1);
            var quantityNow = event.target.parentElement.querySelector(".cart_quantity");

            //Tắt vô hiệu hóa nút - nếu số lượng > 1;
            if (quantityNow.value > 1) {
              let buttonTru = event.target.parentElement.querySelector(".cart-btn-tru");
              buttonTru.disabled = false;
            }

            //Bật vô hiệu hóa + nếu đã hơn số lượng hàng tồn kho
						// disablePlus(apiProduct,quantityNow); //Không vô hiệu hóa nữa (Lý do ở trên)
           
          });

					//Thao tac cua nut tru
          $(document).on("click", ".cart-btn-tru", function (event) {
            var row_id = $(this).attr("id");
            var a = "#" + row_id;
            var tru = event.target;
            $(a + "+input").val(Number($(a + "+input").val()) - 1);
            let quantityAfter = tru.parentElement.querySelector(".cart_quantity");
            var quantityNow = event.target.parentElement.querySelector(".cart_quantity");
  
            // Bật vô hiệu hóa - nếu quantity = 1;
						disableMinus(quantityAfter);
  
            //Tắt vô hiệu hóa + nếu đã ít hơn số lượng hàng tồn kho
            // fetch(apiProduct)
            //   .then((res) => res.json())
            //   .then((dataCart) => {
            //     dataCart.forEach((element) => {
            //       if (element["soluongtonkho"] > quantityNow.value) {
            //         let buttonCong = event.target.parentElement.querySelector(".cart-btn-cong");
            //         buttonCong.disabled = false;
            //       }
            //     });
            //   }); //Không vô hiệu hóa nữa (Lý do ở trên)
          });
  
          //Xét điều kiện khi nhập số lượng
          var inputQuantity = document.querySelector(".cart_quantity");
          inputQuantity.addEventListener("input", function (event) {
            window.setTimeout(function () {
              var nowQuantity = inputQuantity.value;
              var maxQuantity = inputQuantity.max;
              if (nowQuantity == "" || nowQuantity == NaN) {
                inputQuantity.value = 0;
              } 
							else if (nowQuantity > 0) {
                if (inputQuantity.value.length > 1) {
                  inputQuantity.value = parseInt(inputQuantity.value);
                }
              }
              if (nowQuantity > 0) {
                if (inputQuantity.value.length > 1) {
                  inputQuantity.value = parseInt(inputQuantity.value);
                }
              }

              //Không vô hiệu hóa nữa (Lý do ở trên)
              // var nowQuantitySS = parseInt(nowQuantity);
              // var maxQuantitySS = parseInt(maxQuantity);
              // if (nowQuantitySS >= maxQuantitySS) {
              //   inputQuantity.value = maxQuantity;
              //   inputQuantity.parentElement.querySelector(".cart-btn-cong").disabled = true; //Vo hieu hoa
              // } else {
              //   inputQuantity.parentElement.querySelector(".cart-btn-cong").disabled = false; //Tat Vo hieu hoa
              // }

              if (nowQuantity <= 1) {
                inputQuantity.parentElement.querySelector(".cart-btn-tru").disabled = true; //Vo hieu hoa
              } else {
                inputQuantity.parentElement.querySelector(".cart-btn-tru").disabled = false; //Tat Vo hieu hoa
              }
            }, 1);
          });
  
					//Xử lý trường hợp khi số lượng được nhập vào là 0 thì sau đó - sẽ được mặc định là 1
          inputQuantity.addEventListener("blur", function (event) {
            if (event.target.value == 0) {
              event.target.value = 1;
            }
          });
        });
    }

		// Thêm sản phẩm vào giỏ hàng 
		// Nếu đã có tài khoản thì tiến hành thêm sản phẩm vào DB
		// Ngược lại thì chuyển đến trang Login
		let tokenUser = localStorage.getItem("token")? localStorage.getItem("token"): [];
		// console.log(apiProduct);

    $(document).on("click", ".button_Add_detail", function () {
        if (tokenUser != undefined && tokenUser.length != 0){
					var row_id = document.querySelector(".cart_quantity").id;
					var row_title = document.querySelector(".tieude_detal-p").innerHTML;
            console.log(row_id);
            console.log(row_title);
            var row_price = 0;
            var row_quantity = 0;
            var row_thumbnail = "";
            var row_inventory_num = 0;

            //Tìm thông tin sản phẩm đã được thêm vào
						console.log(apiProduct);
            fetch(apiProduct)
            .then((res) => res.json())
            .then((dataProduct) => {
                dataProduct.forEach((element) => {
									console.log(element["sanphamID"]);
									console.log(row_id);
                    if (element["sanphamID"] == row_id) {
                        row_title = element["tensanpham"];
                        console.log(row_title);
                        row_price = element["gia"];
                        console.log(row_price);
                        row_thumbnail = element["hinhanh"];
                        console.log(row_thumbnail);
                        row_inventory_num = element["soluongtonkho"];
                        console.log(row_inventory_num);
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
																				console.log(dataCart[i]);
																				console.log("Sản phẩm đã tồn tại trong giỏ hàng");
                                        check = 1; //Tang them 1 cho so luong SP da ton tai trong gio hang
                                        row_quantity = parseInt(dataCart[i].so_luong_sp) + Number(document.querySelector(".cart_quantity").value);
																				console.log(row_quantity);

                                        // Tiến hành thêm vào DB
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
                                                    showToast("Error", "error",`Thêm ${row_title} không thành công.`,2000);
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
																		console.log("Sản phẩm chưa có trong giỏ hàng");

																		//Cần tìm số lượng sản phẩm cần thêm vào
                                    var product_quantity_for_insert = Number(document.querySelector(".cart_quantity").value);
																		console.log(product_quantity_for_insert);
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
                        showToast( "Error","error",`Thêm ${row_title} không thành công.`,2000 );
                    },
                });
            })
        }
        else{
            window.location = "http://127.0.0.1/Daily/Account/Login";
        }
    })

});
  
  /* Function tạo id ngẫu nhiên */
  function MakeId(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  
	//Hàm định dạng formatCash 
  function formatCash(str) {
    return str 
		.toString()
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
        });
}

	// Hàm bật vô hiệu hóa - nếu <= 1 
	function disableMinus(inputQuantity){
		if (inputQuantity.value <= 1) {
			let buttonTru = inputQuantity.parentElement.querySelector(".cart-btn-tru");
			buttonTru.disabled = true;
		}
	}

	// Hàm bật vô hiệu hóa + nếu đã hơn số lượng hàng tồn kho
	function disablePlus(apiProduct,inputQuantity){
		fetch(apiProduct)
			.then((res) => res.json()) 
			.then((dataCart) => {
				dataCart.forEach((data) => {
					if (data["soluongtonkho"] <= inputQuantity.value) {
						let buttonCong = inputQuantity.parentElement.querySelector(".cart-btn-cong");
						buttonCong.disabled = true;
					}
				});
			});
	}

	//Thêm POPUP khi click vào hình ảnh để người dùng xem hình ảnh dễ dàng
	function showPopup(event){
		console.log("POPUP");
		console.log(event);
		const popupImgProduct = document.querySelector('.popup_product_image');
		popupImgProduct.style.display = "block";
	}
