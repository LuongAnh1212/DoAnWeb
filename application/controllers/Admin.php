<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller{

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 
		$this->load->library('session');

		 ///Allowing CORS
		 header('Access-Control-Allow-Origin: *');
		 header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
		 header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    } 

    public function index(){
      // $this->layout_header_main(['title'=>'Cart', 'style' => 'Cart']);
      $this->load->view('Admin/Account/sign-in.html');
    }

    public function Sign_up(){
      $this->load->view('Admin/Account/sign-up.html');
    }  

    public function Dashboard(){
      //Nhớ có phần kiểm tra lại tài khoản mới cho vào trang này (KT token)
		  $this->load->view('Admin/Dashboard/dashboard.html');
    }

    public function Account(){
		  $this->load->view('Admin/Account/account.html');
    }
    
    public function AccountUser(){
		  $this->load->view('Admin/Account/accountUser.html');
    }

    public function LoaiSanPham(){
		  $this->load->view('Admin/Product/loaisanpham.html');
    }

    public function DMSanPham(){
		  $this->load->view('Admin/Product/dmsanpham.html');
    }

    public function SanPham(){
		  $this->load->view('Admin/Product/sanpham.html');
    }

    public function Notification(){
      $this->load->view('Admin/Notification/notifications.html');
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
            if (file_exists("images/Product/".$filename_trim)){
              $path_parts = pathinfo($filename_trim);
              $filename = $path_parts['filename'];
              $file_upload_name = "images/Product/".$filename.rand().".jpg";
            }
            else{
              $file_upload_name = "images/Product/".$filename_trim;
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
    public function fileUploadDetailsScript(){
      $fileSelected =  $this->input->post('fileSelected');
      $files = array_filter($fileSelected); //Use something similar before processing files.
      print_r($fileSelected);

      // Count the number of uploaded files in array
      // $total_count = count($fileSelected);
      // Loop through every file
      // for( $i=0 ; $i < $total_count ; $i++ ) {
        // print_r($fileSelected[$i]);
        //The temp file path is obtained
        // $tmpFilePath = $_FILES['upload']['tmp_name'][$i];
        // //A file path needs to be present
        // if ($tmpFilePath != ""){
        //     //Setup our new file path
        //     $newFilePath = "images/Product/" . $_FILES['upload']['name'][$i];
        //     //File is uploaded to temp dir
        //     if(move_uploaded_file($tmpFilePath, $newFilePath)) {
        //       //Other code goes here
        //       print_r($newFilePath);
        //     }
        // }
      // }
    }
    public function AddLSP(){
      //Check token
      $name = $this->input->post('name');
			$file = "";
			$status = $this->input->post('status');
      
      $this->load->model('Loaisanpham_model'); //load model
			if (!empty($this->input->post('file'))){
				$file = $this->input->post('file');
				$this->Loaisanpham_model->addLSP_I($name,$file,$status);
			}
			else{
				$this->Loaisanpham_model->addLSP_NI($name,$status);
			}
			
			print_r("user_id");
    }

    public function EditLSP(){
      //Check token
      $idLoaiSp = $this->input->post('idLoaiSP');
      $name = $this->input->post('name');
			$file = "";
			$status = $this->input->post('status');
      
      $this->load->model('Loaisanpham_model'); //load model
			if (!empty($this->input->post('file'))){
				$file = $this->input->post('file');
				$this->Loaisanpham_model->editLSP($idLoaiSp,$name,$file,$status);
			}
			else{
				$this->Loaisanpham_model->editLSPNotImage($idLoaiSp,$name,$status);
			}
			
			print_r("user_id");
    }

    public function deleteLSP(){
      //Check token

      if (!empty($this->input->post('idLoaiSP'))){
        $idLoaiSp = $this->input->post('idLoaiSP');
        $idLoaiSp_int = intval($idLoaiSp);
        $this->load->model('Loaisanpham_model'); //load model

        $this->Loaisanpham_model->deleteLSP($idLoaiSp_int);
        print_r($idLoaiSp_int);
      }
      else{
        print_r("Khong co data truyen vao");
      }
    }


    // Thêm, Xóa, Sửa Danh mục Sản phẩm
    public function AddDMSP(){
      //Check token
      $name = $this->input->post('name');
			$loaiSP_ID = $this->input->post('loai_sp_id');
			$file = "";
			$status = $this->input->post('status');
      
      $this->load->model('Danhmuc_model'); //load model
			if (!empty($this->input->post('file'))){
				$file = $this->input->post('file');
				$this->Danhmuc_model->addDMSP_I($name,$loaiSP_ID,$file,$status);
			}
			else{
				$this->Danhmuc_model->addDMSP_NI($name,$loaiSP_ID,$status);
			}
			
			print_r("user_id");
    }

    public function deleteDMSP(){
      //Check token

      if (!empty($this->input->post('idDMSP'))){
        $idDMSp = $this->input->post('idDMSP');
        $idDMSp_int = intval($idDMSp);
        $this->load->model('Danhmuc_model'); //load model

        $this->Danhmuc_model->deleteDMSP($idDMSp_int);
        print_r($idDMSp_int);
      }
      else{
        print_r("Khong co data truyen vao");
      }
    }

    public function EditDMSP(){
      //Check token
      $name = $this->input->post('name');
      $id_dmsp_ed = $this->input->post('id_dmsp_ed');
			$loaiSP_ID = $this->input->post('loai_sp_id');
			$file = "";
			$status = $this->input->post('status');
      
      $this->load->model('Danhmuc_model'); //load model
			if (!empty($this->input->post('file'))){
				$file = $this->input->post('file');
				$this->Danhmuc_model->editDMSP_I($id_dmsp_ed, $name,$loaiSP_ID,$file,$status);
			}
			else{
				$this->Danhmuc_model->editDMSP_NI($id_dmsp_ed, $name,$loaiSP_ID,$status);
			}
			
			print_r("user_id");
    }

    // Thêm, Xóa, Sửa Sản phẩm
    public function ThemSanPham(){
      $this->load->view('Admin/Product/themsanpham.html');
    }

    public function SuaSanPham($row_id){
      $data = [
        'san_pham_id' => $row_id
      ];
      $this->load->view('Admin/Product/suasanpham.html', $data);
    }

    public function AddSP(){
      //Check token
      $name = $this->input->post('name');
			$file = "";
			$loaiSP_ID = $this->input->post('loai_sp_id');
			$DMSP_ID = $this->input->post('dm_sp_id');
			$gia_sp = $this->input->post('gia_sp');
			$kho_sp = $this->input->post('kho_sp');
			$status = $this->input->post('status');
			$noi_bat = $this->input->post('noi_bat');
			$chi_tiet_sp = $this->input->post('chi_tiet_sp');
			$mo_ta_sp = $this->input->post('mo_ta_sp');
      
      $this->load->model('Sanpham_model'); //load model
			if (!empty($this->input->post('file'))){
				$file = $this->input->post('file');
				$this->Sanpham_model->addSP($name,$file,$loaiSP_ID,$DMSP_ID,$gia_sp,$kho_sp,$status,$noi_bat,$chi_tiet_sp,$mo_ta_sp);

        $IdProductLast_arr = $this->Sanpham_model->getProductIDLast()->result_array();
        $IdProductLast = intval($IdProductLast_arr[0]["sanphamID"]);
        print_r($IdProductLast);
			}
			else{
        print_r("0");
      }
    }

    public function EditSP(){
      //Check token
      $id_sp = $this->input->post('id_sp');
      $name = $this->input->post('name');
			$file = "";
			$loaiSP_ID = $this->input->post('loai_sp_id');
			$DMSP_ID = $this->input->post('dm_sp_id');
			$gia_sp = $this->input->post('gia_sp');
			$kho_sp = $this->input->post('kho_sp');
      $daban_sp = $this->input->post('sp_daban');
			$status = $this->input->post('status');
			$noi_bat = $this->input->post('noi_bat');
			$chi_tiet_sp = $this->input->post('chi_tiet_sp');
			$mo_ta_sp = $this->input->post('mo_ta_sp');
      
      $this->load->model('Sanpham_model'); //load model
			if (!empty($this->input->post('file'))){
				$file = $this->input->post('file');
				$this->Sanpham_model->editSP_I($id_sp,$name,$file,$loaiSP_ID,$DMSP_ID,$gia_sp,$kho_sp,$daban_sp,$status,$noi_bat,$chi_tiet_sp,$mo_ta_sp);
			}
			else{
				$this->Sanpham_model->editSP_NI($id_sp,$name,$loaiSP_ID,$DMSP_ID,$gia_sp,$kho_sp,$daban_sp,$status,$noi_bat,$chi_tiet_sp,$mo_ta_sp);
			}
			
			print_r("user_id");
    }

    public function deleteSP(){
      if (!empty($this->input->post('idSP'))){
        $idSp = $this->input->post('idSP');
        $idSp_int = intval($idSp);
        $this->load->model('Sanpham_model'); //load model

        $this->Sanpham_model->deleteSP($idSp_int);
        print_r($idSp_int);
      }
      else{
        print_r("Khong co data truyen vao");
      }
    }

    // Đăng ký, Đăng nhập Tài khoản Admin
    public function addAdmin(){
      $this->load->model('AccAD_model'); //load model
      $name = $this->input->post('name');
      $email = $this->input->post('email');
      $email_exist = $this->AccAD_model->getAdmin($email)->result();
      $email_status_0 =  $this->AccAD_model->getAdminStatus0($email)->result();
  
      if ($email_status_0 != []){
        print_r("update");
        $pass = $this->input->post('pass');
  
        $hashed = password_hash($pass, PASSWORD_BCRYPT);
        $this->AccAD_model->updateAdmin($name, $email, $hashed);
        
      }
      else if ($email_exist == []){
        print_r("insert");
        $pass = $this->input->post('pass');
  
        $hashed = password_hash($pass, PASSWORD_BCRYPT);
  
        $this->AccAD_model->addAdmin($name, $email, $hashed);

      }
      else {
        print_r(2);
      }
    }

    public function deleteAU(){
      if (!empty($this->input->post('idAU'))){
        $idAU = $this->input->post('idAU');
        $idAU_int = intval($idAU);
        $this->load->model('Account_model'); //load model
        $result_arr = $this->Account_model->getDeleteAU($idAU_int)->result_array();
        $delete_au_af = intval($result_arr[0]["delete_au"]);
        if ($delete_au_af == 0){
          $delete_au = 1;
        }
        else{
          $delete_au = 0;
        }
        $this->Account_model->deleteAU($idAU_int,$delete_au);
        print_r($idAU_int);
      }
      else{
        print_r("Khong co data truyen vao");
      }
    }

    public function AccountProfile($row_id){
      $data = [
        'account_id' => $row_id
      ];
      $this->load->view('Admin/Account/profile.html', $data);
    }
}
?>

