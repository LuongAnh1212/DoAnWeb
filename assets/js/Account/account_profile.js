let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){

    //Lấy  id_Khach_hang
    var urlSearch = document.URL;
    const uList = urlSearch.split("/");
    const id_khach_hang = uList[uList.length - 1];

    console.log(id_khach_hang);

    let apiAcUserByID = `http://127.0.0.1/Daily/api/UserByID/${id_khach_hang}`;
    let dataUser = fetch(apiAcUserByID)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        // Box Image-Avatar
        if (data[0].anh_bia != undefined && data[0].anh_bia != null && (data[0].anh_bia.trim()).length != 0){
            document.querySelector(".account_avatar").src = "http://127.0.0.1/Daily/" + data[0]["anh_bia"];
        }

        document.getElementById("ten_nguoi_dung").innerHTML = data[0]["ho_ten"];
        document.getElementById("ho_ten").innerHTML = data[0]["ho_ten"];
        document.getElementById("so_dt").innerHTML = data[0]["so_dien_thoai"];
        document.getElementById("email").innerHTML = data[0]["email"];
        document.getElementById("dia_chi").innerHTML = data[0]["dia_chi"];

        if (data[0].ngay_sinh != undefined && data[0].ngay_sinh != null && (data[0].ngay_sinh.trim()).length != 0){
            document.getElementById("ngay_sinh").innerHTML = data[0]["ngay_sinh"];
        }

        if (data[0].gioi_tinh != undefined && data[0].gioi_tinh != null && (data[0].gioi_tinh.trim()).length != 0){
            if (data[0].gioi_tinh == "female"){
                document.getElementById("gioi_tinh").innerHTML = "Nữ";
            }
            else if (data[0].gioi_tinh == "male"){
            document.getElementById("gioi_tinh").innerHTML = "Nam";
            }
            else if (data[0].gioi_tinh == "other"){
                document.getElementById("gioi_tinh").innerHTML = "Khác";
            }
        }
        if (data[0].cap_nhat_gan_nhat != undefined && data[0].cap_nhat_gan_nhat != null && (data[0].cap_nhat_gan_nhat.trim()).length != 0){
            document.getElementById("Lan_truy_cap_gan_nhat").innerHTML = data[0]["cap_nhat_gan_nhat"];
        }

        if (data[0].trang_thai != undefined && data[0].trang_thai != null){
            if (data[0].trang_thai == 1){
                document.getElementById("trang_thai").innerHTML = "Khách hàng đã kích hoạt tài khoản";
            }
            else if (data[0].trang_thai == 0){
            document.getElementById("trang_thai").innerHTML = "Khách hàng chưa kích hoạt tài khoản";
            }
        }
        if (data[0].delete_au != undefined && data[0].delete_au != null){
            console.log(data[0].delete_au);
            if (data[0].delete_au == 1){
                document.querySelector(".btn_Khoa_TK").innerHTML = "Mở tài khoản";
                document.querySelector(".btn_Khoa_TK").id = data[0].delete_au;
                document.getElementById("tinh_trang_TK").innerHTML = "Tài khoản đang bị khóa";
            }
            else if (data[0].delete_au == 0){
                document.querySelector(".btn_Khoa_TK").innerHTML = "Khóa tài khoản";
                document.querySelector(".btn_Khoa_TK").id = data[0].delete_au;
            }
        }
    }).then((data)=>{
        $(document).on("click", ".btn_Khoa_TK", function (event) {
            var delete_au = document.querySelector(".btn_Khoa_TK").id;
            if (delete_au == 0){
                tools__.confirm("show", "Bạn có muốn Khóa Tài khoản này?", () => {
                    $.ajax({
                        url: "http://127.0.0.1/Daily/Admin/deleteAU",
                        type: "POST",
                        data: { //Nhớ token
                            idAU: id_khach_hang
                        },
                        success: function (data) {
                            console.log(data);
                            showToast('Complete', 'success', 'Khóa thành công.', 2000);
                            document.querySelector(".btn_Khoa_TK").innerHTML = "Mở tài khoản";
                            document.querySelector(".btn_Khoa_TK").id = 1;
                            document.getElementById("tinh_trang_TK").innerHTML = "Tài khoản đang bị khóa";
                            tools__.displayOpacity("hidden");
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
                            idAU: id_khach_hang
                        },
                        success: function (data) {
                            console.log(data);
                            showToast('Complete', 'success', 'Mở thành công.', 2000);
                            document.querySelector(".btn_Khoa_TK").innerHTML = "Khóa tài khoản";
                            document.querySelector(".btn_Khoa_TK").id = 0;
                            document.getElementById("tinh_trang_TK").innerHTML = "Người dùng";
                            tools__.displayOpacity("hidden");
                        },
                        error: function (data) {
                            showToast("Error", "error", "Có lỗi xãy ra.", 2000);
                            tools__.displayOpacity("hidden");
                        },
                    });
                });
            }
        });
    });
}
else{
    window.location.replace("http://127.0.0.1/Daily/Admin");
}
