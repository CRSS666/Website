<?php
  global $twig;

  require_once '_config.php';

  use Bramus\Router\Router;
  use anlutro\cURL\cURL;
  use Twig\TwigFilter;
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
    }

    $dom = new DOMDocument('1.0');

    $dom->preserveWhiteSpace = false;
    $dom->formatOutput       = false;
    $dom->loadXML($iconData);

    $iconData = $dom->saveHTML();

    $iconData = preg_replace('/(<!--\s.*)-->/i', '', $iconData);
    $iconData = preg_replace('/\n/', ' ', $iconData);

    return $iconData;
  });

  // override the default merge filter to add type casting
  $mergeOverride = new TwigFilter('merge', function($array1, $array2) {
    return array_merge((array) $array1, (array) $array2);
  });

  $twig->addFunction($iconsFun);

  $twig->addFilter($mergeOverride);

  $twig->addGlobal('git', $buildData->git);
  $twig->addGlobal('server', [
    'version' => '1.11.2',
  ]);

  // recommended to start a five-server server for live reloading
  if (isset($_ENV['IS_DEV']))
    $twig->addGlobal('is_dev', true);

  /*
  $twig->addGlobal('user', [
    'name' => 'John Doe'
  ]);
  */

  $router->get('/', function() {
    global $twig;

    echo $twig->render('index.twig', [
      'page' => [
        'title' => 'Home',
        'path'  => '/',
        'id'    => 'home'
      ]
    ]);
  });

  $router->get('/about', function() {
    global $twig;

    echo $twig->render('about.twig', [
      'page' => [
        'title' => 'About Us',
        'path'  => '/about',
        'id'    => 'about'
      ],
      'props' => [
        'team' => json_decode(file_get_contents('.data/team.json'))
      ]
    ]);
  });

  $router->get('/helloworld', function() {
    echo '<!DOCTYPE html>';
    echo '<h1>Hello World!!</h1>';
  });

  $router->set404(function() {
    global $twig;

    echo $twig->render('404.twig', [
      'page' => [
        'title' => '404 Not Found',
        'path'  => $_SERVER['REQUEST_URI'],
        'id'    => '404'
      ]
    ]);
  });

  $router->run();