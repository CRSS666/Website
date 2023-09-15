<?php
  global $twig;

  require_once '_config.php';

  use Bramus\Router\Router;
  
  $router = new Router();

  session_start();

  $nations = array(
    'rop' => array(
      'name' => 'Republic of Panorama',
      'flag' => 'https://git.theclashfruit.me/CRSS/CRSS/raw/branch/main/Nations/Republic%20of%20Panorama/Flag.svg',
      'short' => 'rop',
    )
  );
  
  if(isset($_SESSION['user']))
    $twig->addGlobal('user', $_SESSION['user']);

  $router->get('/', function() {
    global $twig;
    
    echo $twig->render('index.twig');
  });

  $router->get('/nations', function() {
    global $twig;
    
    echo $twig->render('nations.twig');
  });

  $router->get('/rules', function() {
    global $twig;
  
    echo $twig->render('rules.twig');
  });

  $router->get('/map', function() {
    global $twig;
  
    echo $twig->render('map.twig');
  });

  $router->get('/profile', function() {
    global $twig, $mysql;
    
    $user = $mysql->getUserRecordFromId($_SESSION['user']['id']);

    if($user == null) {
      http_response_code(404);

      echo $twig->render('404.twig');
    } else {
      echo $twig->render('profile.twig', array('db_data' => $user));
    }
  });

  $router->get('/u/([a-z0-9_\.]+)', function($name) {
    global $twig, $mysql, $discord;
    
    $user = $mysql->getUserRecordFromUsername($name);
    
    if($user == null) {
      http_response_code(404);
      
      echo $twig->render('404.twig');
    } else {
      echo $twig->render('user.twig', array('db_user' => $user));
    }
  });

  $router->set404(function() {
    global $twig;
    
    http_response_code(404);
    
    echo $twig->render('404.twig');
  });

  $router->run();