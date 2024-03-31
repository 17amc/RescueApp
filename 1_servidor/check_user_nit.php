<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include('conexion.php');

$required_fields = ['NumeroDocumento'];

foreach ($required_fields as $field) {
    if (!isset($_POST[$field])) {
        $response = array('message' => 'missing data');
        echo json_encode($response);
        exit();
    }
}

$documento = $_POST['NumeroDocumento'];

$resultadoUsuario = $conexion->query("SELECT * FROM Usuarios WHERE NumeroDocumento = '$documento'") or die ('Error al consultar');
$resultadoAdmin = $conexion->query("SELECT * FROM Administrativos WHERE NumeroDocumento = '$documento'") or die ('Error al consultar');
$resultadoSuperAdmin = $conexion->query("SELECT * FROM SuperAdmin WHERE NumeroDocumento = '$documento'") or die ('Error al consultar');

if ($resultadoUsuario->num_rows > 0 || $resultadoAdmin->num_rows > 0 || $resultadoSuperAdmin->num_rows > 0) {
    $response = array('message' => 'Ya existe un usuario con ese número de documento');
    echo json_encode($response);
    exit();
}

$response = array('message' => 'El usuario no existe');
echo json_encode($response);
?>