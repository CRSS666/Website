<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  require __DIR__ . '/vendor/autoload.php';
  require __DIR__ . '/util/Discord.php';

  use Twig\Loader\FilesystemLoader;

  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  $loader = new FilesystemLoader('template');
  $twig = new Twig\Environment($loader);
  
  $discord = new Discord(
    $_ENV['DISCORD_CLIENT'], 
    $_ENV['DISCORD_SECRET'],
    $_ENV['DISCORD_REDIRECT']
  );