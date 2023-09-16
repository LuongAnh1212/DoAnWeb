<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Sanpham_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
    } 

    public function getMinNBProductPrice(){
        $this->db->select('san_pham.*');
        $this->db->from('san_pham');
        $this->db->where('noi_bat',1);
        $this->db->select_min('gia');
        $this->db->limit(1);
        $query = $this->db->get();
        $result = $query->row();
        return $price = $result->gia;
    }

    public function getMaxNBProductPrice(){
        $this->db->select('san_pham.*');
        $this->db->from('san_pham');
        $this->db->where('noi_bat',1);
        $this->db->select_max('gia');
        $this->db->limit(1);
        $query = $this->db->get();
        $result = $query->row();
        return $price = $result->gia;
    }

    public function getSPNoiBat(){
        $this->db->select('san_pham.sanphamID, san_pham.loaiID, san_pham.danhmucID, san_pham.tensanpham, san_pham.gia, san_pham.hinhanh, san_pham.soluongtonkho, san_pham.soluongdaban, san_pham.noi_bat');
        $this->db->from('san_pham');
        $this->db->join('loai_san_pham', 'loai_san_pham.loaiID = san_pham.loaiID');
		$this->db->join('danh_muc', 'danh_muc.danhmucID = san_pham.danhmucID');
        $this->db->where('san_pham.noi_bat',1);
        $this->db->where('san_pham.trang_thai',1);
        $this->db->where('loai_san_pham.trang_thai',1);
        $this->db->where('danh_muc.trang_thai',1);
        $this->db->order_by('soluongdaban', 'DESC');
        return $this->db->get();
    }

    public function getSPMoiNhat(){
        $this->db->select('ngaytao');
        $this->db->from('san_pham');
        $ngaytao = $this->db->get();
        // $result = strtotime($ngaytao);
       
        return $ngaytao;
    }

    public function getProductById($id){
		$this->db->select('san_pham.*,loai_san_pham.ten as `ten_loai_sp`,danh_muc.ten as `ten_danh_muc`');
        $this->db->from('san_pham');
		$this->db->join('loai_san_pham', 'loai_san_pham.loaiID = san_pham.loaiID');
		$this->db->join('danh_muc', 'danh_muc.danhmucID = san_pham.danhmucID');
		$this->db->where('san_pham.sanphamID', $id);
        $this->db->where('san_pham.trang_thai', 1);
        return $this->db->get();
    }

    public function getProductADById($id){
        $this->db->select('san_pham.*,loai_san_pham.ten as `ten_loai_sp`,danh_muc.ten as `ten_danh_muc`');
        $this->db->from('san_pham');
		$this->db->join('loai_san_pham', 'loai_san_pham.loaiID = san_pham.loaiID');
		$this->db->join('danh_muc', 'danh_muc.danhmucID = san_pham.danhmucID');
		$this->db->where('san_pham.sanphamID', $id);
        return $this->db->get();
    }

	public function getListSmallImg($id){
		$this->db->select('sanphamID,duongdan');
        $this->db->from('anh_san_pham');
		$this->db->where('sanphamID', $id);
		return $this->db->get();
	}

    public function getProductByDM($Loaiid,$DMid){
        $this->db->select('sanphamID, loaiID, danhmucID, tensanpham, gia, hinhanh, soluongtonkho, noi_bat');
        $this->db->from('san_pham');
        $this->db->where('loaiID',intval($Loaiid));
        $this->db->where('danhmucID',intval($DMid));
        $this->db->where('trang_thai',1);
        return $this->db->get();
    }

    public function getProductForCart(){
		$this->db->select('sanphamID,gia');
		$this->db->from('san_pham');
		// $this->db->where('deleted', 1);
		// $this->db->where('hidden', 0);
        return $this->db->get();
	}

	//select san_pham
	public function getProduct(){
        $this->db->select('san_pham.sanphamID, san_pham.loaiID, san_pham.danhmucID, san_pham.tensanpham, san_pham.gia, san_pham.hinhanh, san_pham.soluongtonkho, san_pham.soluongdaban, san_pham.noi_bat');
        $this->db->from('san_pham');
        $this->db->join('loai_san_pham', 'loai_san_pham.loaiID = san_pham.loaiID');
		$this->db->join('danh_muc', 'danh_muc.danhmucID = san_pham.danhmucID');
        $this->db->where('san_pham.trang_thai',1);
        $this->db->where('loai_san_pham.trang_thai',1);
        $this->db->where('danh_muc.trang_thai',1);
        $this->db->order_by('soluongdaban', 'DESC');
        return $this->db->get();
    }

    //Admin
    public function getsanphamAD(){
        $this->db->select('san_pham.sanphamID,san_pham.loaiID,loai_san_pham.ten as loai_san_pham,san_pham.danhmucID,danh_muc.ten as danh_muc,tensanpham,san_pham.gia,san_pham.hinhanh,soluongtonkho,soluongdaban,san_pham.noi_bat,san_pham.trang_thai,san_pham.cap_nhat_gan_nhat');
        $this->db->from('san_pham');
        $this->db->join('loai_san_pham', 'loai_san_pham.loaiID = san_pham.loaiID');
        $this->db->join('danh_muc', 'san_pham.danhmucID = danh_muc.danhmucID','left');
        $this->db->order_by('san_pham.sanphamID', 'DESC');

        return $this->db->get();
    }

    public function addSP($name,$file,$loaiSP_ID,$DMSP_ID,$gia_sp,$kho_sp,$status,$noi_bat,$chi_tiet_sp,$mo_ta_sp){
        $data = array(
            'tensanpham' => $name,
            'hinhanh' => $file,
            'loaiID' =>  $loaiSP_ID,
            'danhmucID' =>  $DMSP_ID,
            'gia' =>  $gia_sp,
            'soluongtonkho' =>  $kho_sp,
            'trang_thai' => $status,
            'noi_bat' => $noi_bat,
            'chitiet' => $chi_tiet_sp,
            'mota' => $mo_ta_sp,
        );
        $this->db->insert('san_pham', $data);
    }
    
    public function editSP_NI($id_sp,$name,$loaiSP_ID,$DMSP_ID,$gia_sp,$kho_sp,$daban_sp,$status,$noi_bat,$chi_tiet_sp,$mo_ta_sp){
        $this->db->where('sanphamID', $id_sp);
        $object = array(
            'tensanpham' => $name,
            'loaiID' =>  $loaiSP_ID,
            'danhmucID' =>  $DMSP_ID,
            'gia' =>  $gia_sp,
            'soluongtonkho' =>  $kho_sp,
            'soluongdaban' => $daban_sp,
            'trang_thai' => $status,
            'noi_bat' => $noi_bat,
            'chitiet' => $chi_tiet_sp,
            'mota' => $mo_ta_sp,
        );
        $this -> db -> update('san_pham',$object);   
    }

    public function editSP_I($id_sp,$name,$file,$loaiSP_ID,$DMSP_ID,$gia_sp,$kho_sp,$daban_sp,$status,$noi_bat,$chi_tiet_sp,$mo_ta_sp){
        $this->db->where('sanphamID', $id_sp);
        $object = array(
            'tensanpham' => $name,
            'loaiID' =>  $loaiSP_ID,
            'danhmucID' =>  $DMSP_ID,
            'gia' =>  $gia_sp,
            'soluongtonkho' =>  $kho_sp,
            'soluongdaban' => $daban_sp,
            'trang_thai' => $status,
            'noi_bat' => $noi_bat,
            'chitiet' => $chi_tiet_sp,
            'mota' => $mo_ta_sp,
            'hinhanh' => $file,
        );
        $this -> db -> update('san_pham',$object); 
    }

    public function deleteSP($idSp_int){
        $this->db->where('sanphamID', $idSp_int);
        $this->db->delete('san_pham'); 
    }

    public function getProductIDLast(){
        $this->db->select('sanphamID');
        $this->db->from('san_pham');
        $this->db->order_by('sanphamID', 'DESC');
        $this->db->limit(1);

        return $this->db->get();
    }

    public function getAnhSanphamADById($id_san_pham){
        $this->db->select('*');
        $this->db->from('anh_san_pham');
        $this->db->where('sanphamID', $id_san_pham);
        return $this->db->get();
    }
}
?>
