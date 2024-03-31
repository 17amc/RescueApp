<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    include('conexion.php');

    $required_fields = ['Correo'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field])) {
            throw new Exception('missing data');
        }
    }

    $email = $_POST['Correo'];
    $resultadoEmail = $conexion->query("SELECT Correo FROM Administrativos WHERE Correo = '$email' UNION SELECT Correo FROM Usuarios WHERE Correo = '$email' UNION SELECT Correo FROM SuperAdmin WHERE Correo = '$email'") or die ('Error al consultar');

    if ($resultadoEmail->num_rows > 0) {
        $response = array('message' => 'El usuario existe');
    } else {
        $response = array('message' => 'No existe un usuario con ese correo electrónico');
    }
    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(['message' => $e->getMessage()]);
}
?>