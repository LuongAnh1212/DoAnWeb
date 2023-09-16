<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Order extends  CI_Controller{
	private $secret = "seminar_lpa";

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 

		$this->load->model('Order_model'); //load model
		///Allowing CORS
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    } 

    private function layout_header_main($data){
		$this->load->view('Report/headermain.php', $data); 
	}

    private function footer_header_main(){
		$this->load->view('Report/footermain.php'); 
	}

    public function index(){
		$this->layout_header_main(['title'=>'Order', 'style' => 'Order']);
		$this->load->view('Order/index.php'); //Phan body
		$this->footer_header_main();
	}

	public function success(){
		$this->layout_header_main(['title'=>'Thanh toán thành công', 'style' => 'Order']);
		if (isset($_GET['partnerCode'])){ //Thanh toan MoMo
			$data_dondathang = [
				'KhachHangID' => $_GET['extraData'],
				'MaDonHang' => $_GET['orderId'],
				'TongDonGia' => $_GET['amount'],
				'orderType' => $_GET['orderType'],
				'payType' => $_GET['payType'],
			];

			//Kiem tra ma_don_hang xem da co hay chua
			$user_id = intval($data_dondathang['KhachHangID']);
			$don_dat_hang_id_c_arr = $this->Order_model->getDDHIdbyMaDonHang($data_dondathang['MaDonHang'])->result_array();

			if (intval($data_dondathang['TongDonGia']) != 0 && (count($don_dat_hang_id_c_arr) == 0)){
				//Lưu vào bảng don_dat_hang
				$this->Order_model->addOrder($data_dondathang);

				//Lưu vào bảng chi_tiet_ddh
				//1. Tim cart_id
				$this->load->model('Cart_model'); //load model
				$cart_id_str = $this->Cart_model->getCartIdByUserId($user_id)->result_array();
				$cart_id = intval($cart_id_str[0]['gio_hang_id']);

				// 2. Tim don_dat_hang_id dua vao ma_don_hang
				$don_dat_hang_id_arr = $this->Order_model->getDDHIdbyMaDonHang($data_dondathang['MaDonHang'])->result_array();
				$don_dat_hang_id = intval($don_dat_hang_id_arr[0]['don_dat_hang_id']);
				
				// //3. Tim Array SanPhamId, So luong, Gia dua vao gio_hang_id (cart_id)
				$this->load->model('Sanpham_model'); //load model
				$arr_sp_in_cart = $this->Cart_model->getCartItem($cart_id)->result_array();
				$arr_san_pham = $this->Sanpham_model->getProductForCart()->result_array();

				for($j=0; $j<count($arr_sp_in_cart); $j++){
					for($i=0; $i<count($arr_san_pham); $i++){
						$cell = $arr_sp_in_cart[$j];
						$cell2 = $arr_san_pham[$i];
						if ($cell['san_pham_id'] == $cell2['sanphamID']){
							$arr_sp_in_cart[$j]['gia'] = $cell2['gia'];
						}
					}
				}

				if (count($arr_sp_in_cart) != 0){
					for ($i=0; $i < count($arr_sp_in_cart) ; $i++){
						//Them tung san pham trong gio hang vao chi tiet don dat hang
						$this->Order_model->addOrderDetails($don_dat_hang_id, intval($arr_sp_in_cart[$i]['san_pham_id']), intval($arr_sp_in_cart[$i]['gia_sp']), intval($arr_sp_in_cart[$i]['so_luong_sp']));
					}

					$this->Cart_model->removeAllItemOfCart($cart_id);
					$this->Cart_model->updateCartAfterOrder($cart_id);
				}
			}
			else{
				// 2. Tim don_dat_hang_id dua vao ma_don_hang
				$don_dat_hang_id_arr = $this->Order_model->getDDHIdbyMaDonHang($data_dondathang['MaDonHang'])->result_array();
				$don_dat_hang_id = intval($don_dat_hang_id_arr[0]['don_dat_hang_id']);
			}

			$data = [
				'user_id' => $user_id,
				'don_dat_hang_id' => $don_dat_hang_id
			];

			$this->load->view('Order/success.php',$data); //Phan body
		}
		else{ //Thanh toan khi nhan hang
			if (!empty($_GET['extraData'])){

				$this->load->model('Cart_model'); //load model
	
				$cart_id = intval($_GET['extraData']);
				$user_id_arr = $this->Cart_model->getUserIDByCartId(intval($cart_id))->result_array();
				$user_id = intval($user_id_arr[0]['khach_hang_id']);
				
				$result_arr = $this->Cart_model->getTotalCartDB($user_id)->result_array();
				$result_total = floatval($result_arr[0]['tong_gio_hang']);
				if ($result_total == "0"){
					$result_total = "noproduct";
				}

				$orderId = $_GET['orderId'];
				$data_dondathang = [
					'KhachHangID' => $user_id,
					'MaDonHang' => $orderId,
					'TongDonGia' => $result_total,
					'orderType' => 'cod',
				];
				if (intval($data_dondathang['TongDonGia']) != 0){

					//Lưu vào bảng don_dat_hang
					$this->Order_model->addOrder($data_dondathang);
		
					//Lưu vào bảng chi_tiet_ddh
					//1. Tim cart_id
					$user_id = intval($data_dondathang['KhachHangID']);
					$this->load->model('Cart_model'); //load model
					$cart_id_str = $this->Cart_model->getCartIdByUserId($user_id)->result_array();
					$cart_id = intval($cart_id_str[0]['gio_hang_id']);
		
					// 2. Tim don_dat_hang_id dua vao ma_don_hang
					$don_dat_hang_id_arr = $this->Order_model->getDDHIdbyMaDonHang($data_dondathang['MaDonHang'])->result_array();
					$don_dat_hang_id = intval($don_dat_hang_id_arr[0]['don_dat_hang_id']);
					
					// //3. Tim Array SanPhamId, So luong, Gia dua vao gio_hang_id (cart_id)
					$this->load->model('Sanpham_model'); //load model
					$arr_sp_in_cart = $this->Cart_model->getCartItem($cart_id)->result_array();
					$arr_san_pham = $this->Sanpham_model->getProductForCart()->result_array();
		
					for($j=0; $j<count($arr_sp_in_cart); $j++){
						for($i=0; $i<count($arr_san_pham); $i++){
							$cell = $arr_sp_in_cart[$j];
							$cell2 = $arr_san_pham[$i];
							if ($cell['san_pham_id'] == $cell2['sanphamID']){
								$arr_sp_in_cart[$j]['gia'] = $cell2['gia'];
							}
						}
					}
					if (count($arr_sp_in_cart) != 0){
						for ($i=0; $i < count($arr_sp_in_cart) ; $i++){
							//Them tung san pham trong gio hang vao chi tiet don dat hang
							$this->Order_model->addOrderDetails($don_dat_hang_id, intval($arr_sp_in_cart[$i]['san_pham_id']), intval($arr_sp_in_cart[$i]['gia_sp']), intval($arr_sp_in_cart[$i]['so_luong_sp']));
						}
						$this->Cart_model->removeAllItemOfCart($cart_id);
						$this->Cart_model->updateCartAfterOrder($cart_id);
					}
				}
				else{
					// 2. Tim don_dat_hang_id dua vao ma_don_hang
					$don_dat_hang_id_arr = $this->Order_model->getDDHIdbyMaDonHang($data_dondathang['MaDonHang'])->result_array();
					$don_dat_hang_id = intval($don_dat_hang_id_arr[0]['don_dat_hang_id']);
				}
				$data = [
					'user_id' => $user_id,
					'don_dat_hang_id' => $don_dat_hang_id
				];
	
				$this->load->view('Order/success.php',$data); //Phan body
            }
		}
		$this->footer_header_main();
	}

	function convertpdf(){
		$user_id = $this->input->get('id');
		$don_dat_hang_id = $this->input->get('o_id');

		$this->load->model('Account_model'); //load model
		$user_info_arr = $this->Account_model->getUserForOrderByIdStatus1($user_id)->result_array();
		$ho_ten_user = $user_info_arr[0]["ho_ten"];

		$this->load->model('Order_model'); //load model
		$ddh_info_arr = $this->Order_model->getDDHbyDonHangId($don_dat_hang_id)->result_array();		
		// var_dump($ddh_info_arr);
		$ngay_lap = $ddh_info_arr[0]["ngay_dat_hang"];
		$ma_don_hang = $ddh_info_arr[0]["ma_don_hang"];
		$pt_thanh_toan = $ddh_info_arr[0]["pt_thanh_toan"];
		$tong_tien = $ddh_info_arr[0]["tong_don_gia"];
		if ($pt_thanh_toan == "cod"){
			$pt_thanh_toan = "Thanh toán khi nhận hàng";
		}
		else{
			$pt_thanh_toan = "Đã thanh toán trực tuyến";
		}

		$chi_tiet_ddh_arr = $this->Order_model->getCTDDHbyDonHangId($don_dat_hang_id)->result_array();

		$data = [
			'user_id' => $user_id,
			'don_dat_hang_id' => $don_dat_hang_id,
			'ho_ten' => $ho_ten_user,
			'ngay_dat_hang' => $ngay_lap,
			'ma_don_hang' => $ma_don_hang,
			'phuong_thuc_thanh_toan' => $pt_thanh_toan,
			'tong_thanh_tien' => $tong_tien,
			'chi_tiet_ddh' => $chi_tiet_ddh_arr
		];
		// var_dump($data);

		$this->load->view('Order/invoice.php',$data);
		// Get output html
		$html = $this->output->get_output();
		
		// Load pdf library
		$this->load->library('pdf');
		
		// Load HTML content
		$this->dompdf->loadHtml($html);
		
		// (Optional) Setup the paper size and orientation
		$this->dompdf->setPaper('A4', 'landscape');
		
		// Render the HTML as PDF
		$this->dompdf->render();
		
		// Output the generated PDF (1 = download and 0 = preview)
		$this->dompdf->stream("invoice.pdf", array("Attachment"=>0));
   }
}
