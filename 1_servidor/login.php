<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'conexion.php';

$numerodocumento = isset($_POST['NumeroDocumento']) ? $_POST['NumeroDocumento'] : '';
$contrasena = isset($_POST['Contrasena']) ? $_POST['Contrasena'] : '';

if ($numerodocumento && $contrasena) {
    try {
        $queryUsuario = "SELECT * FROM Usuarios WHERE NumeroDocumento = '$numerodocumento' AND Contrasena = '$contrasena'";
        $queryAdmin = "SELECT * FROM Administrativos WHERE NumeroDocumento = '$numerodocumento' AND Contrasena = '$contrasena'";
        $querySuperAdmin = "SELECT * FROM SuperAdmin WHERE NumeroDocumento = '$numerodocumento' AND Contrasena = '$contrasena'";

        $resultUsuario = $conexion->query($queryUsuario);
        $resultAdmin = $conexion->query($queryAdmin);
        $resultSuperAdmin = $conexion->query($querySuperAdmin);

        if ($resultUsuario->num_rows > 0) {
            $user = $resultUsuario->fetch_assoc();
            echo json_encode(['success' => true, 'role' => 'usuario', 'user' => $user]);
        } elseif ($resultAdmin->num_rows > 0) {
            $user = $resultAdmin->fetch_assoc();
            echo json_encode(['success' => true, 'role' => 'administrativo', 'user' => $user]);
        } elseif ($resultSuperAdmin->num_rows > 0) {
            $user = $resultSuperAdmin->fetch_assoc();
            echo json_encode(['success' => true, 'role' => 'superadmin', 'user' => $user]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Credenciales incorrectas']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Correo o contraseña no definidos']);
}
?>