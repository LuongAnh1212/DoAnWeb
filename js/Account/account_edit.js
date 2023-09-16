$(document).ready(function () {

    //Background color of Nav
    let navAction = document.querySelectorAll(".Account__StyleNav li a");
    navAction[0].classList.add("is-active");

    let token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : [];
    
    if (token != undefined && token.length != 0) {
        $.ajax({
            type:"POST",
            url: "http://127.0.0.1/Daily/Account/CheckTokenUser",
            data:{token:token},
            success: function(data){
                if (data != "0"){
                    var accountProfile_arr = JSON.parse(data);
                    var accountProfile = accountProfile_arr[0];
                    console.log(accountProfile);

                    if (accountProfile.ho_ten != undefined && accountProfile.ho_ten != null && accountProfile.ho_ten.length != 0){
                        let infoAccountStrong = document.querySelector(".info-account strong");
                        infoAccountStrong.innerHTML = accountProfile.ho_ten;

                        let boxFullNameInput = document.querySelector(".input_fullName");
                        boxFullNameInput.value = accountProfile.ho_ten;
                    }
                    if (accountProfile.so_dien_thoai != undefined && accountProfile.so_dien_thoai != null && accountProfile.so_dien_thoai.length != 0){
                        let boxSDT = document.querySelector(".input_SDT");
                        boxSDT.value = accountProfile.so_dien_thoai;
                    }
                    if (accountProfile.email != undefined && accountProfile.email != null && accountProfile.email.length != 0){
                        let boxEmail = document.querySelector(".input_Email");
                        boxEmail.value = accountProfile.email;
                    }
                    if (accountProfile.anh_bia != undefined && accountProfile.anh_bia != null && (accountProfile.anh_bia.trim()).length != 0){
                        let boxAvatar = document.getElementById("avatar");
                        boxAvatar.src = "http://127.0.0.1/Daily/" + accountProfile.anh_bia;
                        let boxAvatarSmall = document.getElementById("avatar-small");
                        boxAvatarSmall.src =  "http://127.0.0.1/Daily/" + accountProfile.anh_bia;
                    }
                    if (accountProfile.ngay_sinh != undefined && accountProfile.ngay_sinh != null && (accountProfile.ngay_sinh.trim()).length != 0){
                        const myArray = accountProfile.ngay_sinh.split("-");
                        document.querySelector(".day").value = parseInt(myArray[2]);
                        document.querySelector(".month").value = parseInt(myArray[1]);
                        document.querySelector(".year").value = parseInt(myArray[0]);
                    }
                    if (accountProfile.gioi_tinh != undefined && accountProfile.gioi_tinh != null && (accountProfile.gioi_tinh.trim()).length != 0){
                        var getGenderValue = document.querySelectorAll('input[name="gender"]');   
                        getGenderValue.forEach(function(currentValue, index, array){
                            if(currentValue.value == accountProfile.gioi_tinh ) {   
                                currentValue.checked = "true";
                                return;
                            }  
                        })
                    }

                    // Quan trọng - Click vào khung avatar thì input type = file cũng được click
                    $('.avatar-view').on('click', function(e){
                        document.getElementById('file').click();
                    });
                

                    $('.form-info-user').on('submit', function (e) {
                        e.preventDefault();
            
                        var name = $('#name').val();
                        var email = $('#email').val();
                        var phone = $('#phone').val();
                        var avatar = $('#file').val();

                        // Lấy thông tin Ngày Tháng Năm sinh
                        var dayBirth = document.querySelector(".day").value;
                        var monthBirth = document.querySelector(".month").value;
                        var yearBirth = document.querySelector(".year").value;

                        //Lấy thông tin giới tính
                        var getSelectedValue = document.querySelector( 'input[name="gender"]:checked');   
                    
                        let isPhoneValid = checkPhone();
                        let isEmailValid = checkEmail();
                        let isNameValid = checkName();
                        let isBDValid = checkBirthDay();
            
                        let isFormValid = isPhoneValid && isEmailValid && isNameValid && isBDValid;
                
                        if (isFormValid == true && (document.querySelector(".note-avatar-small-1").style.color!="red")) {
                            //Khi form đúng mới cho phép lưu những thay đổi khách hàng thực hiện vào cơ sở dữ liệu 
                            //1. Kiểm tra khách hàng có thay đổi thông tin không
                            if (String(name) != String(accountProfile.ho_ten) || String(email) != String(accountProfile.email) || String(phone) != String(accountProfile.so_dien_thoai) 
                            || (document.querySelector(".note-avatar-small-1").style.color == "var(--main-color)")
                            || (dayBirth!=0 && monthBirth!=0 && yearBirth!=0) 
                            || (getSelectedValue != null) ){    

                                if (avatar.length != 0 && document.querySelector(".note-avatar-small-1").style.color == "var(--main-color)"){
                                    //Phải upload hình ảnh lên server trước (Folder:uploads/UserAvatar) rồi mới lưu database
                                    console.log('Khach hang da chon dung hinh. Phai cap nhat len co so du lieu');
                                    $.ajax({
                                        type: "POST",
                                        url: "http://127.0.0.1/Daily/Account/fileUploadScript",
                                        data: new FormData(this),
                                        contentType: false,
                                        cache: false,
                                        processData: false,
                                        success: function(data){
                                            if(data != "0"){
                                                var file = data;
                                                $.ajax({
                                                    type: "POST",
                                                    url: "http://127.0.0.1/Daily/Account/updateInfoUser",
                                                    data: {
                                                        name: name,
                                                        email: email,
                                                        phone: phone,
                                                        token: token,
                                                        avatar: file,
                                                        day: dayBirth,
                                                        month: monthBirth,
                                                        year: yearBirth,
                                                        gender: getSelectedValue.value,
                                                    },
                                                    success: function (data) {
                                                        if(data!= "0"){
                                                            showToast('Complete', 'success', 'Cập nhật thông tin thành công.', 2000);
                                                            localStorage.setItem("fullname",JSON.stringify(name));
                                                            document.querySelector(".note-avatar-small-1").style.color= "#999";
                                                            document.querySelector(".note-avatar-small-2").style.color= "#999";
                                                            document.getElementById("avatar-small").src = "http://127.0.0.1/Daily/" + file;
                                                            document.querySelector(".main-top-header-user-title").innerHTML = `${name}`;
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
                                else if (String(name) != String(accountProfile.ho_ten) || String(email) != String(accountProfile.email) || String(phone) != String(accountProfile.so_dien_thoai)
                                || (dayBirth!=0 && monthBirth!=0 && yearBirth!=0)
                                || (getSelectedValue != null) ){
                                    var adata = {
                                        name: name,
                                        email: email,
                                        phone: phone,
                                        token: token,
                                        day: dayBirth,
                                        month: monthBirth,
                                        year: yearBirth,
                                        gender: getSelectedValue.value,
                                    };
                                    //Lưu những thay đổi vào Database
                                    $.ajax({
                                        url: "http://127.0.0.1/Daily/Account/updateInfoUser",
                                        type: "POST",
                                        data: adata,
                                        success: function (data) {
                                            if(data!= "0"){
                                                showToast('Complete', 'success', 'Cập nhật thông tin thành công (No Image).', 2000);
                                                localStorage.setItem("fullname",JSON.stringify(name));
                                                document.querySelector(".main-top-header-user-title").innerHTML = `${name}`;
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
                        }
                        else {
                            showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin.', 2000);
                        }
                    });
            
                    //Bắt lỗi Form
                    const emailEl = document.querySelector('#email');
                    const phoneEl = document.querySelector('#phone');
                    const nameEl = document.querySelector('#name');
                    const smallAll = document.getElementsByClassName('.small');
                    const dayEl = document.querySelector('#day');
                    const monthEl = document.querySelector('#month');
                    const yearEl = document.querySelector('#year');
                    const birthdayEl = document.querySelector('.Style__StyledBirthdayPicker');

                    const checkBirthDay = () =>{
                        let valid = false;
                        const dayQQ = dayEl.value.trim();
                        const monthQQ = monthEl.value.trim();
                        const yearQQ = yearEl.value.trim();

                        if (dayQQ == 0 && monthQQ == 0 && yearQQ == 0){
                            showSuccess(birthdayEl);
                            valid = true;
                        }
                        else if (dayQQ != 0 && monthQQ != 0 && yearQQ != 0){
                            showSuccess(birthdayEl);
                            valid = true;
                        }
                        else if (dayQQ != 0 || monthQQ != 0 || yearQQ != 0){
                            showError(birthdayEl, 'Không được để trống! (dd/mm/yyyy)');
                        }
                        return valid;
                    };

                    const checkEmail = () => {
                        let valid = false;
                        const emailQQ = emailEl.value.trim();
                        if (!isRequired(emailQQ)) {
                            showError(emailEl, 'Không được để trống !');
                        } else if (!isEmailValid(emailQQ)) {
                            showError(emailEl, 'Email không hợp lệ.');
                        } else {
                            showSuccess(emailEl);
                            valid = true;
                        }
                        return valid;
                    };
                    
                    const checkName = () => {
                        let valid = false;
                        const nameEla = nameEl.value.trim();
                        if (!isRequired(nameEla)) {
                            showError(nameEl, 'Không được để trống !');
                        } else if (containsSpecialChars(nameEla)) {
                            showError(nameEl, 'Không được chứa ký tự đặc biệt !');
                        } else {
                            showSuccess(nameEl);
                            valid = true;
                        }
                        return valid;
                    };
                    
                    const checkPhone = () => {
                        let valid = false;
                        const min = 10;
                        const phone = phoneEl.value.trim();
                        if (!isRequired(phone)) {
                            showError(phoneEl, 'Số điện thoại không được để trống !');
                        } else if (!isBetween(phone.length, min, min)) {
                            showError(phoneEl, `Số điện thoại gồm ${min} kí tự và kiểu số.`);
                        } else {
                            showSuccess(phoneEl);
                            valid = true;
                        }
                        return valid;
                    };
                    
                    const isEmailValid = (email) => {
                        const re =
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(email);
                    };
                    const isPhoneValid = (phone) => {
                        const re = preg_match('/^[0][d]{9,10}$/');
                        return re.test(phone);
                    };
                    const isRequired = (value) => (value === '' ? false : true);
                    const isBetween = (length, min, max) => (length < min || length > max ? false : true);
                    
                    const showError = (input, message) => {
                        // get the form-field element
                        const formField = input.parentElement;
                        // add the error class
                        formField.classList.remove('success');
                        formField.classList.add('error');
                    
                        // show the error message
                        const error = formField.querySelector('#form-info-user small');
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
                    document.querySelector('#form-info-user').addEventListener('submit', function (e) {
                        hienthibaoloi__();
                        e.preventDefault();
                        let isPhoneValid = checkPhone();
                        let isEmailValid = checkEmail();
                        let isNameValid = checkName();
                        let isBirthdayValid = checkBirthDay();
                        let isFormValid =
                            isPhoneValid && isEmailValid && isNameValid && isBirthdayValid;
                    });
                    
                    document.querySelector('#form-info-user').addEventListener(
                        'input',
                        debounce(function (e) {
                            switch (e.target.id) {
                                case 'email':
                                    checkEmail();
                                    break;
                                case 'phone':
                                    checkPhone();
                                    break;
                                case 'name':
                                    checkName();
                                    break;
                                case 'day':
                                    checkBirthDay();
                                    break;
                                case 'month':
                                    checkBirthDay();
                                    break;
                                case 'year':
                                    checkBirthDay();
                                    break;
                            }
                        }),
                    );
                    
                    //Hàm kiểm tra các ký tự đặc biệt
                    function containsSpecialChars(str) {
                        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        return specialChars.test(String(str));
                    }
                    function containsSpecialCharsAddress(str) {
                        const specialChars = /[`!@#$%^&*+=\[\]{};':"\|<>~]/;
                        return specialChars.test(String(str));
                    }
                
                }
            },
            error: function(){
                showToast('Error', 'error', 'Có lỗi xảy ra.', 2000);
            }
        });
    }
});

function loadFile(event) {
    var image = document.querySelector('.avatar');
    if (event.target.files[0] != null){
        if(event.target.files[0].size > 500000) { //1000000
            document.querySelector(".note-avatar-small-1").style.color= "red";
            document.querySelector(".note-avatar-small-2").style.color= "red";
            return false;
        }
        else{
            image.src = URL.createObjectURL(event.target.files[0]);
            document.querySelector(".note-avatar-small-1").style.color= "var(--main-color)";
            document.querySelector(".note-avatar-small-2").style.color= "var(--main-color)";
            return true;
        }   
    } 
};