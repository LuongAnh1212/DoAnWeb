$('#register-form').on('submit', function (e) {
    document.querySelector('#btn-register').disabled = true;

    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var pass = $('#pass').val();

    let isEmailValid = checkEmail();
    let isNameValid = checkName();
    let isPassValid = checkPass();

    let isFormValid = isEmailValid && isNameValid && isPassValid;

    if (isFormValid == true) {
        var adata = {
            name: name,
            email: email,
            pass: pass,
        };
        $.ajax({
        url: 'http://127.0.0.1/Daily/Admin/addAdmin',
        type: 'POST',
        data: adata,
        success: function (data) {
            if (data == 2) {
                showToast('Error', 'error', 'Email đã có tài khoản.', 2000);
                document.querySelector('#btn-register').disabled = false;
            } else {
                document.querySelector('div.dangky').style.display = 'none';
                function Sucess() {
                    document.querySelector('div.dkysuccess').innerHTML = `<div class="container">
                    <div class="row">
                        <div class="col-lg-12 cot7_xnhandon">
                        <div class="table-responsive">
                            <form action="" method="post">
                            <table class="table" border="0">
                                <tr>
                                </tr>
                                <tr>
                                <td>
                                    <div class="thongbao_dky">
                                    <div class="section-content">
                                        <img src="http://127.0.0.1/Daily/images/Account/email.png" alt="" style="width: 100px; margin-bottom: 10px;">
                                        <p class="p1">Chúc mừng bạn đã đăng ký tài khoản thành công
                                        </p>
                                        <p class="p2">Vui lòng chờ SuperAdmin kích hoạt tài khoản</p>
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
        },
        error: function () {
            showToast('Error', 'error', 'Có lỗi xảy ra - ERROR1', 2000);
            document.querySelector('#btn-register').disabled = false;
        }
        });
    }
    else{
        showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin.', 2000);
        document.querySelector('#btn-register').disabled = false;
    }
});

//Bắt lỗi Form
const emailEl = document.querySelector('#email');
const nameEl = document.querySelector('#name');
const passEl = document.querySelector('#pass');
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

const isEmailValid = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    let isEmailValid = checkEmail();
    let isNameValid = checkName();
    let isPassValid = checkPass();
    let isFormValid = isEmailValid && isNameValid && isPassValid;
});

document.querySelector('#register-form').addEventListener(
    'input',
    debounce(function (e) {
        switch (e.target.id) {
            case 'email':
                checkEmail();
                break;
            case 'name':
                checkName();
                break;
            case 'pass':
                checkPass();
                break;
        }
    }),
);

//Hàm kiểm tra các ký tự đặc biệt
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(String(str));
}