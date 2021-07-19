<?php 
if(isset($_POST['name'])){
        $name = $_POST['name'];
        $message = $_POST['message'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        
        include('./phpmailer/class.smtp.php');
        include "./phpmailer/class.phpmailer.php"; 
        


        $nFrom = "Puppy Kingdom";    
        $mFrom = 'nguyenvancuong215@gmail.com'; 
        $mPass = 'Menu00d1';       
        $nTo = 'Đăng Phạm'; 
        $mTo = 'dang.s125132@ilamail.edu.vn';   
        $mail             = new PHPMailer();
        $body             = '<strong>Name:  </strong>'.$name.'<br>'.'<strong>Email:  </strong>'.$email.'<br>'.'<strong>Phone:  </strong>'.$phone.'<br>'.'<strong>Message: </strong>'.$message;   // Noi dung email
        $title = 'Puppy Kingdom  '.$name;  
        $mail->IsSMTP();             
        $mail->CharSet  = "utf-8";
        $mail->SMTPDebug  = 0;  
        $mail->SMTPAuth   = true; 
        $mail->SMTPSecure = "ssl"; 
        $mail->Host       = "smtp.gmail.com";
        $mail->Port       = 465; 

        $mail->Username   = $mFrom;  
        $mail->Password   = $mPass;    
        $mail->SetFrom($mFrom, $nFrom);
        $mail->AddReplyTo($email, $name); 
        $mail->Subject    = $title;
        $mail->MsgHTML($body);
        $mail->AddAddress($mTo, $nTo);

if ($mail->send()) {
    $status = "success";
    $response = "Đã gửi email";
} else {
    $status = "error";
    $response = "Có lỗi: <br><br>" . $mail->ErrorInfo;
}

exit(json_encode(array("status" => $status, "response" => $response)));

}
?>

