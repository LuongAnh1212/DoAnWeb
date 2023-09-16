<!DOCTYPE html>

<html theme="default" class="mdl-js">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    <!-- <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css"/> 1 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="<?php echo base_url();?>css/Toast/toast.css?v=3.2"/>
	<link rel="stylesheet" href="<?php echo base_url();?>css/Confirm/confirm.css?v=1.8"/>
    <link rel="stylesheet" href="<?php echo base_url();?>css/Report/style.css?v=2.2" />
    <link rel="stylesheet" href="<?php echo base_url();?>css/<?php echo $style?>/style.css?v=7.0" />

    <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/flexslider.css" rel="stylesheet" />
    <link rel="stylesheet"  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"  />
    <!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script> old-->

    <!-- <script src="//cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script> old-->

    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script> 2 -->
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> <!--Select2-->

    <title><?php echo $title ?></title>
  </head>

  <body style="font-size: 16px;">
    <div class="all-header">
		 <!-- Back to top button -->
		 <a id="button_backtop">
			<i class="fas fa-chevron-up"></i>
		 </a>
    	<!--  -->
        <div class="top-header">
            <div class="main-top-header">
                <div class="language-option">
                    <i class="fas fa-globe"></i>
                    <span> Tiếng Việt </span>
                    <!-- <i class="fas fa-chevron-down"></i> -->
                </div>
                <div class="main-top-header-center">

                </div>
                <div class="main-top-header-user">
                    <span class="main-top-header-user-title"></span>
                </div>
            </div>
        </div>

        <div class="container-header">
            <div class="row">
                <div class="col-sm nav-header-left">
                    <a class="nav-header-left-a nav-header-left-a-home" href="<?php echo base_url();?>Home"><div>TRANG CHỦ</div></a>
                    <a class="nav-header-left-a nav-header-left-a-product" href="<?php echo base_url();?>Product"><div>SẢN PHẨM</div></a>
                    <a class="nav-header-left-a nav-header-left-a-blog"  href="<?php echo base_url();?>Blog"><div>BÀI VIẾT</div></a>
                </div>
                <div class="col-sm nav-header-center">
                    <h1 id="branding">
                        <a href="/" class="logo">
                            Daily
                        </a>
                    </h1>
                </div>
                <div class="col-sm nav-header-right">
                    <ul class="ul-nav-header-right">
                        <li class="search-wrap">
                            <a href="#" class="search-btn">
                                <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                        <g id="Navigation" transform="translate(-1369.000000, -28.000000)" fill="transparent" fill-rule="nonzero" stroke="#009A87" stroke-width="1.5">
                                            <g id="Group-27">
                                                <g id="Group-18-Copy-15" transform="translate(1370.000000, 29.000000)">
                                                    <g id="Group-17">
                                                        <circle id="Oval" cx="6.53846154" cy="6.53846154" r="6.53846154"></circle>
                                                        <path d="M11.7692308,11.7692308 L16.3707924,16.3707924" id="Line-3"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                            <div id="desktop-search" class="search ">
                            <form action="http://127.0.0.1/Daily/Product/Search" method="get">
                                <label for="q" class="visually-hidden">Tìm kiếm</label>
                                <input type="search" name="s_keyword" class="input-search" id="Search-header" placeholder="TÌM KIẾM">
                                <!-- <input type="hidden" name="type" value="product"> -->
                            </form>
                            </div>
                        </li>
                        <li class="customer-wrap customer-wrap-login" >     
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1363_2557)">
                                    <path d="M8.73859 9.48C8.68859 9.48 8.62859 9.48 8.57859 9.48C7.95859 9.46 7.34859 9.32 6.77859 9.06C6.20859 8.8 5.69859 8.44 5.27859 7.98C4.84859 7.52 4.51859 6.99 4.29859 6.41C4.07859 5.83 3.97859 5.21 3.99859 4.58C4.01859 3.95 4.15859 3.35 4.41859 2.78C4.67859 2.21 5.03859 1.7 5.49859 1.28C5.95859 0.849998 6.48859 0.519998 7.06859 0.299998C7.64859 0.0799976 8.25859 -0.0200024 8.88859 -2.44169e-06C9.51859 0.0199976 10.1186 0.159998 10.6886 0.419998C11.2586 0.679998 11.7686 1.04 12.1886 1.5C12.6186 1.96 12.9486 2.49 13.1686 3.07C13.3886 3.65 13.4886 4.27 13.4686 4.89C13.4486 5.52 13.3086 6.12 13.0486 6.69C12.7886 7.26 12.4286 7.77 11.9686 8.19C11.5086 8.62 10.9786 8.95 10.3986 9.17C9.85859 9.37 9.29859 9.47 8.72859 9.47L8.73859 9.48ZM5.49859 4.63C5.48859 5.06 5.55859 5.48 5.70859 5.88C5.85859 6.28 6.08859 6.64 6.37859 6.95C6.66859 7.26 7.01859 7.51 7.40859 7.69C7.79859 7.87 8.20859 7.96 8.63859 7.98C9.06859 7.98 9.48859 7.93 9.88859 7.77C10.2886 7.62 10.6486 7.39 10.9586 7.1C11.2686 6.81 11.5186 6.46 11.6986 6.07C11.8786 5.68 11.9686 5.27 11.9886 4.84C11.9986 4.41 11.9286 3.99 11.7786 3.59C11.6286 3.19 11.4086 2.83 11.1086 2.52C10.8186 2.21 10.4686 1.96 10.0786 1.78C9.68859 1.6 9.27859 1.51 8.84859 1.49C8.42859 1.48 7.99859 1.55 7.59859 1.7C7.19859 1.85 6.83859 2.08 6.52859 2.37C6.21859 2.66 5.96859 3.01 5.78859 3.4C5.60859 3.79 5.51859 4.2 5.49859 4.63V4.63Z" fill="#009A87"></path>
                                    <path d="M0.748441 18C0.648441 18 0.558441 17.98 0.458441 17.94C0.0784414 17.78 -0.101559 17.34 0.0584413 16.96C0.768441 15.24 1.96844 13.79 3.51844 12.75C6.61844 10.68 10.8584 10.68 13.9484 12.75C15.4984 13.78 16.6984 15.24 17.4084 16.96C17.5684 17.34 17.3884 17.78 16.9984 17.94C16.6184 18.1 16.1784 17.92 16.0184 17.53C15.4184 16.09 14.4184 14.87 13.1084 14C10.5084 12.26 6.93844 12.26 4.33844 14C3.03844 14.87 2.02844 16.09 1.42844 17.53C1.30844 17.82 1.02844 17.99 0.738441 17.99L0.748441 18Z" fill="#009A87"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1363_2557">
                                        <rect width="17.47" height="18" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>

                            <div class="login-register">
                                <!-- Khi chưa đăng nhập -->
                                <ul class="no-login">
                                    <li><a class="login-user" href="<?php echo base_url();?>Account/Login">Đăng nhập</a></li>
                                    <li><a class="register-user" href="<?php echo base_url();?>Account/Register">Đăng ký</a></li>
                                </ul>

                                <!-- Khi đã đăng nhập -->
                                <ul class="user-option" style="display:none;">
                                    <li><a class="account-user" href="<?php echo base_url();?>Account/Edit">Tài khoản</a></li>
                                    <li><a class="order-user" href="<?php echo base_url();?>Account/Order">Đơn hàng</a></li>
                                    <li><a class="logout-user" href="<?php echo base_url();?>Home" onclick="UserLogout()">Đăng xuất</a></li>
                                </ul>
                            </div>

                        </li>
                        <li class="cart-wrap" style="margin-right:20px;">
                            <a class="cart-btn" href="<?php echo base_url();?>Cart">
                                <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_1363_2560)">
                                        <path d="M6.57812 16.69C6.57812 15.83 7.27813 15.13 8.13813 15.13C8.99813 15.13 9.69812 15.83 9.69812 16.69C9.69812 17.55 8.99813 18.25 8.13813 18.25C7.27813 18.25 6.57812 17.55 6.57812 16.69Z" fill="#009A87"></path>
                                        <path d="M15.9219 16.69C15.9219 15.83 16.6219 15.13 17.4819 15.13C18.3419 15.13 19.0419 15.83 19.0419 16.69C19.0419 17.55 18.3419 18.25 17.4819 18.25C16.6219 18.25 15.9219 17.55 15.9219 16.69Z" fill="#009A87"></path>
                                        <path d="M17.2 13.17H8.76C7.61 13.17 6.57 12.45 6.18 11.37L2.56 1.5H0.75C0.34 1.5 0 1.16 0 0.75C0 0.34 0.34 0 0.75 0H2.73C3.25 0 3.72 0.33 3.9 0.82L7.58 10.85C7.76 11.34 8.23 11.67 8.75 11.67H17.19C17.73 11.67 18.21 11.33 18.38 10.81L20.71 3.83H8.92C8.51 3.83 8.17 3.49 8.17 3.08C8.17 2.67 8.51 2.33 8.92 2.33H21.06C21.46 2.33 21.84 2.52 22.07 2.85C22.3 3.17 22.37 3.6 22.24 3.98L19.8 11.29C19.42 12.41 18.38 13.17 17.19 13.17H17.2Z" fill="#009A87"></path>
                                    </g>
                                <defs>
                                    <clipPath id="clip0_1363_2560">
                                        <rect width="22.31" height="18.25" fill="white"></rect>
                                    </clipPath>
                                </defs>
                                </svg>
                            </a>
                            <small class="numberOfCartInHead" style="top: 6px; margin-right:20px;">0</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </body>

    <a id="popuplink" href="#inline" style="display: none"></a>
    <div id="inline" style="display: none; text-align: center"></div>
    <!-- <script src="https://code.jquery.com/jquery-latest.min.js"></script> 3 -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> <!--Select2-->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script> 4 -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.js"></script> 5 -->
    <script src="http://127.0.0.1/Daily/js/Report/script.js?v=1.1"></script>
</html>
