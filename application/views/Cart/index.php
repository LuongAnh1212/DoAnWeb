<div id="toast"></div>
<div class="box-title">
    <div class="box-title-main">
        <p>Giỏ hàng</p>
    </div>
</div>
<div class="cart-main"> 
<div class="container"style="padding-bottom: 3em;padding-top: 3em;">

    <section id="X_product">
        <p>Không có sản phẩm nào trong giỏ hàng ! </p>
        <div class="button_muatcong">
            <button class="button" type="button" onclick="location.href='<?php echo base_url();?>Product';">Tiếp tục mua hàng</button>
        </div>
    </section>

    <section class="cart-list" id="Gio">

        <article class="cart-list-thead">
            <div class="cart-category">
                <div class="cate-sp">Sản phẩm</div>
                <div class="cate-dg">Đơn giá</div>
                <div class="cate-sl">Số lượng</div>
                <div class="cate-st">Số tiền</div>
                <div class="cate-tt">Thao tác</div>
            </div>
        </article>

        <article class="cart-list-tbody">
            <!--JS-->
        </article>
    </section>

    <section class="cart-done">
         <!--JS-->
    </section>
</div>
</div>
<script src="<?php echo base_url(); ?>js/Cart/script.js?v=1.7"></script>

