let apiLoaisanpham = `http://127.0.0.1/Daily/api/loaisanpham`;
let apiDanhmuc = `http://127.0.0.1/Daily/api/danhmuc`;
let apiSPNoiBat = `http://127.0.0.1/Daily/api/sanphamnoibat`;

let dataLoaisanpham = fetch(apiLoaisanpham)
    .then((res) => res.json())
    .then((dataLoaisanpham) => {
        return dataLoaisanpham;
    })
    .then((dataLoaisanpham) => {
        let dataDanhmuc = fetch(apiDanhmuc)
            .then((res) => res.json())
            .then((dataDanhmuc) => {
                const featuredDanhmuc = dataDanhmuc.filter((dataFilter) =>{
                    return dataFilter.featured = 1;
                });

                const loaisanphamFilter = [];
                dataLoaisanpham.forEach((loaisanpham) => {
                    const data = dataDanhmuc.filter(
                        (danhmuc) => Number(danhmuc.loaiID) === Number(loaisanpham.loaiID)
                    );

                    loaisanphamFilter.push({
                        lsp_id: loaisanpham.loaiID,
                        lsp_ten: loaisanpham.ten,
                        lsp_anh: loaisanpham.anh,

                        danhmuc: data,
                    });
                });
                const container = document.querySelector(".container");
                let content = ``;

                document.querySelector(".product-list-content").innerHTML = loaisanphamFilter
                .map((loaisanpham) =>
                    loaisanpham.danhmuc.length
                    ? content = `<div class="product-list-item">
                            <div class="product-list-item-main">
                                <a data='cate-${loaisanpham.lsp_id}' class='cate-title-item'>
                                    <i class="fa-solid fa-circle-chevron-right"></i>
                                    ${loaisanpham.lsp_ten}
                                </a>
                            </div>
                            <div class='list-danhmuc list-danhmuc-${loaisanpham.lsp_id}' id="">
                            </div>
                        </div>`
                    : ""
                )
                .join("");
                
                loaisanphamFilter
                .map((data) => {
                    let content = ``;
                    let count = 0;
                    return data.danhmuc.length
                    ? `${data.danhmuc
                        .map((dmuc) => {
                            count ++;
                            content += `
                            <div class="product-danhmuc">
                                <a style="text-decoration: none;" href="http://127.0.0.1/Daily/Product/danhmucsanpham/${dmuc["loaiID"]}/${dmuc["danhmucID"]}">
                                <div class="product-danhmuc-name">
                                    ${dmuc["ten"]}
                                </div></a>
                            </div>
                            `;
                            if (count == data.danhmuc.length){
                                document.querySelector(`.list-danhmuc-${dmuc["loaiID"]}`).innerHTML = content;   
                                return content;
                            }
                        })
                        .join("")}`                    
                    : "";
                })
                .join("");
            })
    });

let dataSPNoiBat = fetch(apiSPNoiBat)
.then((res) => res.json())
.then((dataSPNoiBat) => {
    let content = ``;
    dataSPNoiBat.forEach((data)=>{
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
                <div class="product-content-price">${formatCash((data.gia).toString())}đ</div>`;
            // if (data.soluongtonkho == 0) {
            //     content += ` <button class="product-content-button-oof" disabled=true style="
            //                     transition: background-color 0.3s ease;border: none; color: var(--background-color);
            //                     text-transform: uppercase;font-weight: 600;
            //                     padding: 5%;
            //                     font-size: 13px;
            //                     background-color: var(--color-button);">
            //                     Hết hàng 
            //                     </button>`;
            // } else {
                content += `<button class="product-content-button" id="${data.sanphamID}" value="${data.tensanpham}">
                    Thêm vào giỏ
                </button>`;
            // }
            content +=`
            </div>
        </article>
        `;
    })
    document.querySelector(".products-noibat").innerHTML += content;
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
                        showToast("Error","error",`Thêm ${row_title} không thành công.`,2000);
                    },
                });
            })
        }
        else{
            window.location = "http://127.0.0.1/Daily/Account/Login";
        }
    })
});

// BỘ LỌC

$(document).on("click", ".filter-item__title", function (event) {
document.querySelector(".filter-show").style.display = "block";
});

$(document).on("click", ".close-popup-total", function (event) {
document.querySelector(".filter-show").style.display = "none";
});
let filterPrice = document.querySelectorAll(".filterPrice");
filterPrice.forEach((elevent)=>{
    elevent.addEventListener("input", function(){
        console.log("Truoc: " + this.value);
        this.value = formatCash(returnformatCash(this.value));
        console.log("Sau: " + this.value);
    });
})

const searchCategoryInput = $("#search-category-input");
searchCategoryInput.select2();

searchCategoryInput.on("select2:select", function (evt) {
  var element = evt.params.data.element;
  var $element = $(element);

  $element.detach();
  $(this).append($element);
  $(this).trigger("change");
});

var content = `
    <option id="ca-all" value="99999">
        TẤT CẢ
    </option>`;

var lengthDataLoaiSanPham = 0;

let dataLoaiSanPham = fetch(apiLoaisanpham)
.then((res) => res.json())
.then((dataLoaiSanPham) => {
    lengthDataLoaiSanPham = dataLoaiSanPham.length;

    dataLoaiSanPham.forEach((element, index) => {
    content += `
        <option id="ca-${index}" value="${element["loaiID"]}">
            ${element["ten"]}
        </option>`;
    });

    document.querySelector("#search-category-input").innerHTML += content;
});



$(document).on("click", ".search-product-btn", function (event) {
    console.log("Tim Kiem");
    let filterNumber = 0; //So filter được chọn trong bộ lọc
    var valueChooseOption = document.querySelector("#search-category-input").value;
    var minPrice = returnformatCash(document.querySelector(".price_from").value);
    var maxPrice = returnformatCash(document.querySelector(".price_to").value);
    console.log(minPrice);
    console.log(maxPrice);

    if (valueChooseOption != 0 || minPrice != "" || maxPrice != "") {
        var a = $("#search-category-input").select2("val");
        console.log(a);
        let quantityProductSearch = 0; //Số lượng sản phẩm được tìm ra sau khi lọc bằng bộ lọc
        //Tim kiem theo option da chon
        let dataLoaiSanPhamS = fetch(apiLoaisanpham)
            .then((res) => res.json())
            .then((dataLoaiSanPhamS) => {
                if (valueChooseOption != "") {
                    if (a.includes("99999")) {
                        return dataLoaiSanPhamS;
                    } else {
                    var dataCategoryNew = [];

                    for (var j = 0; j < a.length; j++) {
                        for (var i = 0; i < dataLoaiSanPhamS.length; i++) {
                            if (dataLoaiSanPhamS[i]["loaiID"] == a[j]) {
                                dataCategoryNew.push(dataLoaiSanPhamS[i]);
                            }
                        }
                    }
                        return dataCategoryNew;
                    }
                } else {
                    return dataLoaiSanPhamS;
                }
            })

        .then((dataLoaiSanPhamS) => {
            let dataProductS = fetch(apiSPNoiBat)
            .then((res) => res.json())

            .then((dataProductS) => {
                const categoryFilter = [];
                dataLoaiSanPhamS.forEach((category) => {
                    const data = dataProductS.filter(function (product) {
                        filterNumber = 0;
                        var priceNow = Math.floor(product["gia"]);
                        if (minPrice != "" && maxPrice != "") {
                            filterNumber += 1;
                            return (
                                Number(product.loaiID) === Number(category.loaiID) &&
                                priceNow >= minPrice && priceNow <= maxPrice
                            );
                        } else if (minPrice != "" && maxPrice == ""){ //có min không có max
                            filterNumber += 1;
                            return (
                                Number(product.loaiID) === Number(category.loaiID) &&
                                priceNow >= minPrice
                            );
                        } else if (minPrice == "" && maxPrice != ""){ //có max không có min
                            filterNumber += 1;
                            return (
                                Number(product.loaiID) === Number(category.loaiID) &&
                                priceNow >= 0 && priceNow <= maxPrice
                            );
                        }
                        else {
                            return Number(product.loaiID) === Number(category.loaiID);
                        }
                    });

                    categoryFilter.push({
                        category_id: category.loaiID,
                        category_name: category.ten,
                        products: data,
                    });
                    console.log(filterNumber);
                    if (a.length != 0){  // a = $("#search-category-input").select2("val");
                        console.log(a);
                        filterNumber += categoryFilter.length;
                    }
                    console.log(categoryFilter);
                    
                });

                const contents = categoryFilter
                    .map((data) => {
                        return `
                        ${data.products
                        .map((product) => {
                            quantityProductSearch += 1;
                            let content = `
                            <article class="product">
                                <a href="/Product/detailOfProduct/${product["sanphamID"]}">
                                    <div class="product-img">
                                        <img src="${product["hinhanh"]}?v=e5e58ae7df45" onerror="this.src='https://cdn.sstatic.net/Img/unified/sprites.svg?v=e5e58ae7df45';" alt="Stack Overflow logo and icons and such">
                                    </div>
                                </a>`;

                            content += `
                            <div class="product-content">
                                <a href="/Product/detailOfProduct/${product["sanphamID"]}"><div class="product-content-name">${product["tensanpham"]}</div></a>
                                <div class="product-content-price">${formatCash(Math.floor(product["gia"]).toString())}đ</div>`;

                            if (product["soluongtonkho"] == 0) {
                            content += `  <button class="product-content-button-oof" disabled=true >
                                                Hết hàng 
                                            </button>`;
                            } else {
                            content += `<button class="product-content-button"  id="${product["sanphamID"]}" value="${product["sanphamID"]}">
                                            Thêm vào giỏ
                                        </button>`;
                            }
                            content += `</div>
                                </article>`;
                            return content;
                            })
                            .join("")}
                        </section>`;
                    })
                    .join("");
                    let productAll = document.querySelectorAll(".products-noibat");
                    let afterContent = `
                        <div class="product-title">
                            <div class="product-title-content" id="">Sản phẩm nổi bật (${quantityProductSearch} sản phẩm) </div>
                        </div>
                    `;
                    document.querySelector(".products-noibat").innerHTML = afterContent;
                    document.querySelector(".products-noibat").innerHTML += contents;
                })
                .then(() => {
                    document.querySelector("#wrapper-search").style.display = "none";
                })
                .then(()=>{
                    let boxFilterNumber = document.querySelector(".count-total");
                    if (filterNumber != 0){
                        boxFilterNumber.innerHTML = filterNumber;
                        boxFilterNumber.style.display = "inline";
                    }
                    else if (filterNumber == 0){
                        boxFilterNumber.innerHTML = 0;
                        boxFilterNumber.style.display = "none";
                    }
                });
            });
    }
  });
