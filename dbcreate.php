<?php
$servername = "localhost";
$username = "miniflow";
$password = "paVXxn2mFE0FdMLu";

echo $_POST['slack'];

if($_POST['slack'] == null || $_POST['slack'] == ""){
    $dbname = "newdb1";
}else{
    $dbname = $_POST['slack'];
}

// Create connection
$conn = mysqli_connect($servername, $username, $password);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database
$sql = "CREATE DATABASE ". $dbname;
if (mysqli_query($conn, $sql)) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
