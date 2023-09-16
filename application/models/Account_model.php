<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Account_model extends CI_Model{

	public function __construct () { 
        parent :: __construct (); 
        $this -> load -> library ( 'email' );
    } 

    public function getUser($email){
        // Tra ve nhung cot co la user, da duoc kich hoat va co email trung
        $this->db->where('email', $email);
        return $this->db->get('khach_hang');
    }

    public function getUserStatus0($email){
        // Tra ve nhung cot co la user, chua duoc kich hoat va co email trung
        $this->db->where('email', $email);
        $this->db->where('trang_thai', 0);
        return $this->db->get('khach_hang');
    }

    public function updateUser($name, $email, $phone, $address, $hashed){
        $this->db->where('email', $email);
        $object = array('ho_ten'=>$name, 'so_dien_thoai'=>$phone, 'dia_chi'=>$address, 'mat_khau'=>$hashed, 'random'=>$this->run_key());
		$this-> db-> update('khach_hang', $object);
    }

	public function addUser($name, $email, $phone, $address, $hashed){
        $object = array('ho_ten'=>$name, 'email'=>$email, 'so_dien_thoai'=>$phone, 'dia_chi'=>$address, 'mat_khau'=>$hashed, 'random'=>$this->run_key());
		$this-> db-> insert ('khach_hang', $object);
    }

    public function changePass($email, $hashed){
        $this->db->where('email', $email);
        $object = array('mat_khau'=>$hashed);
		$this-> db-> update('khach_hang', $object);
    }

    public function changePassByUserId($user_id, $hashed){
        $this->db->where('khach_hang_id', $user_id);
        $object = array('mat_khau'=>$hashed);
		$this-> db-> update('khach_hang', $object);
    }

    public function getPassUser($user_id){
        $this->db->select('khach_hang.mat_khau');
        $this->db->where('khach_hang_id', $user_id);
        $this->db->where('trang_thai', 1);
        return $this->db->get('khach_hang');
    }

    public function run_key() {
        $chars = array(
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        );
    
        shuffle($chars);
    
        $num_chars = count($chars) - 1;
        $token = '';
    
        for ($i = 0; $i < $num_chars; $i++){ // <-- $num_chars instead of $len
            $token .= $chars[mt_rand(0, $num_chars)];
        }
        return $token;
    }

    // gửi email xác minh đến hàm id email của người dùng 
    function sendEmail($to_email, $randomtt) 
    { 
        $from_email = 'phuonganh.intern.mid@gmail.com'; // thay đổi cái này thành của bạn 
        $subject = 'Verify Your Email Address';
        $message = 'Kính gửi Người dùng, <br /> <br /> Vui lòng nhấp vào liên kết kích hoạt bên dưới để xác minh địa chỉ email của bạn. <br /> <br /> http://127.0.0.1/Daily/account/verify/'. $randomtt. '<br /> <br /> <br /> Cảm ơn <br /> LPA'; 
        
        // cấu hình cài đặt email 
        $config = array ( ) ;
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'ssl://smtp.gmail.com';
        $config['smtp_port'] = '465';
        $config ['smtp_user'] = 'phuonganh.intern.mid@gmail.com'; 
        $config ['smtp_pass'] = 'gqmdxlmzezkgvgym'; // Mật khẩu $ from_email 
        $config ['mailtype'] = 'html'; 
        $config ['charset'] ='utf-8'; 
        $config ['wordwrap'] = TRUE;
        $this-> email-> initialize ($config); 
        $this->email->set_newline("\r\n");
        

        $this->load->library('email'); // load email library
        $this->email->from($from_email, 'sender name');
        $this->email->to($to_email);
        $this->email->subject($subject);
        $this->email->message($message);

        if ($this->email->send()) {
            echo "Mail Sent!";
           }
        else {
            echo "There is error in sending mail!";
            echo $this->email->send();
            echo $this->email->print_debugger();}
    } 
    function sendEmailForgotPass($to_email,$newPass){
        
        $from_email = 'phuonganh.intern.mid@gmail.com'; // thay đổi cái này thành của bạn 
        $subject = 'Forgot PassWord';
        $message = 'Kính gửi Người dùng, <br /> <br /> Đây là mật khẩu mới của bạn: '.$newPass.'<br /> <br />  Vui lòng dùng mật khẩu này để đăng nhập tài khoản của bạn'; 
        
        // cấu hình cài đặt email 
        $config = array ( ) ;
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'ssl://smtp.gmail.com';
        $config['smtp_port'] = '465';
        $config ['smtp_user'] = 'phuonganh.intern.mid@gmail.com'; 
        $config ['smtp_pass'] = 'gqmdxlmzezkgvgym'; // Mật khẩu $ from_email 
        $config ['mailtype'] = 'html'; 
        $config ['charset'] ='utf-8'; 
        $config ['wordwrap'] = TRUE;
        $this-> email-> initialize ($config); 
        $this->email->set_newline("\r\n");
        

        $this->load->library('email'); // load email library
        $this->email->from($from_email, 'sender name');
        $this->email->to($to_email);
        $this->email->subject($subject);
        $this->email->message($message);

        if ($this->email->send()) {
            // print_r("Mail Sent!");
            // print_r(2);
           }
        else {
            echo "There is error in sending mail!";
            echo $this->email->send();
            echo $this->email->print_debugger();}
    }

     // kích hoạt tài khoản người dùng
     function verifyEmailID ($key)
     {
         $data = array ('trang_thai' => 1);
         $this-> db-> where ('random', $key);
         return $this-> db-> update ('khach_hang', $data);
     }

     function getRandom($email){
        $this->db->select('random');
        $this->db->where('email', $email);
        return $this->db->get('khach_hang')->row();
     }

    public function getUserById($id){
        $this->db->select('*');
        $this->db->from('khach_hang');
		$this->db->where('khach_hang_id', $id);
		return $this->db->get();
    }

    public function getUserForOrderById($id){
        $this->db->select('khach_hang_id,ho_ten,email,so_dien_thoai,dia_chi');
        $this->db->from('khach_hang');
		$this->db->where('khach_hang_id', $id);
		return $this->db->get();
    }

    public function getUserForOrderByIdStatus1($user_id){
        $this->db->select('khach_hang_id,ho_ten,email,so_dien_thoai,dia_chi,mat_khau,anh_bia,ngay_sinh,gioi_tinh');
        $this->db->from('khach_hang');
		$this->db->where('trang_thai', 1);
		$this->db->where('khach_hang_id', $user_id);
		return $this->db->get();
    }

    public function checkMailExist($email){
        $this->db->select('email');
        $this->db->from('khach_hang');
        $this->db->where('trang_thai', 1);
		$this->db->where('email', $email);
		return $this->db->get();
    }

    public function updateNewPass($email,$hashed){
        $this->db->where('email', $email);
        $object = array('mat_khau'=>$hashed);
		$this-> db-> update('khach_hang', $object);
    }

    public function updatePass($user_id, $pass_new){
        $this->db->where('khach_hang_id', $user_id);
        $object = array('mat_khau'=>$pass_new);
		$this-> db-> update('khach_hang', $object);
    }

    public function updateInfoUser($user_id,$name,$email,$phone, $avatar,$birthday,$gender){
        $this->db->where('khach_hang_id', $user_id);
        $this->db->where('trang_thai', 1);
        $object = array('ho_ten'=>$name, 'email'=>$email, 'so_dien_thoai'=>$phone , 'anh_bia' => $avatar, 'ngay_sinh'=>$birthday, 'gioi_tinh'=>$gender);
		$this-> db-> update('khach_hang', $object);
    }

    public function updateInfoUserNotAvatar($user_id,$name,$email,$phone,$birthday,$gender){
        $this->db->where('khach_hang_id', $user_id);
        $this->db->where('trang_thai', 1);
        $object = array('ho_ten'=>$name, 'email'=>$email, 'so_dien_thoai'=>$phone, 'ngay_sinh'=>$birthday, 'gioi_tinh'=>$gender);
		$this-> db-> update('khach_hang', $object);
    }

    public function getDeleteAU($idAU_int){
        $this->db->select('delete_au');
        $this->db->from('khach_hang');
        $this->db->where('khach_hang_id', $idAU_int);
		return $this->db->get();
    }

    public function deleteAU($idAU_int,$delete_au){
        $this->db->where('khach_hang_id', $idAU_int);
        $object = array('delete_au'=>$delete_au);
		$this-> db-> update('khach_hang', $object);
    }
}
?>

