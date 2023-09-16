$('#register-form').on('submit', function (e) {
    document.querySelector('#btn-register').disabled = true;

    //Kiểm tra, gửi mail cho khách hàng xác nhận
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var address = $('#address').val();
    var pass = $('#pass').val();
    var repass = $('#repass').val();

    let isPhoneValid = checkPhone();
    let isEmailValid = checkEmail();
    let isNameValid = checkName();
    let isAddValid = checkAddress();
    let isPassValid = checkPass();
    let isRePassValid = checkRePass();

    let isFormValid =
        isPhoneValid && isEmailValid && isNameValid && isAddValid && isPassValid && isRePassValid;

    if (isFormValid == true) {
        var adata = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            pass: pass,
            repass: repass,
        };
        console.log(adata);
        $.ajax({
            url: 'http://127.0.0.1/Daily/Account/addUser',
            type: 'POST',
            data: adata,
            success: function (data) {
                console.log(data);
                if (data == 2) {
                    showToast('Error', 'error', 'Email đã có tài khoản.', 2000);
                    document.querySelector('#btn-register').disabled = false;
                } else {
                    document.querySelector('section.dangky').style.display = 'none';
                    function Sucess() {
                        document.querySelector('div.dkysuccess').innerHTML = `<div class="container">
                        <div class="row">
                            <div class="col-lg-12 cot7_xnhandon">
                            <div class="table-responsive">
                                <form action="" method="post">
                                <table class="table table-bordered" border="0">
                                    <tr>
                                    <td colspan="4">
                                        <div class="main-header">
                                        <ul class="breadcrumb">
                    
                                            <li class="breadcrumb-item">
                                            <a class="giohang" href="#">Tài Khoản</a>
                                            </li>
                                            <li class="breadcrumb-item breadcrumb-item-current">
                                            Đăng Ký
                                            </li>
                                        </ul>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div class="thongbao_dky">
                                        <div class="section-content">
                                            <img src="http://127.0.0.1/Daily/images/Account/email.png" alt="">
                                            <p class="p1">Chúc mừng bạn đã đăng ký tài khoản thành công
                                            </p>
                                            <p class="p2">Vui lòng kiểm tra hộp thư mail để kích hoạt tài khoản</p>
                                        </div>
                                        </div>
                                    </td>
                                    </tr>
                                </table>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>`;
                    }
                    Sucess();
                }
                // setTimeout(Sucess, 500);
            },
            error: function () {
                showToast('Error', 'error', 'Có lỗi xảy ra - ERROR1', 2000);
                document.querySelector('#btn-register').disabled = false;
            },
        });
    }
    else {
        showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin.', 2000);
        document.querySelector('#btn-register').disabled = false;
    }
});

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#pass');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const typePass = password.getAttribute('type') === 'password' ? 'text' : 'password';
	
    // toggle the eye slash icon
	if (typePass == 'text'){
		this.classList.remove('fa-eye-slash');
		this.classList.add('fa-eye');
	}
	else{
		this.classList.remove('fa-eye');
		this.classList.add('fa-eye-slash');
	}
    password.setAttribute('type', typePass);
});

const toggleRePassword = document.querySelector('#toggleRePassword');
const rePassword = document.querySelector('#repass');

toggleRePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const typePass = password.getAttribute('type') === 'password' ? 'text' : 'password';
	
    // toggle the eye slash icon
	if (typePass == 'text'){
		this.classList.remove('fa-eye-slash');
		this.classList.add('fa-eye');
	}
	else{
		this.classList.remove('fa-eye');
		this.classList.add('fa-eye-slash');
	}
    rePassword.setAttribute('type', typePass);
});

//Bắt lỗi Form
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const nameEl = document.querySelector('#name');
const addressEl = document.querySelector('#address');
const passEl = document.querySelector('#pass');
const rePassEl = document.querySelector('#repass');
const smallAll = document.getElementsByClassName('.small');

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

const checkAddress = () => {
    let valid = false;
    const addressEla = addressEl.value.trim();
    if (!isRequired(addressEla)) {
        showError(addressEl, 'Không được để trống !');
    } else if (containsSpecialCharsAddress(addressEla)) {
        showError(addressEl, 'Không được chứa ký tự đặc biệt !');
    } else {
        showSuccess(addressEl);
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
    var formField = input.parentElement;
	if (input.classList == "passW"){
		formField = input.parentElement.parentElement;
	}

    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('#register-form small');
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

document.querySelector('#register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let isPhoneValid = checkPhone();
    let isEmailValid = checkEmail();
    let isNameValid = checkName();
    let isAddValid = checkAddress();
    let isPassValid = checkPass();
    let isRePassValid = checkRePass();
    let isFormValid = isPhoneValid && isEmailValid && isNameValid && isAddValid && isPassValid && isRePassValid;
});

document.querySelector('#register-form').addEventListener(
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
            case 'address':
                checkAddress();
                break;
            case 'pass':
                checkPass();
                checkRePass();
                break;
            case 'repass':
                checkRePass();
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
