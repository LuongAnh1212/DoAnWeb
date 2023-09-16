<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Hóa Đơn Bán Hàng</title>

	<style>
    	*{ font-family: DejaVu Sans !important;}
		.invoice_contain{
			border: 2px solid black;
			padding: 10px;
		}
		table {
			width: 100%;
			border-collapse: collapse;
		}
		.products_order > table, td, th {
			border: 1px solid black;
			padding-left: 5px;
		}
		.products_order{
			margin-top: 30px;
			margin-bottom: 30px;
		}
		.title_info_customer{
			width: 30%;
		}
		.info{
			font-weight: bold;
		}
  	</style>

</head>
<body>
	<div class="invoice_contain">
		<div class="title_invoice">
			<div class="title_web">Daily</div>
			<div class="title_invoice_small">
				<h2 style="text_align:center;">HÓA ĐƠN BÁN HÀNG</h2>
			</div>
		</div>
		<div class="invoice_info_customer">
			<p style="text-align: left;"><u><strong>Thông tin khách hàng</strong></u></p>
			<table>
				<tr>
					<td class="title_info_customer">Khách hàng: </td>
					<td class="info"><?php echo $ho_ten; ?></td>
				</tr>
				<tr>
					<td class="title_info_customer">Ngày lập: </td>
					<td class="info"><?php echo $ngay_dat_hang; ?></td>
				</tr>
				<tr>
					<td class="title_info_customer">Mã đơn hàng: </td>
					<td class="info"><?php echo $ma_don_hang; ?></td>
				</tr>
				<tr>
					<td class="title_info_customer">Hình thức thanh toán: </td>
					<td class="info"><?php echo $phuong_thuc_thanh_toan; ?></td>
				</tr>
				<tr>
					<td class="title_info_customer">Tổng thành tiền: </td>
					<td class="info"><?php echo $tong_thanh_tien; ?> vnđ</td>
				</tr>
			</table>
		</div>
		<div class="products_order">
			<p style="text-align: left;"><u><strong>Chi tiết đơn hàng</strong></u></p>
			<table>
				<tr>
					<td width=10%>STT </td>
					<td width=50%>Sản phẩm</td>
					<td width=15%>Số lượng </td>
					<td width=25%>Thành tiền</td>
				</tr>

				<?php for ($i = 0; $i < count($chi_tiet_ddh); $i++){ ?>
				<tr>
					<td><?php echo $i + 1; ?></td>
					<td><?php echo $chi_tiet_ddh[$i]["tensanpham"]; ?></td>
					<td><?php echo $chi_tiet_ddh[$i]["so_luong"]; ?></td>
					<td><?php echo $chi_tiet_ddh[$i]["gia"]*$chi_tiet_ddh[$i]["so_luong"]; ?> vnđ</td>
				</tr>
				<?php } ?>

				<tr>
					<td  colspan="3">Tổng thành tiền:</td>
					<td><?php echo $tong_thanh_tien; ?> vnđ</td>
				</tr>
			</table>
		</div>
 	</div>
</body>

</html>