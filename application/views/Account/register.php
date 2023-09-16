<div id="toast"></div>
<div class="box-title">
    <div class="box-title-main">
        <p><a href="http://127.0.0.1/Daily/Home" style="color:black;text-decoration: none;">Trang chủ</a> / Đăng ký</p>
    </div>
</div>
<section class="register-main">
<section class="login dangky container">
    <form action="" id="register-form" method="POST">
        <h3>Đăng ký</h3>
        <div class="other">
            <div class="form-signin">
                <div class="info">
                    <label for="customer_email" class="icon-field">
                        <i class="fas fa-address-card"></i>
                    </label>
                    <input type="text" id="name" placeholder="Họ và tên" />
                    <div style = "padding-left: 15%;"><small class="small"></small></div>
                </div>
                <div class="info">
                    <label for="customer_email" class="icon-field">
                        <i class="bi bi-telephone-fill"></i>
                    </label>
                    <input type="text" id="phone" placeholder="Số điện thoại" />
                    <div style = "padding-left: 15%;"><small class="small"></small></div>
                </div>
                <div class="info">
                    <label for="customer_email" class="icon-field">
                        <i class="fa-solid fa-envelope"></i>
                    </label>
                    <input type="email" id="email" placeholder="Email" />
                    <div style = "padding-left: 15%;"><small class="small"><?php if(!empty($email_exist)){echo $email_exist;}?></small></div>
                </div>
                <div class="info">
                    <label for="customer_email" class="icon-field">
                        <i class="fas fa-address-card"></i>
                    </label>
                    <input type="text" id="address" placeholder="Địa chỉ" />
                    <div style = "padding-left: 15%;"><small class="small"></small></div>
                </div>
                <div class="info">
					<div class="info_pass">
						<label for="customer_email" class="icon-field">
							<i class="fa-solid fa-lock"></i>
						</label>
						<input type="password" style="margin-left: 1px;" id="pass" class="passW" placeholder="Mật khẩu" />
						<i class="fas fa-eye-slash" id="togglePassword" style="margin-left: -30px; margin-top: 15px; cursor: pointer;"></i>
					</div>
                    <div style = "padding-left: 15%;"><small class="small"></small></div>
                </div>
                <div class="info">
					<div class="info_pass">
						<label for="customer_email" class="icon-field">
							<i class="fa-solid fa-lock"></i>
						</label>
						<input type="password" style="margin-left: 1px;" id="repass" class="passW" placeholder="Nhập lại mật khẩu"/>
						<i class="fas fa-eye-slash" id="toggleRePassword" style="margin-left: -30px; margin-top: 15px; cursor: pointer;"></i>
					</div>
                    <div style = "padding-left: 15%;"><small class="small"></small></div>
                </div>
            </div>
            <div class="button">
                <button type="submit" class="btn btn-info" id="btn-register">
                    Đăng ký
                </button>
                <a href="<?php echo base_url();?>Account/Login" class="dkytk">
                        Đã có tài khoản?
                </a>
            </div>
        </div>
    </form>
</section>
</section>

<div class="dkysuccess">

</div>
<script src="http://127.0.0.1/Daily/js/Account/register.js?v=0.6"></script>

