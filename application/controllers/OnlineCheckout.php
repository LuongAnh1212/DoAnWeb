<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OnlineCheckout extends  CI_Controller{
	private $secret = "seminar_lpa";

	public function __construct () { 
        parent :: __construct (); 
        $this-> load-> helper ('url'); 
        $this -> load -> helper ( 'form' );

		// $this->load->model('Cart_model'); //load model
		///Allowing CORS
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    } 

    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }

    public function online_checkout(){
        //Thanh toan Online
        if (!empty($_POST['payUrl'])) {
            echo 'momo';
        }
        if (!empty($_POST['payUrl'])) {
            if (!empty($_POST['exampleInputUID'])){
                $this->load->model('Cart_model'); //load model
    
                $cart_id = $_POST['exampleInputUID'];
                $user_id_arr = $this->Cart_model->getUserIDByCartId(intval($cart_id))->result_array();
                $user_id = intval($user_id_arr[0]['khach_hang_id']);
                
                $result_arr = $this->Cart_model->getTotalCartDB($user_id)->result_array();
                $result_total = $result_arr[0]['tong_gio_hang'];
                if ($result_total == "0"){
                    $result_total = "noproduct";
                }
            }

            $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            $partnerCode = 'MOMOBKUN20180529';
            $accessKey = 'klm05TvNBzhg7h7j';
            $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';

            $orderInfo = "Thanh toán qua MoMo";
            $amount = $result_total;
            $orderId = time() .$this->run_key(); 
            $redirectUrl = "http://127.0.0.1/Daily/Order/success";
            $ipnUrl = "http://127.0.0.1/Daily/Order/success";
            $extraData = $user_id; //Ma buu dien, Ma buu chinh, Dia chi

            $partnerCode = $partnerCode;
            $accessKey = $accessKey;
            $serectkey = $secretKey;

            $orderId = $orderId; // Mã đơn hàng
            $orderInfo = $orderInfo ;
            $amount = $amount;
            $ipnUrl = $ipnUrl;
            $redirectUrl = $redirectUrl;
            $extraData = $extraData;

            $requestId = time() . "";
            $requestType = "payWithATM"; //Thanh toan ATM
            // $requestType = "captureWallet"; //Thanh toan QRcode
            // $extraData = ($_POST["extraData"] ? $_POST["extraData"] : "");
            //before sign HMAC SHA256 signature
            $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
            $signature = hash_hmac("sha256", $rawHash, $serectkey);
            $data = array('partnerCode' => $partnerCode,
                'partnerName' => "Test",
                "storeId" => "MomoTestStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => 'vi',
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature);
            $result = $this->execPostRequest($endpoint, json_encode($data));
            $jsonResult = json_decode($result, true);  // decode json

            //Just a example, please check more in there

            header('Location: ' . $jsonResult['payUrl']);
        }
        else if (!empty($_POST['vnpay'])) {
            echo 'VNP';
        }   
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
    
        $num_chars = count($chars) - 55;
        $token = '';
    
        for ($i = 0; $i < $num_chars; $i++){ // <-- $num_chars instead of $len
            $token .= $chars[mt_rand(0, $num_chars)];
        }
        return $token;
    }
}

?>
