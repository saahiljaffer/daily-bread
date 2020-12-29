<?php
include "dbclass.php";
$mydb = new myDBC();
$name = $mydb->clearText($_POST['signUp_name']);
$email = $mydb->clearText($_POST['signUp_email']);
$tel = $mydb->clearText($_POST['signUp_telephone']);
$dob = $mydb->clearText($_POST['signUp_birthday']);
$dob = strtotime($dob);
$pw = $mydb->clearText($_POST['signUp_password']);
$sql = "INSERT INTO users (name,email,telephone,birthday,password,thedate) VALUES ('$name','$email','$tel','$dob','$pw ',NOW())";
$mydb->runQuery($sql);
$id = $mydb->lastInsertID();
echo 'success';
?>