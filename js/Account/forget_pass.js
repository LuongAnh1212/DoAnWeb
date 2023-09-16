$('#forgotP-form').on('submit', function (e) {
    document.querySelector('#btn-forgotPass').disabled = true;

    //Kiểm tra, gửi mail cho khách hàng xác nhận
    e.preventDefault();
    var email = $('#email').val();
    let isEmailValid = checkEmail();
    let isFormValid = isEmailValid;

    if (isFormValid == true) {
        var adata = {
            email: email,
        };
        $.ajax({
            url: 'http://127.0.0.1/Daily/Account/forgotPass',
            type: 'POST',
            data: adata,
            success: function (data) {
                console.log(data)
                if (data != 2) {
                    showToast('Error', 'error', 'Email chưa có tài khoản.', 2000);
                    document.querySelector('#btn-forgotPass').disabled = false;
                } else {
                    document.querySelector('section.forgotP').style.display = 'none';
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
                                            Đổi Mật Khẩu
                                            </li>
                                        </ul>
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div class="thongbao_dky">
                                        <div class="section-content">
                                            <img src="http://127.0.0.1/Daily/images/Account/email.png" alt="Xem Email">
                                            <p class="p1">Bạn đã thay đổi mật khẩu thành công
                                            </p>
                                            <p class="p2">Vui lòng kiểm tra hộp thư mail để nhận mật khẩu mới.</p>
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
                document.querySelector('#btn-forgotPass').disabled = false;
            },
        });
    }
    else {
        showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin.', 2000);
        document.querySelector('#btn-forgotPass').disabled = false;
    }
});

//Bắt lỗi Form
const emailEl = document.querySelector('#email');
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

const isEmailValid = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    const error = formField.querySelector('#forgotP-form small');
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

document.querySelector('#forgotP-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let isEmailValid = checkEmail();
    let isFormValid = isEmailValid;
});

document.querySelector('#forgotP-form').addEventListener(
    'input',
    debounce(function (e) {
        switch (e.target.id) {
            case 'email':
                checkEmail();
                break;
        }
    }),
);
