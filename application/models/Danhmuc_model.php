<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Danhmuc_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
    } 

    public function getDanhmuc(){
        $this->db->select('*');
        $this->db->from('danh_muc');
        $this->db->where('trang_thai', 1);
        return $this->db->get();
    }

    public function getDanhmucAD(){
        $this->db->select('danh_muc.*, loai_san_pham.ten as loai_san_pham, san_pham.tensanpham as ten_sp, COUNT(*) as so_luong_sp');
        $this->db->from('danh_muc');
        $this->db->join('loai_san_pham', 'loai_san_pham.loaiID = danh_muc.loaiID');
        $this->db->join('san_pham', 'san_pham.danhmucID = danh_muc.danhmucID','left');
        $this->db->group_by('danhmucID');

        return $this->db->get();
    }

    public function getDMsanphamByID($idDMSP){
        $this->db->select('danh_muc.*, loai_san_pham.ten as loai_san_pham, san_pham.tensanpham as ten_sp, COUNT(*) as so_luong_sp');
        $this->db->from('danh_muc');
        $this->db->where('danh_muc.danhmucID', $idDMSP);
        $this->db->join('loai_san_pham', 'loai_san_pham.loaiID = danh_muc.loaiID');
        $this->db->join('san_pham', 'san_pham.danhmucID = danh_muc.danhmucID','left');
        $this->db->group_by('danhmucID');

        return $this->db->get();
    }

    public function addDMSP_NI($name,$loaiSP_ID,$status){
        $data = array(
            'ten' => $name,
            'loaiID' =>  $loaiSP_ID,
            'trang_thai' => $status,
        );
        $this->db->insert('danh_muc', $data);
    }

    public function addDMSP_I($name,$loaiSP_ID,$file,$status){
        $data = array(
            'ten' => $name,
            'loaiID' =>  $loaiSP_ID,
            'trang_thai' => $status,
            'anh' => $file,
        );
        $this->db->insert('danh_muc', $data);
    }

    public function getStatus($idDMSp){
        $this->db->select('trang_thai');
        $this->db->from('danh_muc');
        $this->db->where('danhmucID', $idDMSp);
        return $this->db->get();
    }

    public function deleteDMSP($idDMSp_int){
        $this->db->where('danhmucID', $idDMSp_int);
        $this->db->delete('danh_muc'); 
    }

    public function editDMSP_NI($id_dmsp_ed, $name,$loaiSP_ID,$status){
        $this->db->where('danhmucID', $id_dmsp_ed);
        $object = array(
            'ten' => $name,
            'loaiID' =>  $loaiSP_ID,
            'trang_thai' => $status,
        );
        $this -> db -> update('danh_muc',$object);   
    }

    public function editDMSP_I($id_dmsp_ed, $name,$loaiSP_ID,$file,$status){
        $this->db->where('danhmucID', $id_dmsp_ed);
        $object = array(
            'ten' => $name,
            'loaiID' =>  $loaiSP_ID,
            'trang_thai' => $status,
            'anh' => $file,
        );
        $this -> db -> update('danh_muc',$object); 
    } 
}
?>