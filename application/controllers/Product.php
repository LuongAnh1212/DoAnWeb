<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Product extends CI_Controller{

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 
    } 

	private function layout_header_main($data){
		$this->load->view('Report/headermain.php', $data); 
	}

    public function index(){
		$this->layout_header_main(['title'=>'Product', 'style' => 'Product']);

		$this->load->model('Sanpham_model');
		$minNPPrice = $this->Sanpham_model->getMinNBProductPrice();
		$maxNPPrice = $this->Sanpham_model->getMaxNBProductPrice();

		$data = ['min_NB_price' => $minNPPrice,
				 'max_NB_Price' => $maxNPPrice];

		$this->load->view('Product/product.php', $data); //Phan body
		$this->footer_header_main();
	}

	public function detailOfProduct($id){
		$this->load->database();

		//Lay DL theo id
		$this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getProductById($id)->result_array();
		$resultJson = json_encode($result);

		$this->layout_header_main(['title'=>'Product Detail', 'style' => 'ProductDetail', 'active'=> '2']);
		$this->load->view('Product/detailProduct.php');
		$this->footer_header_main();
	}

	public function danhmucsanpham($Loaiid,$DMid){
		$this->load->database();

		//Lay DL theo id
		$this->load->model('Sanpham_model');
		$result = $this->Sanpham_model->getProductByDM($Loaiid,$DMid)->result_array();
		$resultJson = json_encode($result);

		$array = $this->uri->uri_to_assoc(3);
		// print_r($array["loai"]);
		$this->layout_header_main(['title'=>'Danh mục sản phẩm', 'style' => 'Product']);
		$this->load->view('Product/listProductByDM.php');
		$this->footer_header_main();
	}

	public function search(){
		$this->layout_header_main(['title'=>'Search', 'style' => 'Search']);
		$this->load->view('Product/searchProduct.php');
		$this->footer_header_main();
	}

	private function footer_header_main(){
		$this->load->view('Report/footermain.php'); 
	}
}
?>

