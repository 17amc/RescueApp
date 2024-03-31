<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

date_default_timezone_set('America/Bogota');

include 'conexion.php';

$conexion->query("SET time_zone = '-05:00'");

if (isset($_POST['email']) && isset($_POST['code'])) {
    $email = $_POST['email'];
    $code = $_POST['code'];
    
    $result = $conexion->query("SELECT Codigo, tiempo FROM Codigos WHERE Correo = '$email'");

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $tiempo = strtotime($row['tiempo']);
        $now = time();

        if ($row['Codigo'] == $code && ($now - $tiempo) <= 15 * 60) {
            echo json_encode(['success' => true, 'message' => 'El código es correcto.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'El código es incorrecto o ha vencido.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró ningún código para este correo electrónico.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se proporcionó ninguna dirección de correo electrónico o código.']);
}
?>
