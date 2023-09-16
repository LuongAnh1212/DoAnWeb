<div id="toast"></div>
<div class="box-title">
    <div class="box-title-main">
        <p><a href="http://127.0.0.1/Daily/Home" style="color:black;text-decoration: none;">Trang chủ</a> / Đăng nhập</p>
    </div>
</div>
<section class="login-main">
<section class="login container">
    <form action="" id="login-form" method="POST">
        <h3>Đăng nhập</h3>
        <div class="other">
            <div class="form-signin">
                <div class="info">
                    <label for="customer_email" class="icon-field">
                        <i class="fa-solid fa-envelope"></i>
                    </label>
                    <input type="email" id="email" placeholder="Email" />
                    <div style = "padding-left: 15%;"><small></small></div>
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
            </div>

            <a href="<?php echo base_url();?>Account/Forgot_Pass" class="forgot">Quên mật khẩu?</a>
            <div class="button">
                <button type="submit" class="btn btn-info" id="btn-login">
                    Đăng nhập
                </button>
            </div>
            <a href="<?php echo base_url();?>Account/Register" class="dkytk">Chưa có tài khoản?</a>
        </div>
    </form>
</section>
</section>

<script src="http://127.0.0.1/Daily/js/Account/login.js?v=1.0"></script>
