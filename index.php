<?php
  global $twig;

  require_once '_config.php';

  use Bramus\Router\Router;

  $curl = new anlutro\cURL\cURL;

  $router = new Router();

  session_start();

  $nations = array(
    'rop' => array(
      'name' => 'Republic of Panorama',
      'flag' => 'https://raw.theclashfruit.me/CRSS/CRSS/main/Nations/Republic%20of%20Panorama/Flag.svg',
      'short' => 'rop',
      'description' => 'Short description of R.O.P.',
    ),
    'drr' => array(
      'name' => 'Democratic Republic of Rayland',
      'flag' => 'https://raw.theclashfruit.me/CRSS/CRSS/main/Nations/Democratic%20Republic%20of%20Rayland/bannre.png',
      'short' => 'drr',
      'description' => 'Short description of D.R.R.',
    )
  );
  
  if(isset($_SESSION['user']))
    $twig->addGlobal('user', $_SESSION['user']);

  $res = $curl->get('https://crss.blurryface.xyz/api/v1/players');

  $json = json_decode($res->body, true);

  if($json != null) {
    $twig->addGlobal('playerCount', count($json));
  }

  $twig->addGlobal('nations', $nations);

  $twig->addGlobal('reduced', isset($_GET['reduced']));

  $router->get('/', function() {
    global $twig;

    $twig->addGlobal('pageUri', '/');
    
    echo $twig->render('index.twig');
  });

  $router->get('/nations', function() {
    global $twig;

    $twig->addGlobal('pageUri', '/nations');
    
    echo $twig->render('nations.twig');
  });

  $router->get('/gallery', function() {
    global $twig;

    $twig->addGlobal('pageUri', '/gallery');
  
    echo $twig->render('gallery.twig');
  });

  $router->get('/map', function() {
    global $twig;

    $twig->addGlobal('pageUri', '/map');

    if(isset($_GET['center']))
      $twig->addGlobal('center', $_GET['center']);
    else
      $twig->addGlobal('center', '0;0');
  
    echo $twig->render('map.twig');
  });

  $router->get('/profile', function() {
    global $twig, $mysql;

    $twig->addGlobal('pageUri', '/profile');
    
    $user = $mysql->getUserRecordFromId($_SESSION['user']['id']);

    if($user == null) {
      http_response_code(404);

      echo $twig->render('404.twig');
    } else {
      echo $twig->render('profile.twig', array('db_data' => $user));
    }
  });

  $router->get('/nation/([a-z]+)', function ($nation) {
    global $twig, $mysql, $nations;

    $twig->addGlobal('pageUri', '/nation/' . $nation);

    if(!$nations[$nation]) {
      http_response_code(404);

      echo $twig->render('404.twig');
    } else {
      echo $twig->render('nation.twig', array('nation' => $nations[$nation]));
    }
  });

  $router->get('/u/([a-z0-9_\.]+)', function($name) {
    global $twig, $mysql, $discord;

    $twig->addGlobal('pageUri', '/u/' . $name);
    
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

    $twig->addGlobal('pageUri', '404');
    
    http_response_code(404);
    
    echo $twig->render('404.twig');
  });

  $router->run();
