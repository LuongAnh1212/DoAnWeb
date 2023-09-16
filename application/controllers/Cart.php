<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cart extends  CI_Controller{
	private $secret = "seminar_lpa";

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 

		$this->load->model('Cart_model'); //load model
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
		$this->layout_header_main(['title'=>'Cart', 'style' => 'Cart']);
		$this->load->view('Cart/index.php'); //Phan body
		$this->footer_header_main();
	}

	public function check_token($jwt)
    {
        try {
            //decode token with HS256 method			
            $decode = JWT::decode($jwt, $this->secret, array('HS256'));
			return ($decode->id);
            // print_r($decode->id);
            // return true;
        } catch (\Exception $e) {
            // print_r(0);
			return 0;
			// return false;
        }
    }


	public function addCart(){
		$user_id = $this->input->post('user_id');
		// $user_id=2;
		$this->load->model('Cart_model'); //load model
		$jwt = $this->input->post('authorization');
		// $jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1b25ncGh1b25nYW5oMzBAZ21haWwuY29tIiwiaWQiOiIyIiwidXNlclR5cGUiOiJ1c2VyIn0.up_N00igaHOFPh9Bnhys31UjiIKGwHAl_4LbSBhn_YU";
		$valueCheckToken = $this->check_token($jwt);

		if ($valueCheckToken != "0"){
			//Kiểm tra nếu user_id đã tồn tại trong table carts thì không add nữa
			$checkUserId = $this->Cart_model->getCartIdByUserId($user_id)->result();
			if ($checkUserId == []){
				$this->Cart_model->addCarts($user_id);  //goi
			}
			else{
				//Neu da ton tai thi tra ve total cua gio hang để kiểm tra giỏ hàng có sản phẩm hay không 
				$result_arr = $this->Cart_model->getTotalCartDB($valueCheckToken)->result_array();
				$result = $result_arr[0]['total'];
				if ($result == "0"){
					$result = "noproduct";
				}
				print_r($result);
			}
		}
    }

	public function getCartId(){
		$jwt = $this->input->post('authorization');
		// $jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1b25ncGh1b25nYW5oMzBAZ21haWwuY29tIiwiaWQiOiIyIiwidXNlclR5cGUiOiJ1c2VyIn0.up_N00igaHOFPh9Bnhys31UjiIKGwHAl_4LbSBhn_YU";
		$valueCheckToken = $this->check_token($jwt);
		
		if ($valueCheckToken != "0"){
			$cartId_arr = $this->Cart_model->getCartId(intval($valueCheckToken))->result_array(); //$valueCheckToken = user_id
			$cartId = $cartId_arr[0]['gio_hang_id'];
			print_r($cartId);
		}
		else{
			print_r(0);		
		}
	}

	public function addCartItemFromProduct(){
		$jwt = $this->input->post('authorization');
		$valueCheckToken = $this->check_token($jwt);

		if ($valueCheckToken != "0"){
			$cart_id = $this->input->post('cart_id');
			$product_id = $this->input->post('product_id');
			$product_quantity = $this->input->post('product_quantity');

			$check_add = intval($this->input->post('check_add'));
			if ($check_add == 1){
				$this->Cart_model->addOneForProductInCart($cart_id,$product_id,$product_quantity);
			}
			else{
				$this->Cart_model->insertOneForProductInCart($cart_id,$product_id,$product_quantity);
			}
			print($cart_id);
		}
		else{
			print_r(0);
		}
	}

	public function updateTotalOfCart(){
		$jwt = $this->input->post('authorization');
		$valueCheckToken = $this->check_token($jwt);

		if ($valueCheckToken != "0"){
			$cart_id = $this->input->post('cart_id');
			$check_add = intval($this->input->post('check_add'));
			
			$result1 = $this->Cart_model->getTotalOfCart($cart_id)->result_array();

			$this->load->model('Sanpham_model');
			$result2 = $this->Sanpham_model->getProductForCart()->result_array();

			for($j=0; $j<count($result1); $j++){
				for($i=0; $i<count($result2); $i++){
					$cell = $result1[$j];
					$cell2 = $result2[$i];
					if ($cell['san_pham_id'] == $cell2['sanphamID']){
						$result1[$j]['product_price'] = $cell2['gia'];
					}
				}
				
			}
			$total = 0;
			for($k=0; $k <count($result1); $k++){
				$total += floor(floatval($result1[$k]['product_price'])) * intval($result1[$k]['so_luong_sp']);
			}

			$quantity_item = 0;
			$quantity_item_before_arr = $this->Cart_model->getQuantityItemOfCart($cart_id)->result_array();
			$quantity_item_before = intval($quantity_item_before_arr[0]['tong_so_luong_sp']);
			$quantity_item = $quantity_item_before + 1;
			if ($check_add == 0){
				$this->Cart_model->updateCart($cart_id, $total, $quantity_item);
			}
			else {
				$this->Cart_model->updateTotalOfCart($cart_id, $total);
			}
			print_r($quantity_item);
		}
		else{
			print_r(0);
		}
	}

	public function updateQuantity(){
		$jwt = $this->input->post('authorization');
		$valueCheckToken = $this->check_token($jwt);

		if ($valueCheckToken != "0"){
			$cart_id = $this->input->post('cart_id');
			$product_id = $this->input->post('product_id');
			$operation = $this->input->post('operation');
			if ($operation == "input_quantity"){
				$product_quantity = $this->input->post('product_quantity');
				$this->Cart_model->updateInputQuantityDB($cart_id, $product_id, $product_quantity);
			}
			else if ($operation == "+"){
				$this->Cart_model->updateSumQuantityDB($cart_id, $product_id);
			}
			else if ($operation == "-"){
				$this->Cart_model->updateSubQuantityDB($cart_id, $product_id);
			}
			else if ($operation = "check_inventory_after_long_time"){
				$product_quantity = $this->input->post('product_quantity');
				$this->Cart_model->updateInputQuantityDB($cart_id, $product_id, $product_quantity);
			}
		}
		else{
			print_r(0);		
		}
	}

	public function removeItem(){
		$jwt = $this->input->post('authorization');
		$valueCheckToken = $this->check_token($jwt);
		if ($valueCheckToken != "0"){
			$cart_id = $this->input->post('cart_id');
			$product_id = $this->input->post('product_id');
			$this->Cart_model->removeItem($cart_id, $product_id);
			print_r($cart_id);
		}
		else{
			print_r(0);
		}
	}

	public function updateCart(){
		$jwt = $this->input->post('authorization');
		// $jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1b25ncGh1b25nYW5oMzBAZ21haWwuY29tIiwiaWQiOiIyIiwidXNlclR5cGUiOiJ1c2VyIn0.up_N00igaHOFPh9Bnhys31UjiIKGwHAl_4LbSBhn_YU";
		$valueCheckToken = $this->check_token($jwt);
		if ($valueCheckToken != "0"){
			$cart_id = $this->input->post('cart_id');
			// $cart_id = 2;
			$result1 = $this->Cart_model->getTotalOfCart($cart_id)->result_array();

			$this->load->model('Sanpham_model');
			$result2 = $this->Sanpham_model->getProductForCart()->result_array();

			for($j=0; $j<count($result1); $j++){
				for($i=0; $i<count($result2); $i++){
					$cell = $result1[$j];
					$cell2 = $result2[$i];
					if ($cell['san_pham_id'] == $cell2['sanphamID']){
						$result1[$j]['gia_san_pham'] = $cell2['gia'];
					}
				}
				
			}
			$resultJson = json_encode($result1);
			$total = 0;
			for($k=0; $k <count($result1); $k++){
				$total += floor(floatval($result1[$k]['gia_san_pham']) * intval($result1[$k]['so_luong_sp']));
			}

			$quantity_item_before_arr = $this->Cart_model->getQuantityItemOfCart($cart_id)->result_array();
			$quantity_item_before = intval($quantity_item_before_arr[0]['tong_so_luong_sp']);
			$quantity_item = $quantity_item_before - 1;

			$this->Cart_model->updateCart($cart_id, $total, $quantity_item);
		}
		else{
			print_r(0);
		}
	}

	public function getQuantityItemInCart(){
		$jwt = $this->input->post('authorization');
		// $jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1b25ncGh1b25nYW5oMzBAZ21haWwuY29tIiwiaWQiOiI0IiwidXNlclR5cGUiOiJ1c2VyIn0.gP-CkS-M6MeHafk94Bvq7Q1iagQxTkoJOsvZ04_QGeI";
		$valueCheckToken = $this->check_token($jwt);
		
		if ($valueCheckToken != "0"){
			$quantity_item_arr = $this->Cart_model->getQuantityItemOfCartByUserID(intval($valueCheckToken))->result_array();
			$quantity_item = intval(count($quantity_item_arr));
			print_r($quantity_item);
		}
		else{
			print_r(0);		
		}
	}

}

?>
