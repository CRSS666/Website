<?php
  global $discord, $mysql;
  
  require_once "_config.php";
  
  session_start();
  
  if(isset($_GET['code'])) {
    $res = $discord->validateCode($_GET['code']);
    
    if(!$res['error']) {
      $_SESSION['access_token'] = $res['access_token'];
      $_SESSION['refresh_token'] = $res['refresh_token'];
      $_SESSION['expires_in'] = $res['expires_in'];

      $guilds = $discord->getGuilds($res['access_token']);
      
      $guildIds = array();

      foreach ($guilds as $guild) {
        $guildIds[] = $guild['id'];
      }
      
      if(!in_array('1127731341283307520', $guildIds) || !in_array('1195393418151596032', $guildIds)) {
        echo json_encode(array(
          'error' => true,
          'error_description' => 'You are not in any of CRSS\'s guilds.'
        ));
      } else {
        $_SESSION['user'] = $discord->getUser($res['access_token']);
        
        $mysql->createUserRecord($_SESSION['user']);


        if (isset($_GET['state'])) {
          header('Location: ' . $_GET['state']);
        } else {
          header('Location: /');
        }
      }
    } else {
      echo json_encode($res);
    }
  } else {
    echo json_encode(array(
      'error' => true,
      'error_description' => 'No code provided.'
    ));
  }