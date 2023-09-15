<?php
  global $discord;
  
  require_once "_config.php";
  
  session_start();
  
  if(isset($_GET['code'])) {
    $res = $discord->validateCode($_GET['code']);
    
    if(!$res->error) {
      $_SESSION['access_token'] = $res->access_token;
      $_SESSION['refresh_token'] = $res->refresh_token;
      $_SESSION['expires_in'] = $res->expires_in;

      $guilds = $discord->getGuilds($res->access_token);
      
      if(!in_array('', $guilds)) {
        echo json_encode(array(
          'error' => true,
          'error_description' => 'You are not in the CRSS guild.'
        ));
      } else {
        $_SESSION['user'] = $discord->getUser($res->access_token);
        
        header('Location: /');
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