$(document).ready(function () {

    //Background color of Nav
    let navAction = document.querySelectorAll(".Account__StyleNav li a");
    navAction[4].classList.add("is-active");

    //Chuyen tab chuyen noi dung tab trong khung cac loai don hang
    const tabs = document.querySelectorAll('.styles__Tab_title');
    const panes = document.querySelectorAll('.styles__Tab_Info');
    // console.log(tabs,panes);
    
    //Lang nghe su kien tren cac tabs
    tabs.forEach((tab,index) => {
        const pane = panes[index];
        tab.onclick = function (){
            //Kiem tra tab nào đang có 'active' thì bỏ 'active' đi
            document.querySelector('.styles__Tab_title.active').classList.remove('active');
            document.querySelector('.styles__Tab_Info.active').classList.remove('active');

            this.classList.add('active');
            pane.classList.add('active');
        }
    })

    let token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : [];
    
    if (token != undefined && token.length != 0) {
        $.ajax({
            type:"POST",
            url: "http://127.0.0.1/Daily/Account/CheckTokenUserOrder",
            data:{token:token},
            success: function(data){
                if (data != "0"){
                    var user_id_json = JSON.parse(data);
                    var user_id = parseInt(user_id_json);
                    console.log(user_id);

                    //Them data don_dat_hang vao TAT CA DON HANG
                    let all_order = document.querySelector('.styles__StyledOrder_All');
                    console.log(all_order);

                    let apiallOrderOfUser = `http://127.0.0.1/Daily/api/AllOrderOfUser/${user_id}`;
                    let dataAllOrderOfUser = fetch(apiallOrderOfUser)
                    .then((res) => res.json())
                    .then((dataAllOrder) => {
                        return dataAllOrder;
                    })
                    .then((dataAllOrder) => {
                        console.log(dataAllOrder);

                        let content1 = "";
                        for (let i=0; i< dataAllOrder.length; i++){
                            if (parseInt(dataAllOrder[i]["tt_xac_nhan"]) == 1){
                                content1 += `
                                <div color="#808089" class="styles__OrderHeader">
                                    <span class="main-status">Đã giao</span>
                                </div>
                                `;

                                if (dataAllOrder[i]["orders_detail"].length != 0){
                                    content1 += `
                                    <div class="styles__StyledOrderInfo">
                                    <table class="table table-bordered">
                                        <tbody class="thongtinsanpam_xacnhandon">
                                    `;
                                
                                    for (let j=0; j< dataAllOrder[i]["orders_detail"].length; j++){
                                        console.log(dataAllOrder[i]["orders_detail"][j]);
                                        content1 += `
                                        <tr>
                                            <td>${j+1}</td>
                                            <td class="cothinh_xacnhandon"><img src="http://127.0.0.1/Daily/${dataAllOrder[i]["orders_detail"][j]["hinhanh"]}" alt=""></td>
                                            <td style="width:50%;">${dataAllOrder[i]["orders_detail"][j]["tensanpham"]} </td>
                                            <td class="sss"> ${dataAllOrder[i]["orders_detail"][j]["so_luong"]} </td>
                                            <td class="eee">${dataAllOrder[i]["orders_detail"][j]["gia"]} <sup><u>đ</u></sup> </td>
                                        </tr>
                                        `;
                                    }
                                    content1 += `
                                            <tr class="thanhtien_xnhandon">
                                            <td colspan="4"><b style="color: rgb(128, 128, 137);">Tổng Tiền :</b></td>
                                            <td class="ttien_xnhandon"><b> ${dataAllOrder[i]["tong_don_gia"]} <sup><u>đ</u></sup></b></td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                                    `;
                                }
                            }
                            else if (parseInt(dataAllOrder[i]["tt_xac_nhan"]) == 0){
                                content1 += `
                                <div color="#808089" class="styles__OrderHeader">
                                    <span class="main-status">Đang xử lý</span>
                                </div>
                                `;

                                if (dataAllOrder[i]["orders_detail"].length != 0){
                                    content1 += `
                                    <div class="styles__StyledOrderInfo">
                                    <table class="table table-bordered">
                                        <tbody class="thongtinsanpam_xacnhandon">
                                    `;
                                
                                    for (let j=0; j< dataAllOrder[i]["orders_detail"].length; j++){
                                        console.log(dataAllOrder[i]["orders_detail"][j]);
                                        content1 += `
                                        <tr>
                                            <td>${j+1}</td>
                                            <td class="cothinh_xacnhandon"><img src="http://127.0.0.1/Daily/${dataAllOrder[i]["orders_detail"][j]["hinhanh"]}" alt=""></td>
                                            <td style="width:50%;">${dataAllOrder[i]["orders_detail"][j]["tensanpham"]} </td>
                                            <td class="sss"> ${dataAllOrder[i]["orders_detail"][j]["so_luong"]} </td>
                                            <td class="eee">${dataAllOrder[i]["orders_detail"][j]["gia"]} <sup><u>đ</u></sup> </td>
                                        </tr>
                                        `;
                                    }
                                    content1 += `
                                            <tr class="thanhtien_xnhandon">
                                            <td colspan="4"><b style="color: rgb(128, 128, 137);">Tổng Tiền :</b></td>
                                            <td class="ttien_xnhandon"><b> ${dataAllOrder[i]["tong_don_gia"]} <sup><u>đ</u></sup></b></td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                                    `;
                                }
                            }
                        }
                        all_order.innerHTML = content1;
                        //END Them data don_dat_hang vao TAT CA DON HANG

                        //Them vao DANG XU LY
                        let ddh_dxl = document.querySelector('.styles__StyledOrder_DXL');
                        let content2 = "";
                        for (let i=0; i< dataAllOrder.length; i++){
                            if (parseInt(dataAllOrder[i]["tt_xac_nhan"]) == 0){
                                content2 += `
                                <div color="#808089" class="styles__OrderHeader">
                                    <span class="main-status">Đang xử lý</span>
                                </div>
                                `;

                                if (dataAllOrder[i]["orders_detail"].length != 0){
                                    content2 += `
                                    <div class="styles__StyledOrderInfo">
                                    <table class="table table-bordered">
                                        <tbody class="thongtinsanpam_xacnhandon">
                                    `;
                                
                                    for (let j=0; j< dataAllOrder[i]["orders_detail"].length; j++){
                                        console.log(dataAllOrder[i]["orders_detail"][j]);
                                        content2 += `
                                        <tr>
                                            <td>${j+1}</td>
                                            <td class="cothinh_xacnhandon"><img src="http://127.0.0.1/Daily/${dataAllOrder[i]["orders_detail"][j]["hinhanh"]}" alt=""></td>
                                            <td style="width:50%;">${dataAllOrder[i]["orders_detail"][j]["tensanpham"]} </td>
                                            <td class="sss"> ${dataAllOrder[i]["orders_detail"][j]["so_luong"]} </td>
                                            <td class="eee">${dataAllOrder[i]["orders_detail"][j]["gia"]} <sup><u>đ</u></sup> </td>
                                        </tr>
                                        `;
                                    }
                                    content2 += `
                                            <tr class="thanhtien_xnhandon">
                                            <td colspan="4"><b style="color: rgb(128, 128, 137);">Tổng Tiền :</b></td>
                                            <td class="ttien_xnhandon"><b> ${dataAllOrder[i]["tong_don_gia"]} <sup><u>đ</u></sup></b></td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                                    `;
                                }
                            }
                        }
                        ddh_dxl.innerHTML = content2;
                        //END Them vao DANG XU LY

                        //Them vao DA GIAO
                        let ddh_dg = document.querySelector('.styles__StyledOrder_DG');
                        let content3 = "";
                        for (let i=0; i< dataAllOrder.length; i++){
                            if (parseInt(dataAllOrder[i]["tt_xac_nhan"]) == 1){
                                content3 += `
                                <div color="#808089" class="styles__OrderHeader">
                                    <span class="main-status">Đã giao</span>
                                </div>
                                `;

                                if (dataAllOrder[i]["orders_detail"].length != 0){
                                    content3 += `
                                    <div class="styles__StyledOrderInfo">
                                    <table class="table table-bordered">
                                        <tbody class="thongtinsanpam_xacnhandon">
                                    `;
                                
                                    for (let j=0; j< dataAllOrder[i]["orders_detail"].length; j++){
                                        console.log(dataAllOrder[i]["orders_detail"][j]);
                                        content3 += `
                                        <tr>
                                            <td>${j+1}</td>
                                            <td class="cothinh_xacnhandon"><img src="http://127.0.0.1/Daily/${dataAllOrder[i]["orders_detail"][j]["hinhanh"]}" alt=""></td>
                                            <td style="width:50%;">${dataAllOrder[i]["orders_detail"][j]["tensanpham"]} </td>
                                            <td class="sss"> ${dataAllOrder[i]["orders_detail"][j]["so_luong"]} </td>
                                            <td class="eee">${dataAllOrder[i]["orders_detail"][j]["gia"]} <sup><u>đ</u></sup> </td>
                                        </tr>
                                        `;
                                    }
                                    content3 += `
                                            <tr class="thanhtien_xnhandon">
                                            <td colspan="4"><b style="color: rgb(128, 128, 137);">Tổng Tiền :</b></td>
                                            <td class="ttien_xnhandon"><b> ${dataAllOrder[i]["tong_don_gia"]} <sup><u>đ</u></sup></b></td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                                    `;
                                }
                            }
                        }
                        ddh_dg.innerHTML = content3;
                        //END Them vao DA GIAO
                    });                
                }
            },
            error: function(data){
                console.log('Loi');
            }
        });
    }
});