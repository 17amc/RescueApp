<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include('conexion.php');

$required_fields = ['Telefono'];

foreach ($required_fields as $field) {
    if (!isset($_POST[$field])) {
        $response = array('message' => 'missing data');
        echo json_encode($response);
        exit();
    }
}

$telefono = $_POST['Telefono'];

$resultado = $conexion->query("SELECT * FROM Usuarios WHERE Telefono = '$telefono'") or die ('Error al consultar');

if ($resultado->num_rows > 0) {
    $response = array('message' => 'Ya existe un usuario con ese número de teléfono');
    echo json_encode($response);
    exit();
}

$response = array('message' => 'No existe un usario con ese numero de telefono');
echo json_encode($response); 

?>