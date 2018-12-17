<?php
error_reporting(E_ALL);

$mainData = json_decode($_POST['body']);
//$data = [ 'speech' => 'hello', 'displayText' => "hello",source: "webhook-echo-sample" ];


if($mainData->result->parameters->echoText != ""){
        $dt = "bye";
    }else{
        $dt = $mainData;
        }
$myObj->speech = "hello";
$myObj->displayText = $dt;
$myObj->source = "webhook-echo-sample";
echo json_encode( $myObj );
?>
