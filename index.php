<?php
  global $twig;

  require_once '_config.php';

  use Bramus\Router\Router;
  use anlutro\cURL\cURL;
  use Twig\TwigFunction;

  $curl   = new cURL();
  $router = new Router();

  session_start([
    'cookie_lifetime' => 86400,
  ]);

  $buildData = json_decode(file_get_contents('.build.json'));

  $iconsFun = new TwigFunction('icon', function($icon, $attributes = []) {
    $iconName = str_replace('/', '', $icon);

    if (str_starts_with($iconName, 'simpleicons')) {
      $iconName = str_replace('simpleicons.', '', $iconName);

      $iconData = file_get_contents("./vendor/simple-icons/simple-icons/icons/$iconName.svg");
    } else if (str_starts_with($iconName, 'lucide')) {
      $iconName = str_replace('lucide.', '', $iconName);

      $iconData = file_get_contents("./vendor/theclashfruit/lucide-static-php/icons/$iconName.svg");
    } else {
      $iconName = str_replace('.', '/', $iconName);

      $iconData = file_get_contents("./icons/$iconName.svg");
    }

    foreach ($attributes as $key => $value) {
      if ($key == 'class')
        $iconData = preg_replace('/(class="\b[^"]*)"/i', '$1 ' . $value . '"', $iconData);
      else
        $iconData = preg_replace('/(<svg\b[^><]*)>/i', '$1 ' . $key . '="' . $value . '">', $iconData);

      $dom = new DOMDocument('1.0');
      $dom->preserveWhiteSpace = false;
      $dom->formatOutput       = false;
      $dom->loadXML($iconData);

      $iconData = $dom->saveHTML();
      $iconData = preg_replace('/(<!--\s.*)-->/i', '', $iconData);
      $iconData = preg_replace('/\n/', ' ', $iconData);
    }

    return $iconData;
  });

  $twig->addFunction($iconsFun);

  $twig->addGlobal('git', $buildData->git);

  $twig->addGlobal('server', [
    'version' => '1.11.2',
  ]);

  $twig->addGlobal('user', [
    'name' => 'John Doe'
  ]);

  $router->get('/', function() {
    global $twig;

    echo $twig->render('index.twig', [
      'page' => [
        'title' => 'Home',
        'path'  => '/',
      ]
    ]);
  });

  $router->get('/helloworld', function() {
    echo '<!DOCTYPE html>';
    echo '<h1>Hello World!!</h1>';
  });

  $router->run();