<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Blog_model extends CI_Model{
	public function __construct () { 
        parent :: __construct (); 
    } 

    public function getBlog(){
      	$this->db->order_by("date", "DESC");
		return $this->db->get('blog');
    }

}
