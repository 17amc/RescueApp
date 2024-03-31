<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

date_default_timezone_set('America/Bogota');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

include 'conexion.php';

$conexion->query("SET time_zone = '-05:00'");

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $code = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

    $conexion->query("DELETE FROM Codigos WHERE Correo = '$email'");

    $tiempo = date('Y-m-d H:i:s');
    $conexion->query("INSERT INTO Codigos (Correo, Codigo, tiempo) VALUES ('$email', '$code', '$tiempo')");

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rescueapp72@gmail.com';
        $mail->Password = 'ryqkjcjfruilhukh';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('rescueapp72@gmail.com', 'RescueApp');
        $mail->addAddress($email);

      
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = '¡Te has registrado con exito!';
        $mail->Body = 'Hola, <br/>
        ¡Gracias por registrarte en RescueApp! Tu cuenta ha sido verificada con éxito.
        ¡Ahora puedes empezar a utilizar RescueApp!
        Síguenos en redes sociales:
        
        * Instagram: @rescueapp
        * Facebook: /rescueapp';
        

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'El correo electrónico se ha enviado correctamente.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'El correo electrónico no pudo ser enviado. Error de PHPMailer: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se proporcionó ninguna dirección de correo electrónico.']);
}
?>