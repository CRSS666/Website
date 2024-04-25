<?php
  global $twig, $mysql;

  require_once '_config.php';

  use Bramus\Router\Router;

  $curl = new anlutro\cURL\cURL;

  $router = new Router();

  session_start();

  $nations = array(
    'psf' => array(
      'name' => 'Panorama Socialist Federation',
      'flag' => 'https://raw.theclashfruit.me/CRSS/CRSS/main/Nations/Republic%20of%20Panorama/Flag.svg',
      'short' => 'psf',
      'short_description' => 'The first nation, prev. known as ROP.',
      'description' => 'The first nation on CRSS, previously known as ROP.',
    ),
    'drr' => array(
      'name' => 'Democratic Republic of Rayland',
      'flag' => 'https://raw.theclashfruit.me/CRSS/CRSS/main/Nations/Democratic%20Republic%20of%20Rayland/bannre.png',
      'short' => 'drr',
      'short_description' => 'Short description of D.R.R.',
      'description' => 'Full description of D.R.R', //does this support html and line breaks
    ),
    'cnk' => array(
      'name' => 'Chunkia',
      'flag' => 'https://raw.theclashfruit.me/CRSS/CRSS/main/Nations/Chunkia/chunkia512.png',
      'short' => 'cnk',
      'short_description' => 'Chunkia is based in a chaotic landscape',
      'description' => 'In the chaos of Minecraft, chunk errors are inevitable. Chunkia is based in one.',
    ),
    'ttk' => array(
      'name' => 'The Toaster-Königreich',
      'flag' => 'https://raw.theclashfruit.me/CRSS/CRSS/main/Nations/The%20Toaster-K%C3%B6nigreich/The%20Toaster-K%C3%B6nigreich%20Flag.png',
      'short' => 'ttk',
      'short_description' => 'The Toaster-Königreich is the Industrialized Nation of CRSS',
      'description' => 'In the vast landsacpe of CRSS, The Toaster-Königreich is one of the most industrialized Marxist district of CRSS. With Charge Industries as one of the main government controlled company in the nation.',
    )
  );
  
  if(isset($_SESSION['user'])) {
    $dbUser = $mysql->getUserRecordFromId($_SESSION['user']['id']);

    $user = $_SESSION['user'];

    $user['is_admin'] = $dbUser['is_admin'];

    $twig->addGlobal('user', $user);
  }

  $res = $curl->get('https://crss.blurryface.xyz/api/v1/players');

  $json = json_decode($res->body, true);

  if($json != null)
    $twig->addGlobal('playerCount', count($json));
  else
    $twig->addGlobal('playerCount', $json);

  $twig->addGlobal('nations', $nations);
  $twig->addGlobal('dc_uri', 'https://discord.com/api/oauth2/authorize?client_id=1144248396467683338&redirect_uri=' . urlencode($_ENV['DISCORD_REDIRECT']) . '&response_type=code&scope=identify%20guilds&state=' . urlencode($_SERVER['REQUEST_URI']));

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
    global $twig, $mysql;

    $twig->addGlobal('pageUri', '/map');
    $twig->addGlobal('markers', json_encode($mysql->getMarkers()));

    if(isset($_GET['center']))
      $twig->addGlobal('center', $_GET['center']);
    else
      $twig->addGlobal('center', '0;0');
  
    echo $twig->render('map.twig');
  });

  $router->get('/profile', function() {
    global $twig, $mysql;

    $twig->addGlobal('pageUri', '/profile');

    if (isset($_SESSION['user'])) {
      $user = $mysql->getUserRecordFromId($_SESSION['user']['id']);

      if ($user == null && $user['admin'] == 0) {
        http_response_code(404);

        echo $twig->render('404.twig');
      } else {
        echo $twig->render('profile.twig', array('db_data' => $user));
      }
    } else {
      http_response_code(404);

      echo $twig->render('404.twig');
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

  // ---------------- Admin ---------------- //

  $router->get('/admin', function() {
    global $twig, $mysql;

    $twig->addGlobal('pageUri', '/admin');

    if (isset($_SESSION['user'])) {
      $user  = $mysql->getUserRecordFromId($_SESSION['user']['id']);

      $users   = $mysql->getUsers();
      $markers = $mysql->getMarkers();

      if ($user == null && $user['admin'] == 0) {
        http_response_code(401);

        echo '<style>body { overflow: hidden; height: 100svh; background: black; display: flex; justify-content: center; align-items: center; }</style><img src="https://http.cat/401" alt="401 Unauthorized" />';
      } else {
        echo $twig->render('admin/index.twig', array('users' => $users, 'markers' => $markers));
      }
    } else {
      http_response_code(401);

      echo '<style>body { overflow: hidden; height: 100svh; background: black; display: flex; justify-content: center; align-items: center; }</style><img src="https://http.cat/401" alt="401 Unauthorized" />';
    }
  });

  $router->get('/admin/__data/page/([a-z]+)', function($page) {
    global $twig, $mysql;

    if (isset($_SESSION['user'])) {
      $user  = $mysql->getUserRecordFromId($_SESSION['user']['id']);

      $users   = $mysql->getUsers();
      $markers = $mysql->getMarkers();

      if ($user == null && $user['admin'] == 0) {
        http_response_code(401);

        echo '<style>body { overflow: hidden; height: 100svh; background: black; display: flex; justify-content: center; align-items: center; }</style><img src="https://http.cat/401" alt="401 Unauthorized" />';
      } else {
        try {
          echo $twig->render('admin/pages/' . urlencode($page) . '.twig', array('users' => $users, 'markers' => $markers));
        } catch (Exception $e) {
          http_response_code(404);

          echo $twig->render('admin/pages/404.twig');
        }
      }
    } else {
      http_response_code(401);

      echo '<style>body { overflow: hidden; height: 100svh; background: black; display: flex; justify-content: center; align-items: center; }</style><img src="https://http.cat/401" alt="401 Unauthorized" />';
    }
  });

  // ---------------- Admin API ---------------- //

  $adminApi = new Admin($router);

  $adminApi->registerApiRoutes();

  // ----------------- 404 ----------------- //

  $router->set404(function() {
    global $twig;

    $twig->addGlobal('pageUri', '404');
    
    http_response_code(404);
    
    echo $twig->render('404.twig');
  });

  $router->run();
