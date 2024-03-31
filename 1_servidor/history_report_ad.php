<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'conexion.php';

$especializacion = isset($_POST['Especializacion']) ? $_POST['Especializacion'] : '';

if ($especializacion) {
    try {
        $query = "SELECT Reportes.* FROM Reportes 
                  JOIN EspecializacionCategorias ON Reportes.CategoriaID = EspecializacionCategorias.CategoriaID 
                  WHERE EspecializacionCategorias.Especializacion = '$especializacion'";

        $result = $conexion->query($query);

        if ($result->num_rows > 0) {
            $reportes = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(['success' => true, 'reportes' => $reportes]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se encontraron reportes para esta especialización']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Especialización no definida']);
}
?>
