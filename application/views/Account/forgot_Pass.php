<div id="toast"></div>
<div class="box-title">
    <div class="box-title-main">
        <p><a href="http://127.0.0.1/Daily/Home" style="color:black;text-decoration: none;">Trang chủ</a> / Quên Mật Khẩu</p>
    </div>
</div>
<section class="forgot-pass-main">
<section class="login forgotP container">
    <h3>Quên mật khẩu</h3>
    <form action="" id="forgotP-form" method="POST">
        <div class="other">
            <div class="form-signin">
                <div class="info">
                    <label for="customer_email" class="icon-field">
                        <i class="fa-solid fa-envelope"></i>
                    </label>
                    <input type="email" id="email" placeholder="Email" />
                    <div style = "padding-left: 15%;"><small class="small"><?php if(!empty($email_exist)){echo $email_exist;}?></small></div>
                </div>
                <a href="<?php echo base_url();?>Account/Login"  class="forgot">Đã có tài khoản ?</a>
                <div class="button">
                    <button type="submit" class="btn btn-info" id="btn-forgotPass">
                        Gửi liên hệ
                    </button>
                </div>
                <a href="<?php echo base_url();?>Account/Register" class="dkytk">Tạo tài khoản mới</a>
            </div>
        </div>
    </form>
</section>
</section>

<div class="dkysuccess">

</div>

<script src="http://127.0.0.1/Daily/js/Account/forget_pass.js?v=1.8"></script>
