<?php
$host = "localhost"; 
$user = "id21637847_admindatabase2wstr4ee"; 
$password = "basededatosapp2313$%XCSD3243WESRFSXFFCGGS32312QWE"; 
$name_db = "id21637847_db_rescueapp";

$conexion = new mysqli($host, $user, $password, $name_db);

if ($conexion->connect_error) {
    die("Fatal error in the connection: " . $conexion->connect_error);
}
?> 


