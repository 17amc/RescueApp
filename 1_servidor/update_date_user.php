<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

date_default_timezone_set('America/Bogota');

include 'conexion.php';

$conexion->query("SET time_zone = '-05:00'");

if (isset($_POST['Nombres']) && isset($_POST['Apellidos']) && isset($_POST['Correo']) && isset($_POST['Telefono']) && isset($_POST['CentroFormacion']) && isset($_POST['Ficha']) && isset($_POST['Contrasena']) && isset($_POST['NumeroDocumento']) ) {
   
    $nombres = $_POST['Nombres'];
    $apellidos = $_POST['Apellidos'];
    $correo = $_POST['Correo'];
    $telefono = $_POST['Telefono'];
    $centro_formacion = $_POST['CentroFormacion'];
    $ficha = $_POST['Ficha'];
    $contrasena = $_POST['Contrasena'];
    $numero_documento = $_POST['NumeroDocumento'];
  

    $result = $conexion->query("UPDATE Usuarios SET 
        Nombres = '$nombres', 
        Apellidos = '$apellidos', 
        Correo = '$correo', 
        Telefono = '$telefono', 
        CentroFormacion = '$centro_formacion',
        Ficha = '$ficha',
        Contrasena = '$contrasena'
        WHERE NumeroDocumento = '$numero_documento'");

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Los datos del usuario se han actualizado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Hubo un error al actualizar los datos del usuario.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se proporcionaron todos los datos necesarios.']);
}
?>

