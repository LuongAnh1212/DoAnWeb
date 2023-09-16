let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){

    //Lấy  id_san_pham
    var urlSearch = document.URL;
    const uList = urlSearch.split("/");
    const id_san_pham = uList[uList.length - 1];

    console.log(id_san_pham);

    let apiDMsanpham = `http://127.0.0.1/Daily/api/danhmucAD`;
    let contentOptionDMSP = ``;
    let dataDMsanpham = fetch(apiDMsanpham)
    .then((res) => res.json())
    .then((dataDMsanpham) => {

        // Box Select DMSP - Mặc định là: Giá trị đầu tiên
        dataDMsanpham.forEach((dataDMSP)=>{
            console.log(dataDMSP);
            contentOptionDMSP += `
                <option value="${dataDMSP["danhmucID"]}">${dataDMSP["ten"]}</option>
            `;
        });
        document.getElementById("DMsp").innerHTML = contentOptionDMSP;

        // Box LSP - Mặc định theo: Giá trị của DMSP
        document.getElementById("Loaisp").value = "Thời trang nữ";

        let apiSPByID = `http://127.0.0.1/Daily/api/sanphamADById/${id_san_pham}`;
        let dataSanpham = fetch(apiSPByID)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            document.getElementById("tensp").value = data[0]["tensanpham"];
            document.getElementById("DMsp").value = data[0]["danhmucID"];

            document.getElementById("edit_id_lsp").value = data[0]["loaiID"];
            document.getElementById("Loaisp").value = data[0]["ten_loai_sp"];

            // Gia & Kho & Da ban
            document.getElementById("giasp").value = data[0]["gia"];
            document.getElementById("khosp").value = data[0]["soluongtonkho"];
            document.getElementById("spdaban").value = data[0]["soluongdaban"];

            // Noi bat & Trang thai
            var getStatusValue = document.querySelectorAll('input[name="status"]');   
            getStatusValue.forEach(function(currentValue, index, array){
                if(currentValue.value == data[0].trang_thai ) {   
                    currentValue.checked = "true";
                    return;
                }  
            })
            var getStatusValue = document.querySelectorAll('input[name="noi_bat"]');   
            getStatusValue.forEach(function(currentValue, index, array){
                if(currentValue.value == data[0].noi_bat ) {   
                    currentValue.checked = "true";
                    return;
                }  
            })

            // Chi tiet & Mo ta
            if (data[0].chitiet != null && data[0].chitiet.length != 0){
                document.getElementById("editor").value = data[0].chitiet;
            }
            if (data[0].mota != null && data[0].mota.length != 0){
                document.getElementById("motasp").value = data[0].mota;
            }

            // Box Image
            if (data[0].hinhanh != undefined && data[0].hinhanh != null && (data[0].hinhanh.trim()).length != 0){
                document.getElementById("avatar-sp").src = "http://127.0.0.1/Daily/" + data[0]["hinhanh"];
            }
            else {
                document.getElementById("avatar-sp").src = "http://127.0.0.1/Daily/images/Product/new_product_icon.jpg";
            }
            document.querySelector(".note-avatar-small-1").style.color= "#999";
            document.querySelector(".note-avatar-small-2").style.color= "#999";
        })
        .then(()=>{
            let apiAnhSPByID = `http://127.0.0.1/Daily/api/anhSanphamADById/${id_san_pham}`;
            let contentAnh = ``;
            let dataAnhSanpham = fetch(apiAnhSPByID)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.length > 0) {            
                    data.forEach((dataAnhSP)=>{
                        var srcDetailImage = dataAnhSP["duongdan"].trim();
                        contentAnh +=`
                            <img src = "http://127.0.0.1/Daily/${srcDetailImage}">
                        `;
                    });
                    document.getElementById('displayImg').innerHTML = contentAnh;
                }
            });
        });
    })
    .then(()=>{
        $('#DMsp').change(function(){
            // console.log($(this).val());
            let apiDMsanpham = `http://127.0.0.1/Daily/api/danhmucAD`;
            let dataDMsanpham = fetch(apiDMsanpham)
                .then((res) => res.json())
                .then((dataDMsanpham) => {
                    // Box LSP - Mặc định theo: Giá trị của DMSP
                    dataDMsanpham.forEach((dataDMSP)=>{
                        if (dataDMSP["danhmucID"] == $(this).val()){
                            document.getElementById("edit_id_lsp").value = dataDMSP["loaiID"];
                            document.getElementById("Loaisp").value = dataDMSP["loai_san_pham"];
                            
                            return;
                        }
                    })
                });
        });
    })
    .then(()=>{
        console.log("tiep theo - Sau khi chon DMSP & LSP");

        //1. Chọn hình SP
        document.getElementById("avatar-view").addEventListener("click",function(e){
            e.preventDefault();
            document.getElementById('file').click();
        });

        //2. Chọn hình chi tiết sản phẩm
        document.getElementById("avatar-view-detail").addEventListener("click",function(e){
            e.preventDefault();
            document.getElementById('upload').click();
        });

        //3. Submit FROM EDIT San pham
        document.getElementById("form-edit-sp").addEventListener('submit', function (e) {
            e.preventDefault();  //Giúp ngăn chặn việc reload lại trang khi nhấn nút submit
            console.log("Click Submit Form Edit");

            // Lấy các giá trị của form
            var ten_sp = document.getElementById("tensp").value;
            var loai_sp_id = document.getElementById("edit_id_lsp").value;
            var dm_sp_id = document.getElementById("DMsp").value;
            var gia_sp = document.getElementById("giasp").value;
            var kho_sp = document.getElementById("khosp").value;
            var sp_daban = document.getElementById("spdaban").value;
            
            var trang_thai = document.querySelector('input[name="status"]:checked').value;
            var noi_bat = document.querySelector('input[name="noi_bat"]:checked').value;
            
            var chi_tiet_sp = document.getElementById("editor").value;
            var mo_ta_sp = document.getElementById("motasp").value;

            var anh = document.querySelector(".avatar").src;
            var file_upload = document.getElementById("file").value;
            var files_upload_details = document.getElementById("upload").value;

            console.log(ten_sp);
            console.log(loai_sp_id); //
            console.log(dm_sp_id); //
            console.log(gia_sp);
            console.log(kho_sp);
            console.log(trang_thai);
            console.log(noi_bat);
            console.log(chi_tiet_sp);
            console.log(mo_ta_sp);
            console.log(anh);
            console.log(file_upload);
            console.log(files_upload_details);

            //Kiểm tra trước khi thực hiện
            let isNameValid = checkName();
            let isGiaValid = checkGia();
            let isKhoValid = checkKho();
            let isDaBanValid = checkDaBan();
            let isFormValid = isNameValid && isGiaValid && isKhoValid && isDaBanValid;
    
            if (isFormValid == true && (document.querySelector(".note-avatar-small-1").style.color != "red")){
                console.log(file_upload)
                // Edit co hinh
                if (file_upload.length != 0){
                    console.log("Edit có hình");
                    console.log(`Click Edit id_SP = ${id_san_pham}`);

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
                                    url: "http://127.0.0.1/Daily/Admin/EditSP",
                                    data: { //truyền token
                                        id_sp: id_san_pham,
                                        name: ten_sp,
                                        loai_sp_id: loai_sp_id,
                                        dm_sp_id: dm_sp_id,
                                        gia_sp: gia_sp,
                                        kho_sp: kho_sp,  
                                        sp_daban: sp_daban,                       
                                        status: trang_thai,
                                        noi_bat: noi_bat,
                                        chi_tiet_sp: chi_tiet_sp,
                                        mo_ta_sp: mo_ta_sp,
                                        file: file_return,
                                    },
                                    success: function (data) {
                                        if(data!= "0"){
                                            showToast('Complete', 'success', 'Chỉnh sửa thành công.', 2000);

                                            document.querySelector(".note-avatar-small-1").style.color= "#999";
                                            document.querySelector(".note-avatar-small-2").style.color= "#999";

                                            document.getElementById("file").value = ""; 
                                            console.log(document.getElementById("file").value);
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
                // Edit khong co hinh
                else{
                    console.log("Edit không có hình");
                    console.log(`Click Edit id_SP = ${id_san_pham}`);

                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1/Daily/Admin/EditSP",
                        data: { //truyền token
                            id_sp: id_san_pham,
                            name: ten_sp,
                            loai_sp_id: loai_sp_id,
                            dm_sp_id: dm_sp_id,
                            gia_sp: gia_sp,
                            kho_sp: kho_sp,    
                            sp_daban: sp_daban,                       
                            status: trang_thai,
                            noi_bat: noi_bat,
                            chi_tiet_sp: chi_tiet_sp,
                            mo_ta_sp: mo_ta_sp,
                        },
                        success: function (data) {
                            if(data!= "0"){
                                showToast('Complete', 'success', 'Chỉnh sửa thành công.', 2000);
                                document.getElementById("file").value = ""; 
                                console.log(document.getElementById("file").value);
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

        // Bắt lỗi Form Add
        const nameEl = document.querySelector('#tensp');
        const giaEl = document.querySelector('#giasp');
        const khoEl = document.querySelector('#khosp');
        const dabanEl = document.querySelector('#spdaban');

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

        const checkGia = () => {
            let valid = false;
            const giaEla = giaEl.value.trim();
            if (!isRequired(giaEla)) {
                showError(giaEl, 'Không được để trống !');
            } else {
                showSuccess(giaEl);
                valid = true;
            }
            return valid;
        };

        const checkKho = () => {
            let valid = false;
            const minKho = 0;
            const maxKho = 1000;
            const khoEla = khoEl.value.trim();
            console.log(khoEla);
            if (!isRequired(khoEla)) {
                showError(khoEl, 'Không được để trống !');
            } 
            else if (!isQuanlityKho(khoEla, minKho, maxKho)) {
                showError(khoEl, `Số lượng sản phẩm trong kho không lớn hơn 1000.`);
            }
            else {
                showSuccess(khoEl);
                valid = true;
            }
            return valid;
        };

        const checkDaBan = () => {
            let valid = false;
            const minDaBan = 0;
            const dabanEla = dabanEl.value.trim();
            console.log(dabanEla);
            if (!isRequired(dabanEla)) {
                showError(dabanEl, 'Không được để trống !');
            } 
            else if (!isQuanlityDaBan(dabanEla, minDaBan)) {
                showError(dabanEl, `Số lượng sản phẩm đã bán phải lớn hơn hoặc bằng 0.`);
            }
            else {
                showSuccess(dabanEl);
                valid = true;
            }
            return valid;
        };

        const isRequired = (value) => (value === '' ? false : true);
        const isQuanlityKho = (valueK, min, max) => (valueK < min || valueK > max ? false : true);
        const isQuanlityDaBan = (dabanEla, minDaBan) => (dabanEla < minDaBan ? false : true);

        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('#form-edit-sp small');
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
        document.querySelector('#form-edit-sp').addEventListener('submit', function (e) {
            hienthibaoloi__();
            e.preventDefault();
            let isNameValid = checkName();
            let isGiaValid = checkGia();
            let isKhoValid = checkKho();
            let isDaBan = checkDaBan();
            let isFormValid = isNameValid && isGiaValid && isKhoValid && isDaBan;
        });

        document.querySelector('#form-edit-sp').addEventListener(
            'input',
            debounce(function (e) {
                switch (e.target.id) {
                    case 'tensp':
                        checkName();
                        break;
                    case 'giasp':
                        checkGia();
                        break;
                    case 'khosp':
                        checkKho();
                        break;
                    case 'spdaban':
                        checkDaBan();
                        break; 
                }
            }),
        );
        // End Bắt lỗi Form Add
    });
}
else{
    window.location.replace("http://127.0.0.1/Daily/Admin");
}

// Function UpLoad file hình ảnh = BOX ADD DMSP
function loadFile(event) {
    var image = document.querySelector('#avatar-sp');
    console.log("Chay function loadFile nhieu hinh");
    console.log(document.getElementById("file").value);
    if (event.target.files[0] != null){
        if(event.target.files[0].size > 500000) { //1000000
            document.querySelector(".note-avatar-small-1").style.color= "red";
            document.querySelector(".note-avatar-small-2").style.color= "red";
            return false;
        }
        else{
            image.src = URL.createObjectURL(event.target.files[0]);
            console.log(image);
            console.log(URL.createObjectURL(event.target.files[0]));
            document.querySelector(".note-avatar-small-1").style.color= "#47d864";
            document.querySelector(".note-avatar-small-2").style.color= "#47d864";
            return true;
        }   
    } 
};

// Hàm upload NHIỀU ảnh
function ImagesFileAsURL() {
    var fileSelected = document.getElementById('upload').files;
    if (fileSelected.length > 0) {
        console.log(fileSelected);

        for (var i = 0; i < fileSelected.length; i++) {
            var fileToLoad = fileSelected[i];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoaderEvent) {
                var srcData = fileLoaderEvent.target.result;
                var newImage = document.createElement('img');
                newImage.src = srcData;
                document.getElementById('displayImg').innerHTML += newImage.outerHTML;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
}