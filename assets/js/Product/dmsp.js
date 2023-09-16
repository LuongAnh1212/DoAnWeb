let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){
    console.log(tokenAD);
    let apiDMSP = `http://127.0.0.1/Daily/api/danhmucAD`;
    let content = ``;

    let dataDMSPAdmin = fetch(apiDMSP)
    .then((res) => res.json())
    .then((dataDMSPAdmin) => {
        console.log(dataDMSPAdmin);
        var stt = 0; 
        dataDMSPAdmin.forEach((dataDM)=>{
            stt++;
            // console.log(dataDM);
            content += `
            <tr>
                <td class="align-middle text-center text-sm">${stt}</td>
                <td>
                    <div class="d-flex px-2 py-1">`

            if (dataDM["anh"] != null && dataDM["anh"].trim() != ""){
                content +=`<div><img src="http://127.0.0.1/Daily/${dataDM["anh"]}" class="avatar avatar-sm me-3 border-radius-lg" alt="user1"></div>`;
            }
            content +=`             
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${dataDM["ten"]}</h6>
                            <p class="text-xs text-secondary mb-0">LSP: ${dataDM["loai_san_pham"]}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="text-xs text-center font-weight-bold mb-0">${dataDM["so_luong_sp"]}</p>
                    <p class="text-xs text-secondary mb-0"></p>
                </td>`;
            if (parseInt(dataDM["trang_thai"]) == 1){
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
                <span class="text-secondary text-xs font-weight-bold">${dataDM["cap_nhat_gan_nhat"]}</span>
                </td>
                <td class="text-center align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                    Detial
                </a>
                |
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_dmsp" id=${dataDM["danhmucID"]} data-toggle="tooltip" data-original-title="Edit user">
                    Edit
                </a>
                | 
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_dmsp" id=${dataDM["danhmucID"]} data-toggle="tooltip" data-original-title="Edit user">
                    Delete
                </a>
                </td>
            </tr>
            `;
        })
        document.querySelector(".table-tbody-dmsp").innerHTML = content;
    })
    .then(()=>{
        //1. Thêm Danh mục Sản phẩm
        console.log(document.getElementById("loaisp"));
        let apiLoaisanpham = `http://127.0.0.1/Daily/api/loaisanphamAD`;
        let contentOptionLSP = ``;
        let dataLoaisanpham = fetch(apiLoaisanpham)
            .then((res) => res.json())
            .then((dataLoaisanpham) => {
                console.log(dataLoaisanpham);

                // Box Select LSP - Mặc định là: Giá trị đầu tiên
                dataLoaisanpham.forEach((dataLSP)=>{
                    console.log(dataLSP);
                    contentOptionLSP += `
                        <option value="${dataLSP["loaiID"]}">${dataLSP["ten"]}</option>
                    `;
                });
                document.getElementById("loaisp").innerHTML = contentOptionLSP;

                // Box Trang Thai - Mặc định là: Ẩn
                var getStatusValue = document.querySelectorAll('input[name="status"]');   
                getStatusValue.forEach(function(currentValue, index, array){
                    if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
                })

                // Box Select LSP cua Edit
                document.getElementById("edit_loaisp").innerHTML = contentOptionLSP;
            })
            .then(()=>{
                console.log(document.getElementById("loaisp"));

                //1.1. Mở box Add
                document.getElementById("btn_add_dmsp").addEventListener("click", function(){
                    console.log("Click Add");
                    document.getElementById("tendmsp").value = "";

                    document.getElementById("avatar").src = "http://127.0.0.1/Daily/images/Product/new_product_icon.jpg";
                    document.querySelector(".note-avatar-small-1").style.color= "#999";
                    document.querySelector(".note-avatar-small-2").style.color= "#999";
                    document.getElementById("file").value = ""; 

                    document.getElementById("main_popup_add").style.display = "block";
                });

                //1.2. Chọn hình DMSP
                document.getElementById("avatar-view").addEventListener("click",function(e){
                    e.preventDefault();
                    document.getElementById('file').click();
                });

                //1.3. Submit FORM ADD DMSP
                document.getElementById("form-add-dmsp").addEventListener('submit', function (e) {
                    e.preventDefault();  //Giúp ngăn chặn việc reload lại trang khi nhấn nút submit
                    console.log("Click Submit Form Add");

                    // Lấy các giá trị của form
                    var ten_dmsp = document.getElementById("tendmsp").value;
                    var loai_sp_id = document.getElementById("loaisp").value;
                    var trang_thai = document.querySelector('input[name="status"]:checked').value;
                    var anh = document.querySelector(".avatar").src;
                    var file_upload = document.getElementById("file").value;

                    console.log(ten_dmsp);
                    console.log(loai_sp_id);
                    console.log(trang_thai);
                    console.log(anh);

                     //Kiểm tra trước khi thực hiện
                    let isNameValid = checkName();
                    if (isNameValid == true && (document.querySelector(".note-avatar-small-1").style.color != "red")){
                        console.log(anh);
                        console.log(file_upload);

                        //1.3.1 - Add có hình
                        if(file_upload.length != 0){
                            console.log("Add có hình");

                            //Upload ảnh lên server images/Product
                            $.ajax({
                                type: "POST",
                                url: "http://127.0.0.1/Daily/Admin/fileUploadScript",
                                data: new FormData(this),
                                contentType: false,
                                cache: false,
                                processData: false,
                                success: function(data){
                                    console.log(data);
                                    var file_return = data;
                                    if(data != "0"){
                                        $.ajax({
                                            type: "POST",
                                            url: "http://127.0.0.1/Daily/Admin/AddDMSP",
                                            data: { //truyền token
                                                name: ten_dmsp,
                                                file: file_return,
                                                loai_sp_id: loai_sp_id, 
                                                status: trang_thai,
                                            },
                                            success: function (data) {
                                                if(data!= "0"){
                                                    document.getElementById("main_popup_add").style.display = "none";
                                                    showToast('Complete', 'success', 'Thêm thành công.', 2000);
                                                    document.getElementById("tendmsp").value = "";

                                                    document.getElementById("avatar").src = "http://127.0.0.1/Daily/images/Product/new_product_icon.jpg";
                                                    document.querySelector(".note-avatar-small-1").style.color= "#999";
                                                    document.querySelector(".note-avatar-small-2").style.color= "#999";
                                                    document.getElementById("file").value = ""; 
        
                                                    console.log(document.getElementById("file").value);

                                                    // Box Trang Thai - Mặc định là: Ẩn
                                                    var getStatusValue = document.querySelectorAll('input[name="status"]');   
                                                    getStatusValue.forEach(function(currentValue, index, array){
                                                        if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
                                                    })
                    
                                                    //Cập nhập lại bảng loại sản phẩm
                                                    reloadInfomation();
                                                }
                                                else{
                                                    showToast('Error', 'error', 'Có lỗi xảy ra 2.', 2000);
                                                }
                                            },
                                            error: function (req,err) {
                                                showToast('Error', 'error', 'Có lỗi xảy ra 1.', 2000);
                                            },
                                        });
                                    }
                                    else{
                                        showToast("Error","error", "Lỗi File.",2000);
                                    }
                                },
                                error: function(data){
                                    showToast("Error","error","Lỗi Upload File.",2000);
                                }
                            });
                        }

                        //1.3.2 - Add không có hình
                        else{
                            console.log("Add không có hình");
                            $.ajax({
                                type: "POST",
                                url: "http://127.0.0.1/Daily/Admin/AddDMSP",
                                data: { //truyền token
                                    name: ten_dmsp,
                                    loai_sp_id: loai_sp_id, 
                                    status: trang_thai,
                                },
                                success: function (data) {
                                    if(data!= "0"){
                                        document.getElementById("main_popup_add").style.display = "none";
                                        showToast('Complete', 'success', 'Thêm thành công.', 2000);
                                        document.getElementById("tendmsp").value = "";
                                        document.getElementById("avatar").src = "http://127.0.0.1/Daily/images/Product/new_product_icon.jpg";

                                        // Box Trang Thai - Mặc định là: Ẩn
                                        var getStatusValue = document.querySelectorAll('input[name="status"]');   
                                        getStatusValue.forEach(function(currentValue, index, array){
                                            if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
                                        })
        
                                        //Cập nhập lại bảng loại sản phẩm
                                        reloadInfomation();
                                    }
                                    else{
                                        showToast('Error', 'error', 'Có lỗi xảy ra 2.', 2000);
                                    }
                                },
                                error: function (req,err) {
                                    showToast('Error', 'error', 'Có lỗi xảy ra 1.', 2000);
                                },
                            });
                        }
                    }
                    else{
                        showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin!', 2000);
                    }
                }) 

                // Bắt lỗi Form Add
                const nameEl = document.querySelector('#tendmsp');

                const checkName = () => {
                    let valid = false;
                    const nameEla = nameEl.value.trim();
                    if (!isRequired(nameEla)) {
                        showError(nameEl, 'Không được để trống !');
                    } else {
                        showSuccess(nameEl);
                        valid = true;
                    }
                    return valid;
                };

                const isRequired = (value) => (value === '' ? false : true);

                const showError = (input, message) => {
                    // get the form-field element
                    const formField = input.parentElement;
                    // add the error class
                    formField.classList.remove('success');
                    formField.classList.add('error');

                    // show the error message
                    const error = formField.querySelector('#form-add-dmsp small');
                    error.textContent = message;
                };

                const showSuccess = (input) => {
                    // get the form-field element
                    const formField = input.parentElement;

                    // remove the error class
                    formField.classList.remove('error');
                    formField.classList.add('success');

                    // hide the error message
                    const error = formField.querySelector('small');
                    error.textContent = '';
                };

                const debounce = (fn, delay = 500) => {
                    let timeoutId;
                    return (...args) => {
                        // cancel the previous timer
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        // setup a new timer
                        timeoutId = setTimeout(() => {
                            fn.apply(null, args);
                        }, delay);
                    };
                };
                function hienthibaoloi__() {
                    var NodeObject = document.querySelectorAll('small');
                    NodeObject.forEach(function (item) {
                        item.style = '';
                    });
                }
                document.querySelector('#form-add-dmsp').addEventListener('submit', function (e) {
                    hienthibaoloi__();
                    e.preventDefault();
                    let isNameValid = checkName();
                    let isFormValid =isNameValid ;
                });

                document.querySelector('#form-add-dmsp').addEventListener(
                    'input',
                    debounce(function (e) {
                        switch (e.target.id) {
                            case 'tendmsp':
                                checkName();
                                break;
                        }
                    }),
                );
                // End Bắt lỗi Form Add

                //1.4 Đóng box Add
                document.getElementById("btn_close_box_add").addEventListener("click", function(){
                    console.log("Click Close Add");
                    document.getElementById("main_popup_add").style.display = "none";
                });

                //1.5 Xóa Danh muc San Pham 
                $(document).on("click", ".delete_dmsp", function (event) {
                    var id_DMSP = event.target.parentElement.id;
                    var row_id = $(this).attr("id");
                    console.log(id_DMSP);
                    console.log(row_id);

                    tools__.confirm("show", "Bạn muốn xóa Danh mục sản phẩm này?", () => {
                        console.log(id_DMSP);
                        console.log(row_id);

                        let apiDMsanphamByID = ` http://127.0.0.1/Daily/api/DMsanphamByID/${row_id}`;
                        fetch(apiDMsanphamByID)
                            .then((res) => res.json())
                            .then((dataDMsanphamByID) => {
                                console.log(dataDMsanphamByID);
                                dataDMsanphamByID.forEach((data)=>{
                                    console.log(data);
                                    if (data.so_luong_sp != 0){
                                        console.log("Không thể xóa do CÓ ràng buộc - Có sản phẩm của Danh Mục này");
                                        showToast("Error", "error", "KHÔNG THỂ XÓA. Có ràng buộc xảy ra.", 2000);
                                        tools__.displayOpacity("hidden");
                                    }
                                    else if (data.so_luong_sp == 0){
                                        console.log("Có thể xóa do KHÔNG CÓ ràng buộc - Danh Mục này không có Sản phẩm nào");
                                        $.ajax({
                                            url: "http://127.0.0.1/Daily/Admin/deleteDMSP",
                                            type: "POST",
                                            data: { //Nhớ token
                                                idDMSP: row_id
                                            },
                                            success: function (data) {
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
                                    }
                                });
                            });
                    });
                });
            })
            .then(()=>{
                //2.1. Mở box Edit - Và lấy Database của DMSP cần Edit
                $(document).on("click", ".edit_dmsp", function (event) {
                    var id_LSP = event.target.parentElement.id;
                    var row_id = $(this).attr("id");
                    console.log(id_LSP);
                    console.log(`Click Edit id = ${row_id}`);

                    let apiDMsanphamByID = ` http://127.0.0.1/Daily/api/DMsanphamByID/${row_id}`;
                    fetch(apiDMsanphamByID)
                        .then((res) => res.json())
                        .then((dataDMsanphamByID) => {
                            console.log(dataDMsanphamByID);
                            dataDMsanphamByID.forEach((data)=>{
                                console.log(data);
                                document.getElementById("edit_ten_dmsp").value = data["ten"];
                                document.getElementById("edit_id_dmsp").value = data["danhmucID"];

                                // Box Image
                                if (data.anh != undefined && data.anh != null && (data.anh.trim()).length != 0){
                                    document.getElementById("edit_avatar").src = "http://127.0.0.1/Daily/" + data["anh"];
                                }
                                else{
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

                                // Box Loai San Pham
                                var temp = data.loaiID;
                                var edit_loaisp = document.getElementById('edit_loaisp');
                                for(var i, j = 0; i = edit_loaisp.options[j]; j++) {
                                    if(i.value == temp) {
                                        edit_loaisp.selectedIndex = j;
                                        break;
                                    }
                                }

                                // Đặc biệt
                                document.getElementById("edit_file").value = ""; 
                                
                            })
                        })
                        .then(()=>{
                            document.getElementById("main_popup_edit").style.display = "block";
                        });
                });
            })
            .then(()=>{
                //2.2. Chọn hình DMSP - Edit
                document.getElementById("edit_avatar-view").addEventListener("click",function(e){
                    e.preventDefault();
                    document.getElementById('edit_file').click();
                });

                //2.3. Submit FORM EDIT DMSP
                document.getElementById("form-edit-dmsp").addEventListener('submit', function (e) {
                    e.preventDefault();  //Giúp ngăn chặn việc reload lại trang khi nhấn nút submit
                    console.log("Click Submit Form Edit");

                    // Lấy các giá trị của form
                    var ten_dmsp_ed = document.getElementById("edit_ten_dmsp").value;
                    var id_dmsp_ed = document.getElementById("edit_id_dmsp").value;
                    var loai_sp_id_ed = document.getElementById("edit_loaisp").value;
                    var trang_thai_ed = document.querySelector('input[name="edit_status"]:checked').value;
                    var anh_ed = document.querySelector(".edit_avatar").src;
                    var file_upload_ed = document.getElementById("edit_file").value;

                    console.log(ten_dmsp_ed);
                    console.log(id_dmsp_ed);
                    console.log(loai_sp_id_ed);
                    console.log(trang_thai_ed);
                    console.log(anh_ed);
                    console.log(file_upload_ed);

                     //Kiểm tra trước khi thực hiện
                    let isNameValidE = checkNameE();
                    if (isNameValidE == true && (document.querySelector(".edit-note-avatar-small-1").style.color != "red")){
                        console.log(anh_ed);
                        console.log(file_upload_ed);

                        //2.3.1 - Edit có hình
                        if(file_upload_ed.length != 0){
                            console.log("Edit có hình");
                            console.log(`Click Edit id_DMSP = ${id_dmsp_ed}`);

                            //Upload ảnh lên server images/Product
                            $.ajax({
                                type: "POST",
                                url: "http://127.0.0.1/Daily/Admin/fileUploadScript",
                                data: new FormData(this),
                                contentType: false,
                                cache: false,
                                processData: false,
                                success: function(data){
                                    console.log(data);
                                    var file_return = data;
                                    if(data != "0"){
                                        $.ajax({
                                            type: "POST",
                                            url: "http://127.0.0.1/Daily/Admin/EditDMSP",
                                            data: { //truyền token
                                                name: ten_dmsp_ed,
                                                id_dmsp_ed: id_dmsp_ed,
                                                file: file_return,
                                                loai_sp_id: loai_sp_id_ed, 
                                                status: trang_thai_ed,
                                            },
                                            success: function (data) {
                                                if(data!= "0"){
                                                    showToast('Complete', 'success', 'Chỉnh sửa thành công.', 2000);

                                                    document.querySelector(".edit-note-avatar-small-1").style.color= "#999";
                                                    document.querySelector(".edit-note-avatar-small-2").style.color= "#999";

                                                    document.getElementById("edit_file").value = "";
                                                    console.log(document.getElementById("edit_file").value);

                                                    document.getElementById("main_popup_edit").style.display = "none";
                            
                                                    //Cập nhập lại bảng loại sản phẩm
                                                    reloadInfomation();
                                                }
                                                else{
                                                    showToast('Error', 'error', 'Có lỗi xảy ra 2.', 2000);
                                                }
                                            },
                                            error: function (req,err) {
                                                showToast('Error', 'error', 'Có lỗi xảy ra 1.', 2000);
                                            },
                                        });
                                    }
                                    else{
                                        showToast("Error","error", "Lỗi File.",2000);
                                    }
                                },
                                error: function(data){
                                    showToast("Error","error","Lỗi Upload File.",2000);
                                }
                            });
                        }
                        //2.3.2 - Edit không có hình
                        else{
                            console.log("Edit không có hình");
                            console.log(`Click Edit id_DMSP = ${id_dmsp_ed}`);
                            $.ajax({
                                type: "POST",
                                url: "http://127.0.0.1/Daily/Admin/EditDMSP",
                                data: { //truyền token
                                    name: ten_dmsp_ed,
                                    id_dmsp_ed: id_dmsp_ed,
                                    loai_sp_id: loai_sp_id_ed, 
                                    status: trang_thai_ed,
                                },
                                success: function (data) {
                                    if(data!= "0"){
                                        document.getElementById("main_popup_edit").style.display = "none";
                                        showToast('Complete', 'success', 'Chỉnh sửa thành công.', 2000);
        
                                        //Cập nhập lại bảng loại sản phẩm
                                        reloadInfomation();
                                    }
                                    else{
                                        showToast('Error', 'error', 'Có lỗi xảy ra 2.', 2000);
                                    }
                                },
                                error: function (req,err) {
                                    showToast('Error', 'error', 'Có lỗi xảy ra 1.', 2000);
                                },
                            });
                        }

                    }
                    else{
                        showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin!', 2000);
                    }
                });

                // Bắt lỗi Form Edit
                const EnameEl = document.querySelector('#edit_ten_dmsp');

                const checkNameE = () => {
                    let valid = false;
                    const nameEla = EnameEl.value.trim();
                    if (!isRequired(nameEla)) {
                        showError(EnameEl, 'Không được để trống !');
                    } else {
                        showSuccess(EnameEl);
                        valid = true;
                    }
                    return valid;
                };

                const isRequired = (value) => (value === '' ? false : true);

                const showError = (input, message) => {
                    // get the form-field element
                    const formField = input.parentElement;
                    // add the error class
                    formField.classList.remove('success');
                    formField.classList.add('error');

                    // show the error message
                    const error = formField.querySelector('#form-edit-dmsp small');
                    error.textContent = message;
                };

                const showSuccess = (input) => {
                    // get the form-field element
                    const formField = input.parentElement;

                    // remove the error class
                    formField.classList.remove('error');
                    formField.classList.add('success');

                    // hide the error message
                    const error = formField.querySelector('small');
                    error.textContent = '';
                };

                const debounce = (fn, delay = 500) => {
                    let timeoutId;
                    return (...args) => {
                        // cancel the previous timer
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        // setup a new timer
                        timeoutId = setTimeout(() => {
                            fn.apply(null, args);
                        }, delay);
                    };
                };
                function hienthibaoloi__() {
                    var NodeObject = document.querySelectorAll('small');
                    NodeObject.forEach(function (item) {
                        item.style = '';
                    });
                }
                document.querySelector('#form-edit-dmsp').addEventListener('submit', function (e) {
                    hienthibaoloi__();
                    e.preventDefault();
                    let isNameValid = checkNameE();
                    let isFormValid =isNameValid ;
                });

                document.querySelector('#form-edit-dmsp').addEventListener(
                    'input',
                    debounce(function (e) {
                        switch (e.target.id) {
                            case 'edit_ten_dmsp':
                                checkNameE();
                                break;
                        }
                    }),
                );
                // End Bắt lỗi Form Edit

                //2.x Đóng box Edit
                document.getElementById("btn_close_box_edit").addEventListener("click", function(){
                    console.log("Click Close Edit");
                    document.getElementById("edit_file").value = ""; // Để tránh lỗi không chọn được 1 hình liên tiếp
                    document.querySelector(".edit-note-avatar-small-1").style.color= "#999";
                    document.querySelector(".edit-note-avatar-small-2").style.color= "#999";

                    document.getElementById("main_popup_edit").style.display = "none";
                });
            });
    });
}

// Function UpLoad file hình ảnh = BOX ADD DMSP
function loadFile(event) {
    var image = document.querySelector('.avatar');
    console.log("Chay function loadFile");
    console.log(document.getElementById("file").value);
    if (event.target.files[0] != null){
        if(event.target.files[0].size > 500000) { //1000000
            document.querySelector(".note-avatar-small-1").style.color= "red";
            document.querySelector(".note-avatar-small-2").style.color= "red";
            return false;
        }
        else{
            image.src = URL.createObjectURL(event.target.files[0]);
            document.querySelector(".note-avatar-small-1").style.color= "#47d864";
            document.querySelector(".note-avatar-small-2").style.color= "#47d864";
            return true;
        }   
    } 
};

// Function Upload file hinh anh = BOX EDIT DMSP
function loadFileEdit(event) {
    event.preventDefault();
    console.log("Chay function loadFileEdit");
    console.log(document.getElementById("edit_file").value);
    console.log(event.target.files[0]);

    var image_edit = document.querySelector('.edit_avatar');
    if (event.target.files[0] != null){
        console.log(event.target.files[0]);
        if(event.target.files[0].size > 500000) { //1000000
            document.querySelector(".edit-note-avatar-small-1").style.color= "red";
            document.querySelector(".edit-note-avatar-small-2").style.color= "red";
            return false;
        }
        else{
            image_edit.src = URL.createObjectURL(event.target.files[0]);
            document.querySelector(".edit-note-avatar-small-1").style.color= "#47d864";
            document.querySelector(".edit-note-avatar-small-2").style.color= "#47d864";
            return true;
        }   
    } 
    return;
};

//Funtion reload sau mỗi lầm Thêm, Sửa
function reloadInfomation(){
    let apiDMSP = `http://127.0.0.1/Daily/api/danhmucAD`;
    let content = ``;
    let dataDMSPAdmin = fetch(apiDMSP)
    .then((res) => res.json())
    .then((dataDMSPAdmin) => {
        console.log(dataDMSPAdmin);
        var stt = 0; 
        dataDMSPAdmin.forEach((dataDM)=>{
            stt++;
            // console.log(dataDM);
            content += `
            <tr>
                <td class="align-middle text-center text-sm">${stt}</td>
                <td>
                    <div class="d-flex px-2 py-1">`

            if (dataDM["anh"] != null && dataDM["anh"].trim() != ""){
                content +=`<div><img src="http://127.0.0.1/Daily/${dataDM["anh"]}" class="avatar avatar-sm me-3 border-radius-lg" alt="user1"></div>`;
            }
            content +=`             
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${dataDM["ten"]}</h6>
                            <p class="text-xs text-secondary mb-0">LSP: ${dataDM["loai_san_pham"]}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="text-xs text-center font-weight-bold mb-0">${dataDM["so_luong_sp"]}</p>
                    <p class="text-xs text-secondary mb-0"></p>
                </td>`;
            if (parseInt(dataDM["trang_thai"]) == 1){
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
                <span class="text-secondary text-xs font-weight-bold">${dataDM["cap_nhat_gan_nhat"]}</span>
                </td>
                <td class="text-center align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                    Detial
                </a>
                |
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_dmsp" id=${dataDM["danhmucID"]} data-toggle="tooltip" data-original-title="Edit user">
                    Edit
                </a>
                | 
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_dmsp" id=${dataDM["danhmucID"]} data-toggle="tooltip" data-original-title="Edit user">
                    Delete
                </a>
                </td>
            </tr>
            `;
        })
        document.querySelector(".table-tbody-dmsp").innerHTML = content;
    });
}