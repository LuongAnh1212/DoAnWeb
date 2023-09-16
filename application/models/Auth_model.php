<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Auth_model extends CI_Model{
	public function __construct () { 
        parent :: __construct (); 
    } 

    function get_hashed($email){
        $this->db->select('mat_khau');
        $this->db->from('khach_hang');
        $this->db->where('email', $email);
        $this->db->where('trang_thai', 1);
        $query = $this->db->get();
        if ($query->num_rows() > 0){
            return $query->result_array()[0]["mat_khau"];
        }
        else{
            return "Not found";
        }
    }

    function check_login($email,$pass){
        $this->db->select('*');
        $this->db->from('khach_hang');
        $this->db->where('email', $email);
        $this->db->where('trang_thai', 1);
        $this->db->where('delete_au', 0);
        $query = $this->db->get();

        $hashed = $this->get_hashed($email);

        if ($query->num_rows() > 0 && password_verify($pass,$hashed)){ //password_verify($pass,$hashed): kiem tra pass KH moi nhap co giong trong DB khong.
            return $query->result_array();
        }
        else{
            return "User not found";
            // $data = ['pass'=> $pass, 'hashed'=> $hashed];
            // return $data;
        }
    }

    function check_login_AD($email,$pass){
        $this->db->select('*');
        $this->db->from('quan_tri_vien');
        $this->db->where('email', $email);
        $this->db->where('trang_thai', 1);
        $query = $this->db->get();

        $hashed = $this->get_hashed($email);

        if ($query->num_rows() > 0 && password_verify($pass,$hashed)){ //password_verify($pass,$hashed): kiem tra pass KH moi nhap co giong trong DB khong.
            return $query->result_array();
        }
        else{
            return "User not found";
        }
    }
}
?>
