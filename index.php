<?php
  global $twig;

  require_once '_config.php';

  session_start();
  
  if(isset($_SESSION['user']))
    $twig->addGlobal('user', $_SESSION['user']);
  
  switch ($_SERVER['REQUEST_URI']) {
    case "/":
      echo $twig->render('index.twig');
      break;
    case "/nations":
      echo $twig->render('nations.twig');
      break;
    default:
      http_response_code(404);
      echo $twig->render('404.twig');
      break;
  }