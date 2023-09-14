<?php
  require_once '_config.php';

  echo $twig->render('index.html', [
    'user' => null
  ]);