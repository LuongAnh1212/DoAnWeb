$(document).ready(function () {
    //Background color of Nav
    let navAction = document.querySelectorAll(".Account__StyleNav li a");
    navAction[2].classList.add("is-active");

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

                    if (accountProfile.anh_bia != undefined && accountProfile.anh_bia != null && (accountProfile.anh_bia.trim()).length != 0){
                        let boxAvatarSmall = document.getElementById("avatar-small");
                        boxAvatarSmall.src =  "http://127.0.0.1/Daily/" + accountProfile.anh_bia;
                    }

                    $('.changeP-form').on('submit', function (e) {
                        e.preventDefault();

                        var oPass = $('#pass_old').val();
                        var newPass = $('#pass_new').val();
                        var reNewPass = $('#reset_pass_new').val();
                        console.log(oPass);
                        console.log(newPass);
                        console.log(reNewPass);
                        console.log(token);

                        let isPassValid = checkPass();
                        let isRePassValid = checkRePass();
            
                        let isFormValid = isPassValid && isRePassValid;
                
                        if (isFormValid == true) {
                            console.log('form dung');
                            $.ajax({
                                type:"POST",
                                url: "http://127.0.0.1/Daily/Account/changePassWord",
                                data:{
                                    old_pass: oPass,
                                    newPass: newPass,
                                    token: token,
                                },
                                success: function(data){
                                    console.log(data);
                                    if (data.trim() != "0"){
                                        showToast('Complete', 'success', 'Cập nhật Mật khẩu thành công.', 2000);
                                        document.querySelector('#pass_old').value = "";
                                        document.querySelector('#pass_new').value = "";
                                        document.querySelector('#reset_pass_new').value = "";

                                        //Sau khi nhập mật khẩu thành công 
                                        //Xóa token và chuyển đến trang đăng nhập yêu cầu khách hàng đăng nhập lại.
                                    }
                                    else{
                                        showToast("Error","error", "Mật khẩu cũ không đúng",2000);
                                    }
                                },
                                error: function(data){
                                    showToast("Error","error", "Lỗi",2000);
                                }
                            });
                        }
                        else {
                            showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin.', 2000);
                        }
                    });
                }

                //Bắt lỗi form
                const oPassEl = document.querySelector('#pass_old');
                const passEl = document.querySelector('#pass_new');
                const rePassEl = document.querySelector('#reset_pass_new');
                const smallAll = document.getElementsByClassName('.small');

                const checkOldPass = () => {
                    let valid = false;
                    const opassEla = oPassEl.value;
                    if (!isRequired(opassEla)) {
                        showError(oPassEl, 'Không được để trống !');
                    } else {
                        showSuccess(oPassEl);
                        valid = true;
                    }
                    return valid;
                };

                const checkPass = () => {
                    let valid = false;
                    const passEla = passEl.value;
                    if (!isRequired(passEla)) {
                        showError(passEl, 'Không được để trống !');
                    } else {
                        showSuccess(passEl);
                        valid = true;
                    }
                    return valid;
                };
                
                const checkRePass = () => {
                    let valid = false;
                    const rePassEla = rePassEl.value;
                    if (!isRequired(rePassEla)) {
                        showError(rePassEl, 'Không được để trống !');
                    } else if (String(rePassEla) != String(passEl.value)) {
                        showError(rePassEl, 'Không khớp !');
                    } else {
                        showSuccess(rePassEl);
                        valid = true;
                    }
                    return valid;
                };

                const isRequired = (value) => (value === '' ? false : true);

                const showError = (input, message) => {
                    // get the form-field element
                    var formField = input.parentElement;

                    if (input.classList == "passW"){
                        formField = input.parentElement.parentElement;
                    }
                
                    // add the error class
                    formField.classList.remove('success');
                    formField.classList.add('error');
                
                    // show the error message
                    const error = formField.querySelector('#changeP-form small');
                    error.textContent = message;
                };
                
                const showSuccess = (input) => {
                    // get the form-field element
                    var formField = input.parentElement;
                    
                    if (input.classList == "passW"){
                        formField = input.parentElement.parentElement;
                    }
                
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
                
                document.querySelector('#changeP-form').addEventListener('submit', function (e) {
                    e.preventDefault();
                    let isPassValid = checkPass();
                    let isRePassValid = checkRePass();
                    let isOldPassValid = checkOldPass();
                    let isFormValid = isPassValid && isRePassValid && isOldPassValid;
                });
                
                document.querySelector('#changeP-form').addEventListener(
                    'input',
                    debounce(function (e) {
                        switch (e.target.id) {
                            case 'pass_old':
                                checkOldPass();
                                break;
                            case 'pass_new':
                                checkPass();
                                checkRePass();
                                break;
                            case 'reset_pass_new':
                                checkRePass();
                                break;
                        }
                    }),
                );
            },
            error: function(){
                showToast('Error', 'error', 'Có lỗi xảy ra.', 2000);
            }
        });
    }
});