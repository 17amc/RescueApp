<?php
ob_start();
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include('conexion.php');

date_default_timezone_set('America/Bogota'); // Establece la zona horaria a la de Colombia
$fecha = date('Y-m-d H:i:s'); // Obtiene la fecha y hora actuales en la zona horaria establecida

$campos_requeridos = ['UsuarioID', 'Nombre', 'Ficha', 'Lugar', 'CategoriaID', 'Descripcion'];

foreach ($campos_requeridos as $campo) {
    if (!isset($_POST[$campo])) {
        $respuesta = array('message' => 'campos requeridos');
        echo json_encode($respuesta);
        exit();
    }
}

$usuarioID = $_POST['UsuarioID'];
$nombre = $_POST['Nombre'];
$ficha = $_POST['Ficha'];
$lugar = $_POST['Lugar'];
$categoriaID = $_POST['CategoriaID'];
$descripcion = $_POST['Descripcion'];

$stmt = $conexion->prepare("INSERT INTO Reportes (UsuarioID, Nombre, Ficha, Lugar, CategoriaID, Descripcion, Fecha, EstadoReporte) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pendiente')");
$stmt->bind_param("isssiss", $usuarioID, $nombre, $ficha, $lugar, $categoriaID, $descripcion, $fecha);

if ($stmt->execute()) {
    $respuesta = array('message' => 'reporte enviado con exito');
} else {
    $respuesta = array('message' => 'hubo un error al enviar el reporte' . $stmt->error);
}
echo json_encode($respuesta);
ob_end_flush();
?>
