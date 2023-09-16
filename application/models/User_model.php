<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
    } 

	public function getUserForOrderById($id){
        $this->db->select('khach_hang_id,ho_ten,email,so_dien_thoai,dia_chi');
        $this->db->from('khach_hang');
		$this->db->where('khach_hang_id', $id);
		return $this->db->get();
    }

    public function getAccountUsers(){
        $this->db->select('*');
        $this->db->from('khach_hang');
        $this->db->order_by('trang_thai', 'DESC');
        return $this->db->get();
    }
}
?>
