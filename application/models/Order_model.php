<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Order_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
    } 

    public function addOrder($data){
        //insert DB
        $date= date("Y-m-d");
        $time=date("H:m");
        $now_time=$date."T".$time;

		$object = array('ma_don_hang'=>$data['MaDonHang'], 'khach_hang_id'=>$data['KhachHangID'], 'ngay_dat_hang'=> $now_time, 'tong_don_gia'=>$data['TongDonGia'], 'pt_thanh_toan'=>$data['orderType'] );
		$this->db->insert('don_dat_hang',$object);
    }

    public function getDDHIdbyMaDonHang($ma_don_hang){
        $this->db->select('don_dat_hang_id');
        $this->db->from('don_dat_hang');
        $this->db->where('ma_don_hang', $ma_don_hang);
        return $this->db->get();
    }

    public function getDDHbyDonHangId($don_dat_hang_id){
        $this->db->select('*');
        $this->db->from('don_dat_hang');
        $this->db->where('don_dat_hang_id', $don_dat_hang_id);
        return $this->db->get();
    }

    public function getCTDDHbyDonHangId($don_dat_hang_id){
        $this->db->select('chi_tiet_ddh.*,san_pham.tensanpham');
        $this->db->from('chi_tiet_ddh');
        $this->db->join('san_pham','chi_tiet_ddh.san_pham_id = san_pham.sanphamID');
        $this->db->where('don_dat_hang_id', $don_dat_hang_id);
        return $this->db->get();
    }

    public function getAllOrderOfUser($user_id){
        $this->db->select('*');
        $this->db->from('don_dat_hang');
        $this->db->where('khach_hang_id', $user_id);
        return $this->db->get();
    }

    public function getAllOrderDetailOfUser(){
        $this->db->select('chi_tiet_ddh.*, san_pham.tensanpham, san_pham.hinhanh');
        $this->db->from('chi_tiet_ddh');
        $this->db->join('san_pham', 'chi_tiet_ddh.san_pham_id = san_pham.sanphamID');
        return $this->db->get();
    }

    public function addOrderDetails($don_dat_hang_id, $san_pham_id, $gia, $so_luong){
        //insert DB

		$object = array('don_dat_hang_id'=>$don_dat_hang_id, 'san_pham_id'=>$san_pham_id, 'gia'=> $gia, 'so_luong'=>$so_luong);
		$this->db->insert('chi_tiet_ddh',$object);
    }
}
