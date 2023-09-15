<?php
  require_once '_config.php';

  echo $twig->render('index.twig', [
    'user' => null
  ]);