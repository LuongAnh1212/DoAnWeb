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
            <div class="Style__Heading">Thông tin tài khoản</div>

            <div class="Styles__InfoPage">
                <div class="info-row">
                    <div class="info-left">
                        <span class="info-title">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                        <div class="Style__AccountInfo">
                            <form class="form-info-user" id="form-info-user" method="">
                                <input type="file" accept="image/*" name="image" id="file" onchange="loadFile(event)" value="Chọn ảnh" style="width:100px; display:none;">
                                <div class="my-form-control">
                                    <label class="input-label">Họ &amp; Tên</label>
                                    <div>
                                        <div class="Style__StyleInput">
                                            <input class="input_fullName" id="name" type="text" name="fullName" maxlength="128" placeholder="Thêm họ tên" value="">
                                            <div><small class="small"></small></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="my-form-control">
                                    <label class="input-label">Số Điện Thoại</label>
                                    <div>
                                        <div class="Style__StyleInput">
                                            <input class="input_SDT" id="phone" type="phone" name="SDT" maxlength="12" placeholder="Thêm số điện thoại" value="">
                                            <div style = ""><small class="small"><?php if(!empty($email_exist)){echo $email_exist;}?></small></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="my-form-control">
                                    <label class="input-label">Email</label>
                                    <div>
                                        <div class="Style__StyleInput">
                                            <input class="input_Email" id="email" type="text" name="Email" maxlength="128" placeholder="Thêm Email" value="">
                                            <div style = ""><small class="small"><?php if(!empty($email_exist)){echo $email_exist;}?></small></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="my-form-control">
                                    <label class="input-label">Ngày sinh</label>
                                    <div class="Style__StyledBirthdayPicker">
                                        <div class="select-birthday">
                                            <select name="day" class="day" id="day">
                                                <option value="0">Ngày</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                            </select>
                                            <select name="month" class="month" id="month"><option value="0">Tháng</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>
                                            <select name="year" class="year" id="year"><option value="0">Năm</option><option value="2023">2023</option><option value="2022">2022</option><option value="2021">2021</option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option><option value="1900">1900</option></select>
                                        </div>
                                        <div><small class="small"></small></div>
                                    </div>
                                </div>

                                <div class="my-form-control">
                                    <label class="input-label">Giới tính</label>
                                    <label class="Radio__StyledRadio">
                                        <input type="radio" name="gender" value="male" style="height:18px; width:18px; vertical-align: middle; margin: 0px;">
                                        <span class="label">Nam</span>
                                    </label>
                                    <label class="Radio__StyledRadio">
                                        <input type="radio" name="gender" value="female" style="height:18px; width:18px; vertical-align: middle; margin: 0px;">
                                        <span class="label">Nữ</span>
                                    </label>
                                    <label class="Radio__StyledRadio">
                                        <input type="radio" name="gender" value="other" style="height:18px; width:18px; vertical-align: middle; margin: 0px;">
                                        <span class="label">Khác</span>
                                    </label>
                                </div>
                                <div class="my-form-control">
                                    <label class="input-label">&nbsp;</label>
                                    <button type="submit" class="Style__StyleBtnSubmit btn-submit" style="width: 175px;">Lưu thay đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="info-vertical"></div>
                    <div class="info-right">
                        <div class="form-avatar">
                            <div class="styles__StyleAvatar">
                                <div class="avatar-wrapper" aria-describedby="popup-11">
                                    <div class="avatar-view">
                                        <img src="http://127.0.0.1/Daily/images/Account/avatar.jpg?asid=853767258347235&amp;height=200&amp;width=200&amp;ext=1542949868&amp;hash=AeRP2lPwJnZkxG7f" alt="avatar" class="avatar" id="avatar">
                                        <div class="avatar-view-edit">
                                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/edit.png" class="edit_img" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="note-avatar">
                            <div class="note-avatar-small note-avatar-small-1">Dung lượng file tối đa 1 MB</div>
                            <div class="note-avatar-small note-avatar-small-2">Định dạng:.JPG, .JPEG, .PNG</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="http://127.0.0.1/Daily/js/Account/account_edit.js?v=1.1"></script>