<?php

  $name = $POST['name'];
  $visitor_email = $_POST['email'];
  $message = $POST['message'];

  $email_from = "a.a7med22000011@gmail.com";
  $email_subject = "New Form Submission"
  $email_body = "User Name: $name.\n".
                  "User Email: $visitr_email.\n".
                    "User Message: $message.\n";
  $to = "a.a7med22000022@gmail.com";
  $headers = "Form: $email_from \r\n";
  mail($to, $email_subject, $email_body, $headers);
  header("Location: ../../../index.html");
  >
