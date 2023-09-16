<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserInfo extends  CI_Controller{
	private $secret = "seminar_lpa";

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 

		$this->load->model('User_model'); //load model
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
		$this->layout_header_main(['title'=>'UserInfo', 'style' => 'UserInfo']);
		$this->load->view('UserInfo/index.php'); //Phan body
		$this->footer_header_main();
	}

	public function check_token($jwt)
    {
        try {
            //decode token with HS256 method
            $decode = JWT::decode($jwt, $this->secret, array('HS256'));
			return ($decode->id);
            // print_r($decode->id);
            // return true;
        } catch (\Exception $e) {
            // print_r(0);
			return 0;
			// return false;
        }
    }

	public function getInfo($jwt){
		$valueCheckToken = $this->check_token($jwt);
		if ($valueCheckToken != "0"){
			$decode = JWT::decode($jwt, $this->secret, array('HS256'));
			$user_id = intval($decode->id);
			$this->load->model('User_model'); //load model
			$result = $this->User_model->getUserForOrderById($user_id)->result_array();
			$resultJson = json_encode($result);
			print_r($resultJson);
		}
	}
}
