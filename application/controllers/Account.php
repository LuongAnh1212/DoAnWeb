<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account extends CI_Controller{
	private $secret = "seminar_lpa";

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 
        $this->load->helper('captcha');
		$this -> load -> library ( 'email' );
		$this->load->library('session');
		$this->load->model('Account_model');

		 ///Allowing CORS
		 header('Access-Control-Allow-Origin: *');
		 header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
		 header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    } 

	private function layout_header_main($data){
		$this->load->view('Report/headermain.php', $data); 
	}

    public function Login(){
		$this->layout_header_main(['title'=>'Login', 'style' => 'Login']);
		$this->load->view('Account/login.php'); //Phan body
		$this->footer_header_main();
	}

    public function Register(){
        $this->layout_header_main(['title'=>'Register', 'style' => 'Register']);
		$this->load->view('Account/register.php'); //Phan body
		$this->footer_header_main();
    }

	public function Forgot_Pass(){
		$this->layout_header_main(['title'=>'Forgot Password', 'style' => 'Forgot_Pass']);
		$this->load->view('Account/forgot_Pass.php'); //Phan body
		$this->footer_header_main();
	}

	public function addUser(){
		$this->load->model('Account_model'); //load model
		$name = $this->input->post('name');
		$email = $this->input->post('email');
		$email_exist = $this->Account_model->getUser($email)->result();
		$email_status_0 =  $this->Account_model->getUserStatus0($email)->result();

		if ($email_status_0 != []){
			print_r("update");
			$phone = $this->input->post('phone');
			$address = $this->input->post('address');
			$pass = $this->input->post('pass');

			$hashed = password_hash($pass, PASSWORD_BCRYPT);
			$this->Account_model->updateUser($name, $email, $phone, $address, $hashed);

			$random = $this->Account_model->getRandom($email);
			$randomtt = $random->random;
			$this->Account_model->sendEmail($email,$randomtt);
			
		}
		else if ($email_exist == []){
			print_r("insert");
			$phone = $this->input->post('phone');
			$address = $this->input->post('address');
			$pass = $this->input->post('pass');

			$hashed = password_hash($pass, PASSWORD_BCRYPT);

			$this->Account_model->addUser($name, $email, $phone, $address, $hashed);

			$random = $this->Account_model->getRandom($email);
			$randomtt = $random->random;
			$this->Account_model->sendEmail($email,$randomtt);
		}
		else {
			// print_r("exist");
			print_r(2);
		}
	}

	function verify($hash=NULL)
    {
		$this->load->model('Account_model'); //load model
        if ($this->Account_model->verifyEmailID($hash))
        {
            $this->session->set_flashdata('verify_msg','<div class="alert alert-success text-center">Your Email Address is successfully verified! Please login to access your account!</div>');
            redirect('/Account/success');
        }
        else
        {
            $this->session->set_flashdata('verify_msg','<div class="alert alert-danger text-center">Sorry! There is error verifying your Email Address!</div>');
            redirect('/Account/success');
        }
    }

	public function forgotPass(){
		$this->load->model('Account_model'); //load model
		$email = $this->input->post('email');
		$email_exist = $this->Account_model->getUser($email)->result();
		$email_status_0 =  $this->Account_model->getUserStatus0($email)->result();

		if ($email_status_0 != []){ //chua duoc kich hoat va co email trung
			print_r("update");
		}
		else if ($email_exist == []){ //Email chưa có tài khoản
			print_r("insert");
		}
		else {
			// Đã có tài khoản và đã kích hoạt 
			print_r(2); 
			$pass = $this->new_pass();

			$hashed = password_hash($pass, PASSWORD_BCRYPT);
			$this->Account_model->changePass($email, $hashed);

			$this->Account_model->sendEmailForgotPass($email, $pass);
		}
	}

	public function new_pass() {
        $chars = array(
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        );
    
        shuffle($chars);
    
        $num_chars = count($chars) - 57;
        $token = '';
    
        for ($i = 0; $i < $num_chars; $i++){ // <-- $num_chars instead of $len
            $token .= $chars[mt_rand(0, $num_chars)];
        }
        return $token;
    }


	public function success(){
		$this->layout_header_main(['title'=>'Register Success', 'style' => 'Register']);
		$this->load->view('Account/register-success.php');
		$this->footer_header_main();
	}

	private function footer_header_main(){
		$this->load->view('Report/footermain.php'); 
	}

	public function Edit(){
        $this->layout_header_main(['title'=>'My Account', 'style' => 'AccountEdit']);
		$this->load->view('Account/account_edit.php'); //Phan body
		$this->footer_header_main();
    }

	public function Change_Pass(){
        $this->layout_header_main(['title'=>'My Account', 'style' => 'AccountEdit']);
		$this->load->view('Account/change_Pass.php'); //Phan body
		$this->footer_header_main();
    }

	public function Order(){
        $this->layout_header_main(['title'=>'My Order', 'style' => 'AccountEdit']);
		$this->load->view('Account/myorder_manage.php'); //Phan body
		$this->footer_header_main();
    }

	public function CheckTokenUser(){
		$jwt = $this->input->post('token');
		try {
            //decode token with HS256 method
            $decode = JWT::decode($jwt, $this->secret, array('HS256'));
			$user_id = intval($decode->id);
			$this->load->model('Account_model'); //load model
			$result = $this->Account_model->getUserForOrderByIdStatus1($user_id)->result_array();
			$resultJson = json_encode($result);
			if (!empty($resultJson)){
				print_r($resultJson);
			}
			else{
				print_r(0);
			}
        } catch (\Exception $e) {
            print_r(0);
        }
	}

	public function CheckTokenUserOrder(){
		$jwt = $this->input->post('token');
		try {
            //decode token with HS256 method
            $decode = JWT::decode($jwt, $this->secret, array('HS256'));
			$user_id = intval($decode->id);
			if (!empty($user_id)){
				print_r($user_id);
			}
			else{
				print_r(0);
			}
        } catch (\Exception $e) {
            print_r(0);
        }
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

	public function updateInfoUser(){
		$jwt = $this->input->post("token");
		$valueCheckToken = $this->check_token($jwt);

		if ($valueCheckToken != "0"){
			$name = $this->input->post('name');
			$email = $this->input->post('email');
			$phone = $this->input->post('phone');
			$avatar = "";
			$dayB = $this->input->post('day');
			$monthB = $this->input->post('month');
			$yearB = $this->input->post('year');
			$birthday = $yearB."/".$monthB."/".$dayB;
			$gender = $this->input->post('gender');

			$decode = JWT::decode($jwt, $this->secret, array('HS256'));
			$user_id = intval($decode->id);
			$this->load->model('Account_model'); //load model
			if (!empty($this->input->post('avatar'))){
				$avatar = $this->input->post('avatar');
				$this->Account_model->updateInfoUser($user_id,$name,$email,$phone,$avatar,$birthday,$gender);
			}
			else{
				$this->Account_model->updateInfoUserNotAvatar($user_id,$name,$email,$phone,$birthday,$gender);
			}
			
			print_r($user_id);
		}
	}

	public function fileUploadScript(){
		if (!empty($_FILES['image']['name'])) {
			$validextensions = array("png","jpg","jpeg");
			$temporary = explode(".", $_FILES['image']['name']);
			$file_extension = end($temporary);

			if(in_array($file_extension, $validextensions) && ($_FILES['image']['size'] < 1000000)){ //File < 1MB
				if ($_FILES['image']['error'] > 0){
					print_r(0);
				}
				else{
					$filename_trim = preg_replace('/\s+/', '', $_FILES['image']['name']);
					$file_upload_name = "";
					if (file_exists("uploads/UserAvatar/".$filename_trim)){
						$path_parts = pathinfo($filename_trim);
						$filename = $path_parts['filename'];
						$file_upload_name = "uploads/UserAvatar/".$filename.rand().".png";
					}
					else{
						$file_upload_name = "uploads/UserAvatar/".$filename_trim;
					}
					$sourcePath = $_FILES['image']['tmp_name'];
					$targetPath = $file_upload_name;
					move_uploaded_file($sourcePath,$targetPath);
					print_r($targetPath);
				}
			}
			else{
				print_r(0);
			}
		}else{
			print_r(0);
		}
	}

	public function changePassWord(){
		$jwt = $this->input->post("token");
		$valueCheckToken = $this->check_token($jwt);

		if ($valueCheckToken != "0"){
			$oldPass_Post = $this->input->post('old_pass');
			$oldPass = strval(trim($oldPass_Post));

			$decode = JWT::decode($jwt, $this->secret, array('HS256'));
			$user_id = intval($decode->id);
			$this->load->model('Account_model'); //load model
			$nowPass_arr = $this->Account_model->getPassUser($user_id)->result_array();
			$nowPass = $nowPass_arr[0]['mat_khau'];

			if (password_verify($oldPass, $nowPass)){
				$newPass = $this->input->post('newPass');
				$hashed = password_hash($newPass, PASSWORD_BCRYPT);
				$this->Account_model->changePassByUserId($user_id, $hashed);
				print_r("Dung");
			}
			else{
				print_r(0);
			}
		}
	}

}
?>

