<?php
  class Admin {
    private Bramus\Router\Router $router;

    function __construct($router) {
      $this->router = $router;
    }

    function notFound($error): void {
      header('Content-Type: application/json');
      http_response_code(404);

      echo json_encode(array(
        'error' => true,
        'error_description' => $error
      ));

      exit();
    }

    function isSignedInAdmin(): void {
      global $mysql;

      if(!isset($_SESSION['user'])) {
        $this->notFound('You are not logged in.');
      }

      $user = $mysql->getUserRecordFromId($_SESSION['user']['id']);

      if($user == null && $user['admin'] == 0) {
        $this->notFound('You are not an admin.');
      }
    }

    function registerApiRoutes(): void {
      $router = $this->router;

      $router->mount('/admin/api', function() use ($router) {
        $router->mount('/v1', function() use ($router) {
          $router->get('/markers', function() {
            global $mysql;

            header('Content-Type: application/json');

            $this->isSignedInAdmin();

            $markers = $mysql->getMarkers();

            $markersNew = array();

            foreach ($markers as $marker) {
              $markersNew[] = array(
                'id' => $marker['id'],
                'name' => $marker['name'],
                'category' => $marker['category'],
                'x' => floatval(explode(';', $marker['data'])[1]),
                'y' => floatval(explode(';', $marker['data'])[0])
              );
            }

            $finalOut = array(
              'error' => false,
              'markers' => $markersNew
            );

            echo json_encode($finalOut);
          });

          $router->get('/users', function() {
            global $mysql;

            header('Content-Type: application/json');

            $this->isSignedInAdmin();

            echo json_encode($mysql->getUsers());
          });
        });
      });
    }
  }