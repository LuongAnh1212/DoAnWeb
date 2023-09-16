<div class="box-title">
    <div class="box-title-main">
        <p><a style="color:black;text-decoration: none;" href="http://127.0.0.1/Daily/Cart">Giỏ hàng</a> / Thông tin giao hàng / Đặt hàng thành công</p>
    </div>
</div>
<div class="main_success" style="background-color: #F5F5F7; padding: 30px 0px;">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 cot7_xnhandon">
                <div class="table-responsive">
                    <form action="" method="post">
                        <table class="table table-bordered" border="0">
                            <tbody>
                                <tr>
                                    <td>
                                    <div class="thongbao_muatcong">
                                        <div class="section-header">
                                        <h2 class="section-title">Đặt Hàng Thành Công</h2>
                                        </div>
                                        <div class="section-content">
                                        <p>Cảm ơn quý khách đã tin tưởng đặt hàng tại Daily. Đơn hàng đang chờ được xác nhận.
                                        </p></br>
                                        <p>Sau khi xác nhận thành công, đơn hàng sẽ được gửi đi trong 1 đến 2 ngày tới, vui lòng kiểm
                                            tra để biết thêm chi tiết.</p></br>

                                        <p>Để tải hóa đơn PDF: <a href="http://127.0.0.1/Daily/Order/convertpdf?id=<?php echo $user_id; ?>&o_id=<?php echo $don_dat_hang_id?>">Click tại đây để tải PDF về máy</a></p>
                                        </div>
                                    </div>
                                    <div class="button_muatcong">
                                        <button class="button" type="button" onclick="location.href='/Daily/Product';">Tiếp tục mua hàng</button>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>