<footer>
	<div class="container-footer" style="margin:0px 15px;">
		<div class="row row-footer">
            <div class="col-sm">
                <h2 class="footer-title js-collapse-footer">HỔ TRỢ KHÁCH HÀNG</h2>
                <ul class="ega-ul ega-color--initial ega-m-b--0">	
                    <li><a href="#">Fanpage facebook: Daily</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>						
                    <li><a href="#">Chính sách bảo mật thông tin khách hàng.</a></li>						
                    <li><a href="#">Chính sách khách hàng thân thiết</a></li>
                </ul>
            </div>

            <div class="col-sm">
                <h2 class="footer-title js-collapse-footer">LIÊN HỆ</h2>
                <ul class="ega-ul ega-color--initial ega-m-b--0">
                    <li><a href="#">HOTLINE TƯ VẤN &amp; TIẾP NHẬN KHIẾU NẠI: 0911.222.333 - 0900.111.222</a></li>
                    <li><a href="#">ĐỊA CHỈ: </a></li>
                </ul>
            </div>

            <div class="col-sm">
                <h2 class="footer-title js-collapse-footer">THÔNG TIN </h2>
                <ul class="ega-ul ega-color--initial ega-m-b--0">						
                    <li><a href="#">Giao hàng</a></li>
                    <li><a href="#">Hệ thống cửa hàng</a></li>
                    <li><a href="#">Hướng dẫn chọn size</a></li>
                    <li><a href="#">Hướng dẫn bảo quản</a></li>
                </ul>
            </div>
            
            <div class="col-sm">
                <div class="footer-form-wrap">
                    <h2 class="footer-title">DAILY.VN</h2>
                    <span>Đăng ký nhận bản tin để cập nhật những tin tức về DAILY.</span>
                    <div id="ega_form_cusomer"><form accept-charset="UTF-8" action="/account/contact" class="contact-form" method="post">
                        <input name="form_type" type="hidden" value="customer">
                        <input name="utf8" type="hidden" value="✓">
                        <div class="ega-form">
                            <div class="ega-form--group ega-form__group-btn-in--right">
                                <input type="email" class="ega-form__control" name="contact[email]" placeholder="Địa chỉ email của bạn">
                            </div>
                        </div>
                    </div>

                    <div class="footer-social ega-clearfix">
                        <a href="#" target="_blank"><i class="fab fa-facebook-square"></i></a>														
                        <a href="#" target="_blank"><i class="fab fa-instagram-square"></i></a>
                    </div>
                    
                </div>
            </div>
        </div>
	</div>
</footer>


 <!-- jquery slider range -->
<script>
<?php if (!empty($min_NB_price) && !empty($max_NB_Price)){?>
    $('.price_from').val(<?php echo $min_NB_price; ?>);
    $('.price_to').val(<?php echo $max_NB_Price; ?>);

    $( function() {
        $( "#slider-range" ).slider({
            range: true,
            min: <?php echo $min_NB_price; ?>,
            max: <?php echo $max_NB_Price; ?>,
            values: [ addPlus(<?php echo $min_NB_price; ?>), <?php echo $max_NB_Price; ?> ],
            step: 10000,
            slide: function( event, ui ) {
                $( "#amount" ).val( addPlus(ui.values[ 0 ]).toString() + "" + " - " + addPlus(ui.values[ 1 ]) + " VNĐ" );
                $('.price_from').val(ui.values[ 0 ])
                $('.price_to').val(ui.values[ 1 ]);
            }
        });
        $( "#amount" ).val( addPlus($( "#slider-range" ).slider( "values", 0 )).toString() + "" +
        " - " + addPlus($( "#slider-range" ).slider( "values", 1 )).toString() + " VNĐ" );
    } );
<?php }?>

    function addPlus(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)){
            x1 = x1.replace(rgx, '$1' + '.' +'$2');
        }
        return x1 + x2;
    }
</script>
 <!-- jquery slider range -->

<script src="<?php echo base_url();?>js/Toast/toast.js?v=1.1"></script>
<script src="<?php echo base_url();?>js/Confirm/confirm.js?v=1.7"></script>

</body>
</html>
