<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Home extends CI_Controller{
	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 
    } 

	private function layout_header_main($data){
		$this->load->view('Report/headermain.php', $data); 
	}

    public function index(){
		$this->layout_header_main(['title'=>'Home', 'style' => 'Home']);
		$this->load->view('Home/home.php'); //Phan body
		$this->footer_header_main();
	}

	private function footer_header_main(){
		$this->load->view('Report/footermain.php'); 
	}
}
?>

