<?php

$recepient = "ischuk.oleg6@gmail.com";
$sitename = "Site Name";

$name = trim($_POST["name"]);
$last = trim($_POST["last_name"]);
$email = trim($_POST["email"]);
$message = "Name: $name \nLastName: $last \nEmail: $email";

$pagetitle = "New message from \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
