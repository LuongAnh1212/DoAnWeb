<div id="toast"></div>
<div class="box-title">
    <div class="box-title-main">
        <p><a style="color:black;text-decoration: none;" href="http://127.0.0.1/Daily/Cart">Giỏ hàng</a> / Thông tin giao hàng</p>
    </div>
</div>
<div class="order-main">
<div class="container-fluit toanman_xnhandon">
	<div class="container" style="padding-bottom: 3em;padding-top: 3em;">
		<div class="row">
      		<div class="col-lg-5 cot7_xnhandon">
        		<div class="table-responsive">
          			<table class="table table-bordered" border="0">
            			<tr>
              				<td>
                				<form class="contact-form check-order-form" id="contact-form" action="" method="">
									<div class="section-header">
										<h2 class="section-title">Thông tin giao hàng</h2>
									</div>

                 					<div class="section-content">
                    					<div class="fieldset">
                    						<div class="field field-required">
												<div class="field-input-wrapper khachhang">
													
                        						</div>

												<div class="field-input-wrapper sdtKH">
                        						</div>

                        						<div class="field-input-wrapper diachigiaohang">
                        						</div>

												<div class="field-input-wrapper phuongthucthanhtoan">
													<div class="title_info_cus">
														<div class="icon_info_cus">
															<i class="fas fa-wallet"></i>
														</div>
														<div>Phương thức thanh toán</div>
													</div>
													<div class="select_pttt" id="select_pttt">
														THANH TOÁN KHI NHẬN HÀNG
													</div>

													<div class="change_pttt">
														<div class="btn_change_pttt" >THAY ĐỔI</div>
													</div>
													
                        						</div>

                        						<div class="field-input-wrapper mt-3">
                          							<input placeholder="Ghi chú" autocapitalize="off" spellcheck="false" class="field-input note" size="30" type="text" id="noteE" name="note" value=""/>
                          							<small></small>
												</div>
											</div>
										</div>
									</div>
									
                  					<div></div>
									<input type="hidden"  id="exampleInputUID_ttnh" class="InputUID_ttnh" name="exampleInputUID_tthn">
                  					<button type="submit" name="cod" id="submit" value="cod" class="submit btn button_xnhandon" >
                    					<span class="btn-content">Xác Nhận Đơn Hàng</span>
                 					</button>
                				</form>
              				</td>
            			</tr>
        			</table>
        		</div>
      		</div>

      		<div class="col-lg-7 xnhandon">
        	<!-- Thông tin sản phầm -->
        		<table class="table table-bordered">
					<thead class="head_thongtinsanpam">
						<tr>
							<td colspan="3" align="center">Sản phẩm</td>
							<td>Số lượng</td>
							<td>Thành tiền</td>
						</tr>
					</thead>
          			<tbody class="thongtinsanpam_xacnhandon">
          			</tbody>
        		</table>
      		</div>
    	</div>
  	</div>

	<div class="box-choose-pttt" style="display: none;">
		<div class="box-choose-pttt-main">
			<form action="http://127.0.0.1/Daily/OnlineCheckout/online_checkout" method="POST" class="form-choose-pttt" enctype="multipart/form-data">
				<div class="box-choose-pttt-title">
					<span>Chọn Phương thức thanh toán</span>
				</div>
				<div class="box-choose-pttt-list">
					<input type="hidden"  id="exampleInputUID" class="InputUID" name="exampleInputUID">
					<button type="button" class="btn-pttt btn-pttt-cod" >
						<div class="image-pttt image-cod" style="margin: 0px 25px;">
							<img src="http://127.0.0.1/Daily/images/Order/Thanh-toán-cod-là-gì-Hướng-dẫn-ship-cod.png" alt="" style="width:100%; height:100%;">
						</div>
						<div class="name-pttt">Thanh toán COD</div>
					</button>
					<button type="submit" name="payUrl" value="payUrl" class="btn-pttt btn-pttt-mono">
						<div class="image-pttt" style="margin: 0px 30px;">
							<svg width="32" height="32" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" class="jsx-ddfb0b416b0db288 mx-auto block h-10 w-10">
								<path d="M0 8C0 3.58172 3.58172 0 8 0H64C68.4183 0 72 3.58172 72 8V64C72 68.4183 68.4183 72 64 72H8C3.58172 72 0 68.4183 0 64V8Z" fill="#A50064" class="jsx-ddfb0b416b0db288"></path>
								<path d="M51.859 10C45.6394 10 40.5057 15.0349 40.5057 21.3533C40.5057 27.5729 45.5407 32.7065 51.859 32.7065C58.0786 32.7065 63.2123 27.6716 63.2123 21.3533C63.2123 15.1337 58.1774 10 51.859 10ZM51.859 26.1908C49.1935 26.1908 47.0215 24.0188 47.0215 21.3533C47.0215 18.6877 49.1935 16.5158 51.859 16.5158C54.5246 16.5158 56.6965 18.6877 56.6965 21.3533C56.6965 24.0188 54.5246 26.1908 51.859 26.1908Z" fill="white" class="jsx-ddfb0b416b0db288"></path>
								<path d="M28.7576 10C26.8818 10 25.1048 10.5923 23.6239 11.6783C22.2418 10.5923 20.4648 10 18.4903 10C13.7515 10 10 13.8502 10 18.4903V32.7065H16.5158V18.4903C16.5158 17.4043 17.4043 16.6145 18.3915 16.6145C19.4775 16.6145 20.2673 17.503 20.2673 18.4903V32.7065H26.7831V18.4903C26.7831 17.4043 27.6716 16.6145 28.6589 16.6145C29.7448 16.6145 30.5346 17.503 30.5346 18.4903V32.7065H37.0504V18.589C37.2479 13.8502 33.4963 10 28.7576 10Z" fill="white" class="jsx-ddfb0b416b0db288"></path>
								<path d="M51.859 37.6427C45.6394 37.6427 40.5057 42.6776 40.5057 48.996C40.5057 55.2156 45.5407 60.3492 51.859 60.3492C58.0786 60.3492 63.2123 55.3143 63.2123 48.996C63.2123 42.6776 58.1774 37.6427 51.859 37.6427ZM51.859 53.7347C49.1935 53.7347 47.0215 51.5628 47.0215 48.8972C47.0215 46.2317 49.1935 44.0598 51.859 44.0598C54.5246 44.0598 56.6965 46.2317 56.6965 48.8972C56.6965 51.6615 54.5246 53.7347 51.859 53.7347Z" fill="white" class="jsx-ddfb0b416b0db288"></path>
								<path d="M28.7576 37.6427C26.8818 37.6427 25.1048 38.235 23.6239 39.321C22.2418 38.235 20.4648 37.6427 18.4903 37.6427C13.7515 37.6427 10 41.4929 10 46.133V60.3492H16.5158V46.0342C16.5158 44.9483 17.4043 44.1585 18.3915 44.1585C19.4775 44.1585 20.2673 45.047 20.2673 46.0342V60.2505H26.7831V46.0342C26.7831 44.9483 27.6716 44.1585 28.6589 44.1585C29.7448 44.1585 30.5346 45.047 30.5346 46.0342V60.2505H37.0504V46.133C37.2479 41.3942 33.4963 37.6427 28.7576 37.6427Z" fill="white" class="jsx-ddfb0b416b0db288"></path>
							</svg>
						</div>
						<div class="name-pttt">Thanh toán Momo</div>
					</button>
					<button type="submit" name="vnpay" value="vnpay" class="btn-pttt btn-pttt-vnpay">
						<div class="image-pttt image-vnpay" style="margin: 0px 24px;">
							<img src="https://783477621.cloud.edgevnpay.vn/assets/media/img/img/qrcode.png" alt="" style="width:100%; height:100%;">
						</div>
						<div class="name-pttt">Thanh toán Vnpay</div>
					</button>
				</div>
			</form>
			<div class="box-choose-pttt-footer">
				<buttonc type="button" class="btn-close-box-choose-pttt">Trở lại</button>
			</div>
		</div>
	</div>
</div>
</div>
<script src="<?php echo base_url(); ?>js/Order/script.js?v=1.1"></script>
