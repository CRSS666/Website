<?php
  global $twig;

  require_once '_config.php';

  session_start();
  
  switch ($_SERVER['REQUEST_URI']) {
    case "/":
      echo $twig->render('index.twig', [
        'user' => null
      ]);
      break;
    case "/nations":
      echo $twig->render('nations.twig', [
        'user' => null
      ]);
      break;
    default:
      http_response_code(404);
      echo $twig->render('404.twig', [
        'user' => null
      ]);
      break;
  }