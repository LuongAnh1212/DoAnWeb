let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){
    console.log(tokenAD);
    let apiDMsanpham = `http://127.0.0.1/Daily/api/danhmucAD`;
    let contentOptionDMSP = ``;
    let dataDMsanpham = fetch(apiDMsanpham)
    .then((res) => res.json())
    .then((dataDMsanpham) => {
        console.log(dataDMsanpham);

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

        // Box Trang Thai - Mặc định là: Ẩn
        var getStatusValue = document.querySelectorAll('input[name="status"]');   
        getStatusValue.forEach(function(currentValue, index, array){
            if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
        })

        // Box Noi Bat - Mặc định là: Khong
        var getStatusValue = document.querySelectorAll('input[name="noi_bat"]');   
        getStatusValue.forEach(function(currentValue, index, array){
            if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
        })
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
                            console.log(document.getElementById("edit_id_lsp").value);
                            console.log(document.getElementById("Loaisp").value);
                            
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

        //3. Submit FROM ADD San pham
        document.getElementById("form-add-sp").addEventListener('submit', function (e) {
            e.preventDefault();  //Giúp ngăn chặn việc reload lại trang khi nhấn nút submit
            console.log("Click Submit Form Add");

            // Lấy các giá trị của form
            var ten_sp = document.getElementById("tensp").value;
            var loai_sp_id = document.getElementById("edit_id_lsp").value;
            var dm_sp_id = document.getElementById("DMsp").value;
            var gia_sp = document.getElementById("giasp").value;
            var kho_sp = document.getElementById("khosp").value;
            
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
            console.log(files_upload_details);

            //Kiểm tra trước khi thực hiện
            let isNameValid = checkName();
            let isGiaValid = checkGia();
            let isKhoValid = checkKho();

            let isFormValid = isNameValid && isGiaValid && isKhoValid;
    
            if (isFormValid == true && (document.querySelector(".note-avatar-small-1").style.color != "red" && file_upload.length != 0)){
                console.log(anh);
                console.log(file_upload)

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
                                url: "http://127.0.0.1/Daily/Admin/AddSP",
                                data: { //truyền token
                                    name: ten_sp,
                                    file: file_return,
                                    loai_sp_id: loai_sp_id,
                                    dm_sp_id: dm_sp_id,
                                    gia_sp: gia_sp,
                                    kho_sp: kho_sp,                         
                                    status: trang_thai,
                                    noi_bat: noi_bat,
                                    chi_tiet_sp: chi_tiet_sp,
                                    mo_ta_sp: mo_ta_sp,
                                },
                                success: function (data) {
                                    if(data!= "0"){
                                        console.log(data); //data tra ve la sanphamID

                                        // var fileSelected = document.getElementById('upload').files;
                                        // if (fileSelected.length > 0) {
                                        //     console.log(fileSelected);
                                        //     // Them Anh chi tiet sp vao bang "anh_san_pham"
                                        //     $.ajax({
                                        //         type: "POST",
                                        //         url: "http://127.0.0.1/Daily/Admin/fileUploadDetailsScript",
                                        //         data: {fileSelected: fileSelected},
                                        //         contentType: false,
                                        //         cache: false,
                                        //         processData: false,
                                        //         success: function(data){
                                        //             console.log(data);
                                        //             // var file_return = data;
                                        //             if(data != "0"){
                                                        
                                        //             }
                                        //             else{
                                        //                 showToast("Error","error", "Lỗi File.",2000);
                                        //             }
                                        //         },
                                        //         error: function(data){
                                        //             showToast("Error","error","Lỗi Upload File.",2000);
                                        //         }
                                        //     });
                                        // }

                                        document.getElementById("tensp").value = "";
                                        document.getElementById("giasp").value = "";
                                        document.getElementById("khosp").value = "";

                                        document.getElementById("avatar-sp").src = "http://127.0.0.1/Daily/images/Product/new_product_icon.jpg";
                                        document.querySelector(".note-avatar-small-1").style.color= "#999";
                                        document.querySelector(".note-avatar-small-2").style.color= "#999";
                                        document.getElementById("file").value = ""; 
                                        document.getElementById("upload").value = ""; 

                                        document.getElementById("editor").value = "";
                                        document.getElementById("motasp").value = "";

                                        console.log(document.getElementById("file").value);

                                        // Box Trang Thai - Mặc định là: Ẩn
                                        var getStatusValue = document.querySelectorAll('input[name="status"]');   
                                        getStatusValue.forEach(function(currentValue, index, array){
                                            if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
                                        })
        
                                        // Box Nổi bật - Mặc định là: Không
                                        var getStatusValue = document.querySelectorAll('input[name="noi_bat"]');   
                                        getStatusValue.forEach(function(currentValue, index, array){
                                            if(currentValue.value == 0 ) { currentValue.checked = "true"; }  
                                        })

                                        function Redirect() {
                                            showToast('Complete', 'success', 'Thêm thành công.', 2000);
                                            window.location = "http://127.0.0.1/Daily/Admin/SanPham";
                                        }
                                        setTimeout(Redirect(), 6000);
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
            else{
                showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin!', 2000);
            }
        });

        // Bắt lỗi Form Add
        const nameEl = document.querySelector('#tensp');
        const giaEl = document.querySelector('#giasp');
        const khoEl = document.querySelector('#khosp');
        const chitietEl = document.querySelector('#editor');
        const motaEl = document.querySelector('#motasp');

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

        const checkChiTiet = () => {
            let valid = false;
            const chitietEla = chitietEl.value.trim();
            if (!isRequired(chitietEla)) {
                showError(chitietEl, 'Không được để trống !');
            } else {
                showSuccess(chitietEl);
                valid = true;
            }
            return valid;
        };

        const checkMoTa = () => {
            let valid = false;
            const motaEla = motaEl.value.trim();
            if (!isRequired(motaEla)) {
                showError(motaEl, 'Không được để trống !');
            } 
            else {
                showSuccess(motaEl);
                valid = true;
            }
            return valid;
        };

        const isRequired = (value) => (value === '' ? false : true);
        const isQuanlityKho = (valueK, min, max) => (valueK < min || valueK > max ? false : true);


        const showError = (input, message) => {
            // get the form-field element
            const formField = input.parentElement;
            // add the error class
            formField.classList.remove('success');
            formField.classList.add('error');

            // show the error message
            const error = formField.querySelector('#form-add-sp small');
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
        document.querySelector('#form-add-sp').addEventListener('submit', function (e) {
            hienthibaoloi__();
            e.preventDefault();
            let isNameValid = checkName();
            let isGiaValid = checkGia();
            let isKhoValid = checkKho();
            let isChiTietValid = checkChiTiet();
            let isMoTaValid = checkMoTa();
            let isFormValid = isNameValid && isGiaValid && isKhoValid;
        });

        document.querySelector('#form-add-sp').addEventListener(
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
                    // case 'editor':
                    //     checkChiTiet();
                    //     break;
                    // case 'motasp':
                    //     checkMoTa();
                    //     break;
                }
            }),
        );
        // End Bắt lỗi Form Add
    });
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

tinymce.init({
    selector:'#editor, #motasp',
    menubar: false,
    statusbar: false,
    plugins: 'autoresize anchor autolink charmap code codesample directionality fullpage help hr image imagetools insertdatetime link lists media nonbreaking pagebreak preview print searchreplace table template textpattern toc visualblocks visualchars',
    toolbar: 'h1 h2 bold italic strikethrough blockquote bullist numlist backcolor | link image media | removeformat help fullscreen ',
    skin: 'bootstrap',
    toolbar_drawer: 'floating',
    min_height: 200,           
    autoresize_bottom_margin: 16,
    setup: (editor) => {
        editor.on('init', () => {
            editor.getContainer().style.transition="border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
        });
        editor.on('focus', () => {
            editor.getContainer().style.boxShadow="0 0 0 .2rem rgba(0, 123, 255, .25)",
            editor.getContainer().style.borderColor="#80bdff"
        });
        editor.on('blur', () => {
            editor.getContainer().style.boxShadow="",
            editor.getContainer().style.borderColor=""
        });
    }
});