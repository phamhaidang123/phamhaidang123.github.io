<?php 
if(isset($_POST['name']) && isset($_POST['email'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];

        include('./phpmailer/class.smtp.php');
        include "./phpmailer/class.phpmailer.php"; 
        
        $nFrom = 'Ominifood';    
        $mFrom = 'midnightdevteam@gmail.com'; 
        $mPass = 'friendmakemoney';       
        $nTo = 'Nguyen Cuong'; 
        $mTo = 'nguyencuong21520@gmail.com';   
        $mail             = new PHPMailer();
        $body             = '<strong>Họ và tên:  </strong>'.$name.'<br>'.'<strong>Email:  </strong>'.$email.'<br>'.'<strong>Số điện thoại: </strong>'.$phone.'<br>'.'<strong>Lời nhắn: </strong>'.$message;
        $title = 'Feedback website | '.$name;  
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
                           
