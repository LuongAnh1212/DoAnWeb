<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Loaisanpham_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
    } 

    public function getLoaisanpham(){
        $this->db->select('*');
        $this->db->from('loai_san_pham');
        $this->db->where('trang_thai', 1);
        return $this->db->get();
    }

    public function getLoaisanphamAD(){
        $this->db->select('loai_san_pham.*, danh_muc.ten as ten_danhmuc, COUNT(*) as so_luong_dm');
        $this->db->from('loai_san_pham');
        $this->db->join('danh_muc', 'danh_muc.loaiID = loai_san_pham.loaiID','left');
        $this->db->group_by('loaiID');

        return $this->db->get();
    }

    public function getLoaisanphamByID($idLoaiSp){
        $this->db->select('loai_san_pham.*, danh_muc.ten as ten_danhmuc, COUNT(*) as so_luong_dm');
        $this->db->from('loai_san_pham');
        $this->db->where('loai_san_pham.loaiID', $idLoaiSp);
        $this->db->join('danh_muc', 'danh_muc.loaiID = loai_san_pham.loaiID','left');
        $this->db->group_by('loaiID');
        return $this->db->get();
    }

    public function addLSP_I($name,$file,$status){
        $data = array(
            'ten' => $name,
            'anh' => $file,
            'trang_thai' => $status,
        );
        $this->db->insert('loai_san_pham', $data);
    }

    public function addLSP_NI($name,$status){
        $data = array(
            'ten' => $name,
            'trang_thai' => $status,
        );
        $this->db->insert('loai_san_pham', $data);
    }

    public function editLSP($idLoaiSp,$name,$file,$status){
        $this->db->where('loaiID', $idLoaiSp);
        $object = array(
            'ten' => $name,
            'anh' => $file,
            'trang_thai' => $status,
        );
        $this -> db -> update('loai_san_pham',$object);   
    }
    public function editLSPNotImage($idLoaiSp,$name,$status){
        $this->db->where('loaiID', $idLoaiSp);
        $object = array(
            'ten' => $name,
            'trang_thai' => $status,
        );
        $this -> db -> update('loai_san_pham',$object);   
    }

    public function getStatus($idLoaiSp){
        $this->db->select('trang_thai');
        $this->db->from('loai_san_pham');
        $this->db->where('loaiID', $idLoaiSp);
        return $this->db->get();
    }

    public function deleteLSP($idLoaiSp){
        $this->db->where('loaiID', $idLoaiSp);
        $this->db->delete('loai_san_pham'); 
    }
}   
?>