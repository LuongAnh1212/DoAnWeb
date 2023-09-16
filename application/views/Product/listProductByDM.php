<div class="products-main">
<div class="products container">
    <div id="toast"></div>
    <section class="product-top">
        <article class="product-top-left">
            <div class="product-list-title" id="list-title">
                DANH MỤC SẢN PHẨM &ensp;
                <i class="fa-solid fa-caret-down"></i>
            </div>
            <div class="product-list-content">
                <!-- JS -->
            </div>
        </article>
        <article class="product-top-right">
            <div class="flexslider" style="display:block">
                <ul class="slides">
                    <li style="display:block"><img style="width:100%; height:100%" src="<?php echo base_url(); ?>images/Product/banner1.jpg" /></li>
                    <!-- <li><img src="https://dailyser.midvietnam.com/static/images/advertisement/advertisement.jpg" /> </li> -->
                </ul>
            </div>
        </article>
    </section>
    <section class="box-filter">
        <div class="filter-total">
            <input type="checkbox" hidden name="" class="check-filter-serch" id="check-filter-serch-id"/>
            <label for="check-filter-serch-id">
                <div class="filter-item__title jsTitle">
                    <div class="arrow-filter"></div>
                    <i class="fa-solid fa-filter"></i> Bộ lọc
                    <strong class="number count-total" style="display: none">0</strong>
                </div>
            </label>
            <div class="filter-show show-total"  id="wrapper-search" style="display: none">
                <div class="show-total-main">
                    <button class="close-popup-total">
                        <i class="iconcate-closess"></i>Đóng
                    </button>
                    <div class="search-wrapper">
                        <div class="search-item">
                            <span class="search-title">Tính Chất:</span>
                            <div class="list-box-select">
                                <a href="" data-order="3"class="c-btnbox">Kháng nước, bụi</a>
                                <a href="" data-order="4"class="c-btnbox">Chống Oxy hóa</a>
                                <a href="" data-order="5"class="c-btnbox">Độ ẩm cao</a>
                                <a href="" data-order="8" class="c-btnbox">Làm dịu da</a>
                            </div>
                        </div>

                        <div class="search-item">
                            <span class="search-title">Khoảng giá (VND):</span>
                            <div class="two-input">
                                <input type="number" id="minPrice" value="" placeholder="Tối thiểu"/>
                                <span style="color: var(--main-bg-bl1)">-</span>
                                <input type="number" id="maxPrice" value="" placeholder="Tối đa"/>
                            </div>
                        </div>

                    </div>
                    <div class="search-product-button-wrapper">
                        <button class="search-product-btn high-light-btn">
                            <i class="fas fa-search"></i> Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="product_all">
        <section class="product1 product-no-border products-noibat">
            <div class="product-title">
                <div class="product-title-content" id="">Sản phẩm</div>
            </div>
            <!-- JS -->
        </section>
    </div>
</div>
</div>

<script src="http://127.0.0.1/Daily/js/Product/listProductByDM.js?v=1.4"></script>
