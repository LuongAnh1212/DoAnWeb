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
                <div class="info-account">Tài khoản của<strong></strong></div>
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
            <div class="Style__Heading">Đơn hàng của tôi</div>

            <div class="Styles__Tab">
                <div width="16.666666666666668%" class="styles__Tab_title active">Tất cả đơn</div>
                <div width="16.666666666666668%" class="styles__Tab_title">Chờ thanh toán</div>
                <div width="16.666666666666668%" class="styles__Tab_title">Đang xử lý</div>
                <div width="16.666666666666668%" class="styles__Tab_title">Đang vận chuyển</div>
                <div width="16.666666666666668%" class="styles__Tab_title">Đã giao</div>
                <div width="16.666666666666668%" class="styles__Tab_title">Đã huỷ</div>
            </div>

            <div class="styles__StyledInput">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#808089" class="icon-left" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(128, 128, 137);">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
                <input name="search" style="color: rgb(128, 128, 137);" placeholder="Tìm đơn hàng theo Mã đơn hàng hoặc Tên sản phẩm" type="search" class="input with-icon-left">
                <div class="search-right">Tìm đơn hàng</div>
            </div>

            <div class="infinite-scroll-component " style="height: auto; overflow: auto; display: flex; flex-direction: column; min-height: calc(100vh - 110px); background-color: rgb(255, 255, 255);">
                <div class="styles__Tab_Info active">
                    <div class="styles__StyledOrder styles__StyledOrder_All">
                        <!-- JS -->
                    </div>
                </div>
                <div class="styles__Tab_Info">
                    <div class="styles__StyledOrder">
                        <div color="#808089" class="styles__OrderHeader">
                            <span class="main-status">Chờ thanh toán</span>
                        </div>
                        <div class="styles__StyledOrderInfo">
                            <!-- <table class="table table-bordered">
                                <tbody class="thongtinsanpam_xacnhandon">
                                    <tr>
                                        <td>2</td>
                                        <td class="cothinh_xacnhandon"><img src="http://127.0.0.1/Daily/images/Product/quan_ni_tui_hop_day_dan.jpg" alt=""></td>
                                        <td style="width:50%;">Quần nỉ túi hộp dày dặn </td>
                                        <td class="sss"> 1 </td>
                                        <td class="eee">120.000 <sup><u>đ</u></sup> </td>
                                    </tr>
                                    <tr class="thanhtien_xnhandon">
                                        <td colspan="4"><b>Tổng Tiền :</b></td>
                                        <td class="ttien_xnhandon"><b> 120.000 <sup><u>đ</u></sup></b></td>
                                    </tr> 
                                </tbody>
                            </table> -->
                        </div>
                    </div>
                </div>
                <div class="styles__Tab_Info">
                    <div class="styles__StyledOrder styles__StyledOrder_DXL">
                        <div color="#808089" class="styles__OrderHeader">
                            <span class="main-status">Đang xử lý</span>
                        </div>
                        <div class="styles__StyledOrderInfo ">
                            <!-- JS -->
                        </div>
                    </div>
                </div>
                <div class="styles__Tab_Info">
                    <div class="styles__StyledOrder">
                        <div color="#808089" class="styles__OrderHeader">
                            <span class="main-status">Đang vận chuyển</span>
                        </div>
                        <div class="styles__StyledOrderInfo">
                        </div>
                    </div>
                </div>
                <div class="styles__Tab_Info">
                    <div class="styles__StyledOrder">
                        <div color="#808089" class="styles__OrderHeader styles__StyledOrder_DG">
                            <span class="main-status">Đã giao</span>
                        </div>
                        <div class="styles__StyledOrderInfo">
                        </div>
                    </div>
                </div>
                <div class="styles__Tab_Info">
                    <div class="styles__StyledOrder">
                        <div color="#808089" class="styles__OrderHeader">
                            <span class="main-status">Đã hủy</span>
                        </div>
                        <div class="styles__StyledOrderInfo">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="http://127.0.0.1/Daily/js/Account/myorder_manage.js?v=0.3"></script>