<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include('conexion.php');

$required_fields = ['Correo'];

foreach ($required_fields as $field) {
    if (!isset($_POST[$field])) {
        $response = array('message' => 'missing data');
        echo json_encode($response);
        exit();
    }
}

$email = $_POST['Correo'];

$resultadoEmail = $conexion->query("SELECT * FROM Usuarios WHERE Correo = '$email'") or die ('Error al consultar');

if ($resultadoEmail->num_rows > 0) {
    $response = array('message' => 'Ya existe un usuario con ese correo');
    echo json_encode($response);
    exit();
}
$response = array('message' => 'El usuario no existe');
echo json_encode($response); 

?>