<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends  CI_Controller{
	private $secret = "seminar_lpa";

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 

		$this->load->model('Blog_model'); //load model
		///Allowing CORS
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    } 

    private function layout_header_main($data){
		$this->load->view('Report/headermain.php', $data); 
	}

    private function footer_header_main(){
		$this->load->view('Report/footermain.php'); 
	}

    public function index(){
		$this->layout_header_main(['title'=>'Blog', 'style' => 'Blog']);
		$this->load->view('Blog/index.php'); //Phan body
		$this->footer_header_main();
	}
}

?>
