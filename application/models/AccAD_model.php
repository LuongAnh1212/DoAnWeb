<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class AccAD_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
        $this -> load -> library ( 'email' );
    } 

    public function getAccountAD(){
        return $this->db->get('quan_tri_vien');
    }

    public function getAdmin($email){
         // Tra ve nhung cot co la user, da duoc kich hoat va co email trung
         $this->db->where('email', $email);
         return $this->db->get('quan_tri_vien');
    }

    public function getAdminStatus0($email){
        // Tra ve nhung cot co la user, chua duoc kich hoat va co email trung
        $this->db->where('email', $email);
        $this->db->where('trang_thai', 0);
        return $this->db->get('quan_tri_vien');
    }

    public function updateAdmin($name, $email, $hashed){
        $this->db->where('email', $email);
        $object = array('ten'=>$name, 'mat_khau'=>$hashed);
		$this-> db-> update('quan_tri_vien', $object);
    }

    public function addAdmin($name, $email, $hashed){
        $object = array('ten'=>$name, 'email'=>$email, 'mat_khau'=>$hashed);
		$this-> db-> insert ('quan_tri_vien', $object);
    }
}