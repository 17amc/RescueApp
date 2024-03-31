<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');


date_default_timezone_set('America/Bogota');


include 'conexion.php';


$conexion->query("SET time_zone = '-05:00'");

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

  
    $result1 = $conexion->query("UPDATE Administrativos SET Contrasena = '$password' WHERE Correo = '$email'");
    $result2 = $conexion->query("UPDATE SuperAdmin SET Contrasena = '$password' WHERE Correo = '$email'");
    $result3 = $conexion->query("UPDATE Usuarios SET Contrasena = '$password' WHERE Correo = '$email'");

    if ($result1 || $result2 || $result3) {
        echo json_encode(['success' => true, 'message' => 'La contraseña se ha cambiado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hubo un error al cambiar la contraseña.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se proporcionó ninguna dirección de correo electrónico o contraseña.']);
}
?>