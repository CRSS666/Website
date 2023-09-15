<?php
  class Auth {
    /**
     * @var Discord
     */
    private $discord;

    function __construct($discord) {
      $this->discord = $discord;
    }
    
    function getLoggedInUser() {
      
    }
  }