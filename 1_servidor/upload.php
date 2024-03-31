<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$directorio_destino = "uploads/"; 
$archivo_destino = $directorio_destino . basename($_FILES["ImagenPerfil"]["name"]);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (move_uploaded_file($_FILES["ImagenPerfil"]["tmp_name"], $archivo_destino)) {
        echo json_encode([
            "status" => "success",
            "message" => "imagen subida con exito",
            "path" => $archivo_destino
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Lo siento, hubo un error al subir tu archivo."
        ]);
    }
}
?>