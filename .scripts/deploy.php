<?php
  require_once __DIR__ . '/../vendor/autoload.php';

  use JShrink\Minifier;

  $buildId = uniqid();

  $_CONFIG = Array(
    'paths' => Array(
      'main' => str_replace('/.scripts/deploy.php', '', __FILE__),
      'css'  => str_replace('/.scripts/deploy.php', '', __FILE__) . '/css',
      'js'   => str_replace('/.scripts/deploy.php', '', __FILE__) . '/js'
    )
  );

  require_once '_config.php';

  // "Compile" SCSS
  exec("sass {$_CONFIG['paths']['css']}/src/style.scss:{$_CONFIG['paths']['css']}/style.min.css --style compressed", $sassOutput);

  // Get Git Data
  exec('git rev-parse --abbrev-ref HEAD', $gitBranch);
  exec('git rev-parse HEAD', $gitCommitSha);
  exec('git show -s --format=%ct', $gitCommitTime);

  // Write the contents to the file build file
  file_put_contents('.build.json', json_encode([
    'build' => [
      'time' => date('c'),
      'id'   => $buildId
    ],
    'git' => [
      'branch' => $gitBranch[0],
      'commit' => [
        'sha'     => $gitCommitSha[0],
        'created' => date('c', $gitCommitTime[0])
      ]
    ]
  ]));

  echo implode(PHP_EOL, $sassOutput) . PHP_EOL;

  echo '`git rev-parse --abbrev-ref HEAD`: ' . implode(PHP_EOL, $gitBranch) . PHP_EOL;
  echo '`git rev-parse HEAD`: ' . implode(PHP_EOL, $gitCommitSha) . PHP_EOL;
  echo '`git show -s --format=%ct`: ' . implode(PHP_EOL, $gitCommitTime) . PHP_EOL;

  echo PHP_EOL . "Deployment completed with build id: `$buildId`!" . PHP_EOL;

  exit(0);