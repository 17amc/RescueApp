<?php
ob_start();
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include('conexion.php');

$campos_requeridos = ['Nombres', 'Apellidos', 'TipoDocumento', 'NumeroDocumento', 'Telefono', 'Ficha', 'TipoUsuario', 'CentroFormacion', 'Correo', 'Contrasena', 'ImagenPerfil'];

foreach ($campos_requeridos as $campo) {
    if (!isset($_POST[$campo])) {
        $respuesta = array('message' => 'campos requeridos');
        echo json_encode($respuesta);
        exit();
    }
}

$nombres = $_POST['Nombres'];
$apellidos = $_POST['Apellidos'];
$tipodocumento = $_POST['TipoDocumento'];
$numerodocumento = $_POST['NumeroDocumento'];
$telefono = $_POST['Telefono'];
$ficha = $_POST['Ficha'];
$tipousuario = $_POST['TipoUsuario'];
$centroformacion = $_POST['CentroFormacion'];
$correo = $_POST['Correo'];
$contrasena = $_POST['Contrasena'];
$imagenperfil = $_POST['ImagenPerfil'];

$stmt = $conexion->prepare("INSERT INTO Usuarios (Nombres, Apellidos, TipoDocumento, NumeroDocumento, Telefono, Ficha, TipoUsuario, CentroFormacion, Correo, Contrasena, ImagenPerfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssssss", $nombres, $apellidos, $tipodocumento, $numerodocumento, $telefono, $ficha, $tipousuario, $centroformacion, $correo, $contrasena, $imagenperfil);

if ($stmt->execute()) {
    $respuesta = array('message' => 'usuario registrado con exito');
} else {
    $respuesta = array('message' => 'hubo un error al ser registrado' . $stmt->error);
}
echo json_encode($respuesta);
ob_end_flush();
?>