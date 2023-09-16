<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Api extends CI_Controller{
	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 
        $this->load->database();
    } 

    public function loaisanpham(){
        $this->load->model('Loaisanpham_model');
		$result = $this->Loaisanpham_model->getLoaisanpham()->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

	public function loaisanphamAD(){
        $this->load->model('Loaisanpham_model');
		$result = $this->Loaisanpham_model->getLoaisanphamAD()->result_array();

		for ($i=0; $i< count($result); $i++){
			if ($result[$i]['ten_danhmuc'] == null){
				$result[$i]['so_luong_dm'] = 0;
			}
		}
		
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);
		print_r($resultJson);
	}

	public function loaisanphamByID($idLoaiSp){
        $this->load->model('Loaisanpham_model');
		$result = $this->Loaisanpham_model->getLoaisanphamByID($idLoaiSp)->result_array();

		for ($i=0; $i< count($result); $i++){
			if ($result[$i]['ten_danhmuc'] == null){
				$result[$i]['so_luong_dm'] = 0;
			}
		}

		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);
		print_r($resultJson);
	}

	public function DMsanphamByID($idDMSP){
		$this->load->model('Danhmuc_model');
		$result = $this->Danhmuc_model->getDMsanphamByID($idDMSP)->result_array();

		for ($i=0; $i< count($result); $i++){
			if ($result[$i]['ten_sp'] == null){
				$result[$i]['so_luong_sp'] = 0;
			}
		}

		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);
		print_r($resultJson);
	}

    public function danhmuc(){
        $this->load->model('Danhmuc_model');
		$result = $this->Danhmuc_model->getDanhmuc()->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
    }

	public function danhmucAD(){
        $this->load->model('Danhmuc_model');
		$result = $this->Danhmuc_model->getDanhmucAD()->result_array();

		for ($i=0; $i< count($result); $i++){
			if ($result[$i]['ten_sp'] == null){
				$result[$i]['so_luong_sp'] = 0;
			}
		}

		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);
		print_r($resultJson);
    }

	//Bang san_pham
	public function Products(){
		$this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getProduct()->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

	public function sanphamAD(){
		$this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getsanphamAD()->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

    public function sanphamnoibat(){
        $this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getSPNoiBat()->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
    }

    public function sanphammoinhat(){
        $this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getSPMoiNhat()->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
    }

    public function sanpham($id){
		//Lay DL theo id
		$this->load->model('Sanpham_model');
		$result1 = $this->Sanpham_model->getProductById($id)->result_array();

		$result2 = $this->Sanpham_model->getListSmallImg($id)->result_array();
		$listSmallImg = array();

		for($j=0; $j<count($result1); $j++){
			for($i=0; $i<count($result2); $i++){
				$cell1 = $result1[$j];
				$cell2 = $result2[$i];
				if ($cell1['sanphamID'] == $cell2['sanphamID']){
					array_push($listSmallImg,$cell2['duongdan']);
				}
				if ($i == count($result2) - 1){
					$result1[$j]['small_imgs'] = $listSmallImg;
				}
			}
			$listSmallImg = array();
		}

		// print_r($result1);
		$resultJson = json_encode($result1, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

	public function sanphamADById($id){
		//Lay DL theo id
		$this->load->model('Sanpham_model');
		$result1 = $this->Sanpham_model->getProductADById($id)->result_array();

		$result2 = $this->Sanpham_model->getListSmallImg($id)->result_array();
		$listSmallImg = array();

		for($j=0; $j<count($result1); $j++){
			for($i=0; $i<count($result2); $i++){
				$cell1 = $result1[$j];
				$cell2 = $result2[$i];
				if ($cell1['sanphamID'] == $cell2['sanphamID']){
					array_push($listSmallImg,$cell2['duongdan']);
				}
				if ($i == count($result2) - 1){
					$result1[$j]['small_imgs'] = $listSmallImg;
				}
			}
			$listSmallImg = array();
		}

		// print_r($result1);
		$resultJson = json_encode($result1, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

	public function dssanphambydm($Loaiid,$DMid){
		//Lay DL theo id
		$this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getProductByDM($Loaiid,$DMid)->result_array();
		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

	public function chitietgiohang($giohang_id){
		$this->load->model('Cart_model');
		$result = $this->Cart_model->getCartItem($giohang_id)->result_array();
		$resultJson = json_encode($result);
		print_r($resultJson);
	}

	public function cart($cart_id){
		$this->load->model('Cart_model');
		$result = $this->Cart_model->getCartByCartId($cart_id)->result_array();
		$resultJson = json_encode($result);
		print_r($resultJson);
	}

	public function Blog(){
		$this->load->model('Blog_model');
		$result = $this->Blog_model->getBlog()->result_array();
		$resultJson = json_encode($result);

		print_r($resultJson);
	}

	public function AccountProfile(){
		$this->load->model('Account_model');
		$result = $this->Blog_model->getBlog()->result_array();
		$resultJson = json_encode($result);

		print_r($resultJson);
	}

	public function AllOrderOfUser($user_id){
		$this->load->model('Order_model');

		$result1 = $this->Order_model->getAllOrderOfUser($user_id)->result_array();
		$result2 = $this->Order_model->getAllOrderDetailOfUser()->result_array();
		$listOrderDetail = array();

		for($j=0; $j<count($result1); $j++){
			for($i=0; $i<count($result2); $i++){
				$cell1 = $result1[$j];
				$cell2 = $result2[$i];
				if ($cell1['don_dat_hang_id'] == $cell2['don_dat_hang_id']){
					array_push($listOrderDetail,$cell2);
				}
				if ($i == count($result2) - 1){
					$result1[$j]['orders_detail'] = $listOrderDetail;
				}
			}
			$listOrderDetail = array();
		}

		$resultJson = json_encode($result1, JSON_NUMERIC_CHECK);

		print_r($resultJson);
	}

	public function QuanTriVien(){
		$this->load->model('AccAD_model');
		$result = $this->AccAD_model->getAccountAD()->result_array();
		$resultJson = json_encode($result);

		print_r($resultJson);
	}

	public function Users(){
		$this->load->model('User_model');
		$result = $this->User_model->getAccountUsers()->result_array();
		$resultJson = json_encode($result);

		print_r($resultJson);
	}

	public function UserByID($idUser){
        $this->load->model('Account_model');
		$result = $this->Account_model->getUserById($idUser)->result_array();

		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);
		print_r($resultJson);
	}

	public function anhSanphamADById($id_san_pham){
		$this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getAnhSanphamADById($id_san_pham)->result_array();

		$resultJson = json_encode($result, JSON_NUMERIC_CHECK);
		print_r($resultJson);
	}
}
?>

