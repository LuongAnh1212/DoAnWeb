<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AuthController extends CI_Controller{
    public function __construct () { 
        parent :: __construct (); 
		$this->load->model('Auth_model');
    } 

    public function login(){
        $email = $this->input->post('email');
        $pass = $this->input->post('pass');
        
        $result = $this->Auth_model->check_login($email,$pass);
        // echo json_encode($result);

        if ($result != "User not found"){
            $jwt = new JWT();
            $JwtSecretKey = "seminar_lpa";

            $data = array(
                'email'=> $email,
                'id' => $result[0]["khach_hang_id"],
                'userType'=>'user',
            );
    
            $token = $jwt->encode($data,$JwtSecretKey,'HS256');

            $data = [
                'status' => 1,
                'token' => $token,
                'user_info' => $result,
            ];
            echo json_encode($data);
        }
        else if ($result == "User not found"){
            $data = [
                'status' => 0,
            ];
            echo json_encode($data);
        }
    }

    // Hàm giải mã token
    public function decode_token(){
        $token = $this->uri->segment(3);

        $jwt = new JWT();

        $JwtSecretKey = "seminar_lpa";

        $decode_token = $jwt->decode($token,$JwtSecretKey,'HS256');

        //Ket qua dang object
        echo '<pre>';
        print_r($decode_token);

        //Ket qua dang json
        $token1 = $jwt->jsonEncode($decode_token);
        echo $token1;
    }

    public function loginAD(){
        $email = $this->input->post('email');
        $pass = $this->input->post('pass');
        
        $result = $this->Auth_model->check_login_AD($email,$pass);

        if ($result != "User not found"){
            $jwt = new JWT();
            $JwtSecretKey = "seminar_lpa";

            $data = array(
                'email'=> $email,
                'id' => $result[0]["QTV_ID"],
                'userType'=>'admin',
            );
    
            $token = $jwt->encode($data,$JwtSecretKey,'HS256');

            $data = [
                'status' => 1,
                'tokenAD' => $token,
                'admin_info' => $result,
            ];
            echo json_encode($data);
        }
        else if ($result == "User not found"){
            $data = [
                'status' => 0,
            ];
            echo json_encode($data);
        }
    }
}

?>