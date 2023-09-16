// Kiểm tra tokenAD
let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){
    let apiUsers = `http://127.0.0.1/Daily/api/Users`;
    var content = ``;

    let dataUsers = fetch(apiUsers)
    .then((res) => res.json())
    .then((dataUsers) => {
        var stt = 0;
        dataUsers.forEach((data)=>{
                stt++;
                content += `
                <tr>
                    <td class="align-middle text-center text-sm">${stt}</td>
                    <td>
                        <div class="d-flex px-2 py-1">`;
                    if (data["anh_bia"] != null && data["anh_bia"].trim() != "") {
                        content += `   
                            <div><img src="http://127.0.0.1/Daily/${data["anh_bia"]}" class="avatar avatar-sm me-3 border-radius-lg" alt="Avatar"></div>`;
                    }
                content += `
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${data["ho_ten"]}</h6>
                            </div>
                        </div>
                    </td>
                    
                    <td class="align-middle">
                        <span class="text-secondary text-xs font-weight-bold">${data["email"]}</span>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data["so_dien_thoai"]}</span>
                    </td>`;
                if (data["trang_thai"] == 1){
                content +=` 
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">Đã kích hoạt</span>
                    </td>`;
                }
                else {
                content +=`
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-secondary">Chưa kích hoạt</span>
                    </td>`;
                }
                if (data["delete_au"] == 1){
                    content +=` 
                        <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-secondary">Đã Khóa</span>
                        </td>`;
                    }
                    else {
                    content +=`
                        <td class="align-middle text-center text-sm">
                            <span class="badge badge-sm bg-gradient-success">Đang hoạt động</span>
                        </td>`;
                    }
                content +=`
                    <td class="text-center align-middle" id="${data["delete_au"]}">
                        <a href="javascript:" class="text-secondary font-weight-bold text-xs detail_account" id="${data["khach_hang_id"]}" data-toggle="tooltip" data-original-title="Datail">Detail</a>
                        |
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_au" id="${data["khach_hang_id"]}" data-toggle="tooltip" data-original-title="Edit">Edit</a>
                        | 
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_au" id="${data["khach_hang_id"]}" data-toggle="tooltip" data-original-title="Delete">Delete</a>
                    </td>
                </tr>
                `;
        });
        document.querySelector(".box-user").innerHTML = content;
    })
    .then(()=>{
       //2.1. Mở box Edit - Và lấy Database của LSP cần Edit
       $(document).on("click", ".edit_au", function (event) {
        var id_AU = event.target.parentElement.id;
        var row_id = $(this).attr("id");
        console.log(id_AU);
        console.log(`Click Edit id = ${row_id}`);

        let apiUserByID = `http://127.0.0.1/Daily/api/UserByID/${row_id}`;
        fetch(apiUserByID)
            .then((res) => res.json())
            .then((dataUserByID) => {
                console.log(dataUserByID);
                dataUserByID.forEach((data)=>{
                    console.log(data);
                    document.getElementById("edit_tenAU").value = data["ho_ten"];
                    document.getElementById("edit_id_AU").value = data["khach_hang_id"];

                    document.getElementById("email").value = data["email"];
                    document.getElementById("phone").value = data["so_dien_thoai"];
                    document.getElementById("dia_chi").value = data["dia_chi"];

                    if (data.ngay_sinh != undefined && data.ngay_sinh != null && (data.ngay_sinh.trim()).length != 0){
                        const myArray = data.ngay_sinh.split("-");
                        document.querySelector(".day").value = parseInt(myArray[2]);
                        document.querySelector(".month").value = parseInt(myArray[1]);
                        document.querySelector(".year").value = parseInt(myArray[0]);
                    }
                    else{
                        document.querySelector(".day").value = 0;
                        document.querySelector(".month").value = 0;
                        document.querySelector(".year").value = 0;
                    }
                    if (data.gioi_tinh != undefined && data.gioi_tinh != null && (data.gioi_tinh.trim()).length != 0){
                        var getGenderValue = document.querySelectorAll('input[name="gender"]');   
                        getGenderValue.forEach(function(currentValue, index, array){
                            if(currentValue.value == data.gioi_tinh ) {   
                                currentValue.checked = "true";
                                return;
                            }  
                        })
                    }
                    else{
                        var getGenderValue = document.querySelectorAll('input[name="gender"]');  
                        getGenderValue.forEach(function(currentValue, index, array){
                            console.log(currentValue);
                            currentValue.checked = "false";
                        })
                    }

                    // Box Image
                    if (data.anh_bia != undefined && data.anh_bia != null && (data.anh_bia.trim()).length != 0){
                        document.getElementById("edit_avatar").src = "http://127.0.0.1/Daily/" + data["anh_bia"];
                    }
                    else {
                        document.getElementById("edit_avatar").src = "http://127.0.0.1/Daily/images/Product/new_product_icon.jpg";
                    }
                    document.querySelector(".edit-note-avatar-small-1").style.color= "#999";
                    document.querySelector(".edit-note-avatar-small-2").style.color= "#999";

                    // Box Trang Thai
                    var getStatusValue = document.querySelectorAll('input[name="edit_status"]');   
                    getStatusValue.forEach(function(currentValue, index, array){
                        if(currentValue.value == data.trang_thai ) {   
                            currentValue.checked = "true";
                            return;
                        }  
                    })

                    // Đặc biệt
                    document.getElementById("edit_file").value = ""; 
                })
            })
            .then(()=> {
                document.getElementById("main_popup_edit").style.display = "block";
            });
        });
    })
    .then(()=>{
        //2.x Đóng box Edit
        document.getElementById("btn_close_box_edit").addEventListener("click", function(){
            console.log("Click Close Edit");
            document.getElementById("edit_file").value = ""; // Để tránh lỗi không chọn được 1 hình liên tiếp
            document.querySelector(".edit-note-avatar-small-1").style.color= "#999";
            document.querySelector(".edit-note-avatar-small-2").style.color= "#999";

            document.getElementById("main_popup_edit").style.display = "none";
        });
    })
    .then(()=>{
        //1.5 Xóa Tài khoản người dùng
        $(document).on("click", ".delete_au", function (event) {
            var id_AU = event.target.parentElement.id;
            var row_id = $(this).attr("id");
            // console.log(id_AU);
            // console.log(row_id);
            var delete_au = event.target.parentElement.id;
            console.log(delete_au);
            if (delete_au == 0){
                tools__.confirm("show", "Bạn có muốn Khóa Tài khoản này?", () => {
                    $.ajax({
                        url: "http://127.0.0.1/Daily/Admin/deleteAU",
                        type: "POST",
                        data: { //Nhớ token
                            idAU: row_id
                        },
                        success: function (data) {
                            console.log(data);
                            showToast('Complete', 'success', 'Khóa thành công.', 2000);
                            tools__.displayOpacity("hidden");
                            //Cập nhập lại bảng loại sản phẩm
                            reloadInfomation();
                        },
                        error: function (data) {
                            showToast("Error", "error", "Có lỗi xãy ra.", 2000);
                            tools__.displayOpacity("hidden");
                        },
                    });
                });
            }
            else{
                tools__.confirm("show", "Tài khoản đang bị khóa. Bạn có muốn Mở Tài khoản này?", () => {
                    $.ajax({
                        url: "http://127.0.0.1/Daily/Admin/deleteAU",
                        type: "POST",
                        data: { //Nhớ token
                            idAU: row_id
                        },
                        success: function (data) {
                            console.log(data);
                            showToast('Complete', 'success', 'Mở thành công.', 2000);
                            tools__.displayOpacity("hidden");
                            //Cập nhập lại bảng loại sản phẩm
                            reloadInfomation();
                        },
                        error: function (data) {
                            showToast("Error", "error", "Có lỗi xãy ra.", 2000);
                            tools__.displayOpacity("hidden");
                        },
                    });
                });
            }
        });
    })
    .then(()=>{
        // Chuyen trang Profile
        $(document).on("click", ".detail_account", function (event) {
            var id_LSP = event.target.parentElement.id;
            var row_id = $(this).attr("id");
            console.log(row_id);
            window.location.href = `http://127.0.0.1/Daily/Admin/AccountProfile/${row_id}`;
        });
    });
}
else{
    window.location.replace("http://127.0.0.1/Daily/Admin");
}

//Funtion reload sau mỗi lầm Thêm, Sửa
function reloadInfomation(){
    let apiUsers = `http://127.0.0.1/Daily/api/Users`;
    var content = ``;

    let dataUsers = fetch(apiUsers)
    .then((res) => res.json())
    .then((dataUsers) => {
        var stt = 0;
        dataUsers.forEach((data)=>{
                stt++;
                content += `
                <tr>
                    <td class="align-middle text-center text-sm">${stt}</td>
                    <td>
                        <div class="d-flex px-2 py-1">`;
                    if (data["anh_bia"] != null && data["anh_bia"].trim() != "") {
                        content += `   
                            <div><img src="http://127.0.0.1/Daily/${data["anh_bia"]}" class="avatar avatar-sm me-3 border-radius-lg" alt="Avatar"></div>`;
                    }
                content += `
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${data["ho_ten"]}</h6>
                            </div>
                        </div>
                    </td>
                    
                    <td class="align-middle">
                        <span class="text-secondary text-xs font-weight-bold">${data["email"]}</span>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data["so_dien_thoai"]}</span>
                    </td>`;
                if (data["trang_thai"] == 1){
                content +=` 
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">Đã kích hoạt</span>
                    </td>`;
                }
                else {
                content +=`
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-secondary">Chưa kích hoạt</span>
                    </td>`;
                }
                if (data["delete_au"] == 1){
                    content +=` 
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-secondary">Đã Khóa</span>
                    </td>`;
                }
                else {
                content +=`
                    <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">Đang hoạt động</span>
                    </td>`;
                }
                content +=`
                    <td class="text-center align-middle" id="${data["delete_au"]}">
                        <a href="http://127.0.0.1/Daily/Admin/AccountProfile" class="text-secondary font-weight-bold text-xs" id="${data["khach_hang_id"]}" data-toggle="tooltip" data-original-title="Datail">Detail</a>
                        |
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_au" id="${data["khach_hang_id"]}" data-toggle="tooltip" data-original-title="Edit">Edit</a>
                        | 
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_au" id="${data["khach_hang_id"]}" data-toggle="tooltip" data-original-title="Delete">Delete</a>
                    </td>
                </tr>
                `;
        });
        document.querySelector(".box-user").innerHTML = content;
    });
}