<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Cart_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
    } 

    public function getCart(){
        $this->db->select('gio_hang_id');
        $this->db->from('gio_hang');
        return $this->db->get();
    }
    public function getCartIdByUserId($user_id){
        $this->db->select('gio_hang_id');
        $this->db->from('gio_hang');
        $this->db->where('khach_hang_id', $user_id);
        return $this->db->get();
    }

    public function addCarts($user_id){
        $object = array('khach_hang_id'=> $user_id);
		$this->db->insert('gio_hang',$object);
    }

    public function getTotalCartDB($valueCheckToken){
        $this->db->select('*');
        $this->db->from('gio_hang');
        $this->db->where('khach_hang_id', $valueCheckToken);
        return $this->db->get();
    }

    public function getUserIDByCartId($cart_id){
        $this->db->select('khach_hang_id');
        $this->db->from('gio_hang');
        $this->db->where('gio_hang_id', $cart_id);
        return $this->db->get();
    }

    public function getCartId($valueCheckToken){
        $this->db->select('gio_hang_id');
        $this->db->from('gio_hang');
        $this->db->where('khach_hang_id', $valueCheckToken);
        return $this->db->get();
    }

    public function getCartItem($cart_id){
        $this->db->select('chi_tiet_gio_hang.*,san_pham.tensanpham as ten_san_pham,san_pham.gia as gia_sp,san_pham.hinhanh as hinhanh_sp,san_pham.soluongtonkho,san_pham.trang_thai');
        $this->db->from('chi_tiet_gio_hang');
		$this->db->join('san_pham','chi_tiet_gio_hang.san_pham_id = san_pham.sanphamID');
        $this->db->where('chi_tiet_gio_hang.gio_hang_id', $cart_id);
		$this->db->where('san_pham.trang_thai', 1);
        return $this->db->get();
    }

    public function getCartItemByUserId($user_id){
        $this->db->select('chi_tiet_gio_hang.*,san_pham.tensanpham as ten_san_pham,san_pham.gia as gia_sp,san_pham.hinhanh as hinhanh_sp,san_pham.soluongtonkho');
        $this->db->from('chi_tiet_gio_hang');
		$this->db->join('san_pham','chi_tiet_gio_hang.san_pham_id = san_pham.sanphamID');
        $this->db->where('chi_tiet_gio_hang.gio_hang_id', $cart_id);
        return $this->db->get();
    }

    //Tang them 1 vao so luong cua san pham 
    public function addOneForProductInCart($cart_id,$product_id,$product_quantity){
        $this->db->where('gio_hang_id',$cart_id);
        $this->db->where('san_pham_id',$product_id);
        $object = array( 'so_luong_sp' =>  $product_quantity); 
        $this -> db -> update('chi_tiet_gio_hang',$object);   
    }

    public function insertOneForProductInCart($cart_id,$product_id,$product_quantity){
        $object = array('gio_hang_id'=> $cart_id ,'san_pham_id'=>$product_id,'so_luong_sp'=>$product_quantity);
		$this->db->insert('chi_tiet_gio_hang',$object);
    }

    public function getTotalOfCart($cart_id){
        $this->db->select('so_luong_sp, san_pham_id');
        $this->db->from('chi_tiet_gio_hang');
        $this->db->where('gio_hang_id', $cart_id);
        return $this->db->get();
    }

    public function getQuantityItemOfCart($cart_id){
        $this->db->select('tong_so_luong_sp');
        $this->db->from('gio_hang');
        $this->db->where('gio_hang_id', $cart_id);
        return $this->db->get();
    }

    public function getQuantityItemOfCartByUserID($user_id){
        $this->db->select('san_pham.sanphamID');
        $this->db->from('gio_hang');
		$this->db->join('chi_tiet_gio_hang','chi_tiet_gio_hang.gio_hang_id = gio_hang.gio_hang_id');
		$this->db->join('san_pham','chi_tiet_gio_hang.san_pham_id = san_pham.sanphamID');
        $this->db->where('khach_hang_id', $user_id);
        $this->db->where('trang_thai', 1);
        return $this->db->get();
    }

    public function updateCart($cart_id, $total, $quantity_item){
        $this->db->where('gio_hang_id',$cart_id);
        $object = array('tong_so_luong_sp'=> $quantity_item,'tong_gio_hang' => floatval($total)); 
        $this -> db -> update('gio_hang',$object); 
    }

    public function updateTotalOfCart($cart_id, $total){
        $this->db->where('gio_hang_id',$cart_id);
        $object = array('tong_gio_hang' => floatval($total)); 
        $this -> db -> update('gio_hang',$object); 
    }

	public function getQuantityDB($cart_id, $product_id){
        $this->db->select('so_luong_sp');
        $this->db->from('chi_tiet_gio_hang');
        $this->db->where('gio_hang_id', $cart_id);
        $this->db->where('san_pham_id', $product_id);
        return $this->db->get();
    }

	public function updateInputQuantityDB($cart_id, $product_id, $product_quantity){
        $this->db->where('gio_hang_id',$cart_id);
        $this->db->where('san_pham_id',$product_id);
        $object = array('so_luong_sp' => intval($product_quantity)); 
        $this -> db -> update('chi_tiet_gio_hang',$object); 
    }

	public function updateSumQuantityDB($cart_id, $product_id){
        $quantity_before_arr = $this->getQuantityDB($cart_id, $product_id)->result_array();
        $quantity_before = $quantity_before_arr[0]['so_luong_sp'];
        $this->db->where('gio_hang_id',$cart_id);
        $this->db->where('san_pham_id',$product_id);
        $object = array('so_luong_sp' => intval($quantity_before) + 1); 
        $this -> db -> update('chi_tiet_gio_hang',$object); 
    }

	public function updateSubQuantityDB($cart_id, $product_id){
        $quantity_before_arr = $this->getQuantityDB($cart_id, $product_id)->result_array();
        $quantity_before = $quantity_before_arr[0]['so_luong_sp'];
        $this->db->where('gio_hang_id',$cart_id);
        $this->db->where('san_pham_id',$product_id);
        $object = array('so_luong_sp' => intval($quantity_before) - 1); 
        $this -> db -> update('chi_tiet_gio_hang',$object); 
    }

	public function removeItem($cart_id, $product_id){
        $this->db->where('gio_hang_id', $cart_id);
        $this->db->where('san_pham_id', $product_id);
        $this->db->delete('chi_tiet_gio_hang');
    }

	public function getCartByCartId($cart_id){
		$this->db->select('*');
        $this->db->from('gio_hang');
        $this->db->where('gio_hang_id', $cart_id);
        return $this->db->get();
	}

    public function removeAllItemOfCart($cart_id){
        $this->db->where('gio_hang_id', $cart_id);
        $this->db->delete('chi_tiet_gio_hang');
    }

    public function updateCartAfterOrder($cart_id){
        $date= date("Y-m-d");
        $time=date("H:m");
        $now_time=$date."T".$time;

        $this->db->where('gio_hang_id',$cart_id);
        $object = array('tong_so_luong_sp'=> 0,'tong_gio_hang' => 0,'ngay_thay_doi_gn' => $now_time); 
        $this -> db -> update('gio_hang',$object);     
    } 
}

?>
