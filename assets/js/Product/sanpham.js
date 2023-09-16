let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){
    console.log(tokenAD);
    let apiDMSP = `http://127.0.0.1/Daily/api/sanphamAD`;
    let content = ``;

    let dataSPAdmin = fetch(apiDMSP)
    .then((res) => res.json())
    .then((dataSPAdmin) => {
        console.log(dataSPAdmin);
        var stt = 0; 
        dataSPAdmin.forEach((dataSP)=>{
            stt++;
            // console.log(dataSP);
            content += `
            <tr>
                <td class="align-middle text-center text-sm">${stt}</td>
                <td>
                    <div class="d-flex px-2 py-1">`;
            if (dataSP["hinhanh"] != null && dataSP["hinhanh"].trim() != ""){
                content +=`<div><img src="http://127.0.0.1/Daily/${dataSP["hinhanh"]}" class="avatar avatar-sm me-3 border-radius-lg" alt="user1"></div>`;
            }
            content +=`        
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${dataSP["tensanpham"]}</h6>
                            <p class="text-xs text-secondary mb-0">LSP: ${dataSP["loai_san_pham"]} - DM: ${dataSP["danh_muc"]}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="text-xs font-weight-bold mb-0">${dataSP["gia"]}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <p class="text-xs font-weight-bold mb-0">${dataSP["soluongtonkho"]}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <p class="text-xs font-weight-bold mb-0">${dataSP["soluongdaban"]}</p>
                </td>`;
            if (parseInt(dataSP["noi_bat"]) == 1){
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">ON</span>
                </td>`;
            }
            else {
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-secondary">OFF</span>
                </td>`;
            }
            if (parseInt(dataSP["trang_thai"]) == 1){
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">Show</span>
                </td>`;
            }
            else{
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-secondary">Hide</span>
                </td>`;
            }
            content +=`
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${dataSP["cap_nhat_gan_nhat"]}</span>
                </td>
                <td class="text-center align-middle">
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        Detial
                    </a>
                        |
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_sp" id="${dataSP["sanphamID"]}" data-toggle="tooltip" data-original-title="Edit user">
                        Edit
                    </a>
                        | 
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_sp" id="${dataSP["sanphamID"]}" data-toggle="tooltip" data-original-title="Edit user">
                        Delete
                    </a>
                </td>
            </tr>
            `;
        });
        document.querySelector(".table-tbody-sp").innerHTML = content;
    })
    .then(()=>{
        //1. Mở box Add
        document.getElementById("btn_add_sp").addEventListener("click", function(){
            window.location.href = "http://127.0.0.1/Daily/Admin/ThemSanPham";
        });

        //2. Mở box Edit
        $(document).on("click", ".edit_sp", function (event) {
            var id_LSP = event.target.parentElement.id;
            var row_id = $(this).attr("id");
            console.log(row_id);
            window.location.href = `http://127.0.0.1/Daily/Admin/SuaSanPham/${row_id}`;
        });

        //3. Xoa SP
        $(document).on("click", ".delete_sp", function (event) {
            var id_LSP = event.target.parentElement.id;
            var row_id = $(this).attr("id");
            console.log(id_LSP);
            console.log(row_id);

            tools__.confirm("show", "Bạn có muốn xóa sản phẩm này?", () => {
                console.log(id_LSP);
                console.log(row_id);

                $.ajax({
                    url: "http://127.0.0.1/Daily/Admin/deleteSP",
                    type: "POST",
                    data: { //Nhớ token
                        idSP: row_id
                    },
                    success: function (data) {
                        console.log(data);
                        showToast('Complete', 'success', 'Xóa thành công.', 2000);
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
        });
    });
}

function reloadInfomation(){
    let apiDMSP = `http://127.0.0.1/Daily/api/sanphamAD`;
    let content = ``;

    let dataSPAdmin = fetch(apiDMSP)
    .then((res) => res.json())
    .then((dataSPAdmin) => {
        console.log(dataSPAdmin);
        var stt = 0; 
        dataSPAdmin.forEach((dataSP)=>{
            stt++;
            // console.log(dataSP);
            content += `
            <tr>
                <td class="align-middle text-center text-sm">${stt}</td>
                <td>
                    <div class="d-flex px-2 py-1">`;
            if (dataSP["hinhanh"] != null && dataSP["hinhanh"].trim() != ""){
                content +=`<div><img src="http://127.0.0.1/Daily/${dataSP["hinhanh"]}" class="avatar avatar-sm me-3 border-radius-lg" alt="user1"></div>`;
            }
            content +=`        
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${dataSP["tensanpham"]}</h6>
                            <p class="text-xs text-secondary mb-0">LSP: ${dataSP["loai_san_pham"]} - DM: ${dataSP["danh_muc"]}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="text-xs font-weight-bold mb-0">${dataSP["gia"]}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <p class="text-xs font-weight-bold mb-0">${dataSP["soluongtonkho"]}</p>
                </td>
                <td class="align-middle text-center text-sm">
                    <p class="text-xs font-weight-bold mb-0">${dataSP["soluongdaban"]}</p>
                </td>`;
            if (parseInt(dataSP["noi_bat"]) == 1){
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">ON</span>
                </td>`;
            }
            else {
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-secondary">OFF</span>
                </td>`;
            }
            if (parseInt(dataSP["trang_thai"]) == 1){
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success">Show</span>
                </td>`;
            }
            else{
                content += `
                <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-secondary">Hide</span>
                </td>`;
            }
            content +=`
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${dataSP["cap_nhat_gan_nhat"]}</span>
                </td>
                <td class="text-center align-middle">
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        Detial
                    </a>
                        |
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_sp" id="${dataSP["sanphamID"]}" data-toggle="tooltip" data-original-title="Edit user">
                        Edit
                    </a>
                        | 
                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_sp" id="${dataSP["sanphamID"]}" data-toggle="tooltip" data-original-title="Edit user">
                        Delete
                    </a>
                </td>
            </tr>
            `;
        });
        document.querySelector(".table-tbody-sp").innerHTML = content;
    })
}