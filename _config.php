<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);

  error_reporting(E_ALL);

  require __DIR__ . '/vendor/autoload.php';

  use Dotenv\Dotenv;

  use Twig\Environment;
  use Twig\Loader\FilesystemLoader;

  $dotenv = Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  $loader = new FilesystemLoader('template');
  $twig   = new Environment($loader);