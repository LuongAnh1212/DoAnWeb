<div id="toast"></div>
<div class="box-title">
    <div class="box-title-main">
        <p>Trang chủ / Tài khoản</p>
    </div>
</div>
<div class="account-edit-main"> 
    <div class="container container-edit"style="padding-bottom: 3em;padding-top: 3em;">
        <aside class="info-left">
            <div class="Account__StyleAvatar">
                <div class="box-avatar-small">
                    <img src="http://127.0.0.1/Daily/images/Account/avatar.jpg?asid=853767258347235&amp;height=200&amp;width=200&amp;ext=1542949868&amp;hash=AeRP2lPwJnZkxG7f" alt="avatar" id="avatar-small">
                </div>
                <div class="info-account">Tài khoản của<strong>Phương Anh</strong></div>
            </div>

            <ul class="Account__StyleNav">
                <li>
                    <a class="" href="http://127.0.0.1/Daily/Account/Edit">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                        </svg>
                        <span>Thông tin tài khoản</span>
                    </a>
                </li>
                <li>
                    <a class="" href="">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                        </svg>                        
                        <span>Sổ địa chỉ</span>
                    </a>
                </li>
                <li>
                    <a class="" href="http://127.0.0.1/Daily/Account/Change_Pass">
                        <i class="fas fa-lock"></i>
                        <span>Đổi mật khẩu</span>
                    </a>
                </li>
                <li>
                    <a class="" href="">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
                        </svg>
                        <span>Thông báo của tôi</span>
                    </a>
                </li>
                <li>
                    <a class="" href="http://127.0.0.1/Daily/Account/Order">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path>
                        </svg>
                        <span>Quản lý đơn hàng</span>
                    </a>
                </li>
            </ul>
        </aside>
        <div class="info-right">
            <div class="Style__Heading">Đổi Mật Khẩu</div>

            <div class="Styles__InfoPage">
                <div class="info-change-pass">
                    <span class="info-title">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
                    <section class="changeP">
                        <form action="" id="changeP-form" class="changeP-form"  method="POST">
                            <div class="other">
                                <div class="form-signin">
                                    <div class="info-change">
                                        <label for="customer_email" class="icon-field">
                                            <i class="fa-solid fa-lock"></i>
                                        </label>
                                        <input type="text" id="pass_old" placeholder="Mật khẩu cũ" />
                                        <br/>
                                        <small style="padding-left: 65px;"></small>
                                    </div>
                                    <div class="info-change">
                                        <label for="customer_email" class="icon-field">
                                            <i class="fa-solid fa-lock"></i>
                                        </label>
                                        <input type="text" id="pass_new" placeholder="Mật khẩu mới" />
                                        <br/>
                                        <small style="padding-left: 65px;"></small>
                                    </div>
                                    <div class="info-change">
                                        <label for="customer_email" class="icon-field">
                                            <i class="fa-solid fa-lock"></i>
                                        </label>
                                        <input type="text" id="reset_pass_new" placeholder="Nhập lại mật khẩu mới" />
                                        <br/>
                                        <small style="padding-left: 65px;"></small>
                                    </div>
                                    <div class="button">
                                        <button type="submit" class="btn btn-info btn-changeP-form" id="btn-login">
                                            Cập nhật thay đổi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

        </div>
    </div>
</div>
<script src="http://127.0.0.1/Daily/js/Account/change_pass.js?v=0.2"></script>