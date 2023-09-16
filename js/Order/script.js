$(document).ready(function () {
    let tokenUser = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : [];
    
    if (tokenUser != undefined && tokenUser.length != 0) {
        let apiUserInfor = `http://127.0.0.1/Daily/UserInfo/getInfo/${tokenUser}`;
        fetch(apiUserInfor)
            .then((res) => res.json())
            .then((dataD) => {
                dataD.forEach((data) => {
                    let content1 = `
						<div class="title_info_cus">
							<div class="icon_info_cus">
								<i class="fas fa-user"></i>
							</div>
							<div>Khách hàng</div>
						</div>
                        <input type="text" name="nameCus" class="field-input nameCus" disabled="true" value="${data.ho_ten}" placeholder="${data.ho_ten}" style="margin-bottom: 0.1em;"/>
                        `;
                    document.querySelector(".khachhang").innerHTML = content1;

					let content2 = `
						<div class="title_info_cus">
							<div class="icon_info_cus">
								<i class="fas fa-phone"></i>
							</div>
							<div>Số điện thoại</div>
						</div>
                        <input type="text" name="sdtCus" class="field-input sdtCus" disabled="true" value="${data.so_dien_thoai}" placeholder="${data.so_dien_thoai}" style="margin-bottom: 0.1em;"/>
						`;
                    document.querySelector(".sdtKH").innerHTML = content2;

					let content3 = `
						<div class="title_info_cus">
							<div class="icon_info_cus">
								<i class="fas fa-map-marker-alt"></i>
							</div>
							<div>Địa chỉ nhận hàng</div>
						</div>
                        <input type="text" name="address" class="field-input address" id="addressE" disabled="true" value="${data.dia_chi}" placeholder="${data.dia_chi}" style="margin-bottom: 0.1em;"/>
                        
						<div class="change_info">
							<a href="/UserInfo" style="color: gray;font-size: 0.8em;">Bạn muốn thay đổi thông tin !</a>
						</div>`;
						
                    document.querySelector(".diachigiaohang").innerHTML = content3;

                })
                return dataD;
            })
            .then((dataD) => {
                console.log(dataD);
                var fullname = dataD[0].ho_ten;
                var email = dataD[0].email;
                var phone = dataD[0].so_dien_thoai;
                let token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : [];

                $.ajax({
                    url: 'http://127.0.0.1/Daily/Cart/getCartId',
                    type: 'POST',
                    data: { authorization: token },
                    success: function (data) {
                        var cart_id = data;
                        if (data != '0') {
                            let apiCarts = `http://127.0.0.1/Daily/api/chitietgiohang/${data}`;
                            fetch(apiCarts)
							.then((res) => res.json())
							.then((carts) => {
								console.log(carts);
								if (carts.length != 0) {
									var totalOfOrder = 0;
									for (var i = 0; i < carts.length; i++) {
										var image = carts[i].hinhanh_sp;
										var quantity = parseFloat(carts[i].so_luong_sp);
										var name = carts[i].ten_san_pham;
										var price = parseFloat(Math.floor(carts[i].gia_sp));
										var totalOfP = parseFloat(quantity * price);
										totalOfOrder += totalOfP;
										var sttProduct = i+1;
										let content = ` 
										<tr>
												<td>${sttProduct}</td>
												<td class="cothinh_xacnhandon"><img
													src="${image}" alt=""></td>
												<td style="width:50%;">${name}</td>
												<td class ="sss"> ${quantity} </td>
												<td class="eee">${formatCash(totalOfP)} <sup><u>đ</u></sup> </td>
										</tr>`;
	
										document
											.querySelector('.thongtinsanpam_xacnhandon')
											.insertAdjacentHTML('beforeend', content);
									}
									let content = `
									<tr class="thanhtien_xnhandon">
												<td colspan="4">
												<b>Tổng Tiền :</b>
												</td>
												<td class="ttien_xnhandon">
												<b> ${formatCash(totalOfOrder)} <sup><u>đ</u></sup></b>
												</td>
												</tr> 
									`;
									document
										.querySelector('.thongtinsanpam_xacnhandon')
										.insertAdjacentHTML('beforeend', content);

									document.querySelector('.InputUID').value = data; //Gio hang ID
									document.querySelector('.InputUID_ttnh').value = data; //Gio hang ID

									$('.btn_change_pttt').on('click',function(e){
										document.querySelector(".box-choose-pttt").style.display = "flex";
									});
									$('.btn-close-box-choose-pttt').on('click', function(e){
										document.querySelector(".box-choose-pttt").style.display = "none";
									})
									$('.btn-pttt-cod').on('click', function(e){
										document.querySelector(".box-choose-pttt").style.display = "none";
										document.querySelector(".select_pttt").style.color = "#ee4d2d";
									})

									$('.check-order-form').on('submit', function (e) {
										e.preventDefault();
										tools__.confirm('show', 'Xác nhận đơn hàng', () => {
											var address = $('.address').val();
											var note = $('.note').val();
												let isNoteValid = checkNote();
												let isFormValid = isNoteValid;
												if (isFormValid == true){
													window.location = `http://127.0.0.1/Daily/Order/success?extraData=${data}&orderId=${run_key(7)}`;
													
													console.log("Xac nhan thanh toan");
													tools__.displayOpacity('hidden');
												} else {
													tools__.displayOpacity('hidden');
													showToast('Error', 'error', 'Vui lòng kiểm tra và nhập đúng thông tin.', 2000);
												}
										});
									});
								}
							})
                        } else {
                            showToast('Error', 'error', 'Có lỗi xãy ra.', 2000);
                        }
                    },
                });
            });
    }
});

// Tạo order_id (Ma don hang)
function run_key(length) {
	const d = new Date();
	var result = String(d.getTime());
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
	  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

//Bắt lỗi Form
const noteEl = document.querySelector('#noteE');

const checkNote = () => {
    let valid = false;
    const noteEla = noteEl.value.trim();
    if (containsSpecialCharsNote(noteEla)) {
        showError(noteEl, 'Không được chứa ký tự đặc biệt !');
    } else {
        showSuccess(noteEl);
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
    const error = formField.querySelector('#contact-form small');
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
// document.querySelector('#contact-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     let isNoteValid = checkNote();
//     let isFormValid = isNoteValid;
// });

// document.querySelector('#contact-form').addEventListener(
//     'input',
//     debounce(function (e) {
//         switch (e.target.id) {
//             case 'noteE':
//                 checkNote();
//                 break;
//         }
//     }),
// );

//Hàm kiểm tra các ký tự đặc biệt
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(String(str));
}
function containsSpecialCharsNote(str) {
    const specialChars = /[`!@#$%^&*_+\-=\[\]{};'"\|<>~]/;
    return specialChars.test(String(str));
}
