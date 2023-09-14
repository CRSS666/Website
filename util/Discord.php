<?php
  use anlutro\cURL\cURL;

  class Discord {
    /**
     * @var string
     */
    private $client;
    /**
     * @var string
     */
    private $secret;
    /**
     * @var string
     */
    private $redirect;
    /**
     * @var cURL
     */
    private $curl;

    function __construct($client, $secret, $redirect) {
      $this->client = $client;
      $this->secret = $secret;
      $this->redirect = $redirect;
      
      $this->curl = new anlutro\cURL\cURL;
    }

    function ValidateCode($code) {
      $curl = $this->curl;
      
      $res = $curl->post('', [
        'client_id' => $this->client, 
        'client_secret' => $this->secret,
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $this->redirect
      ]);
      
      $json = json_decode($res->body, true);
      
      if($json['error']) {
        return array(
          'error' => true,
          'error_description' => $json['error_description']
        );
      } else {
        return array(
          'error' => false,
          'access_token' => $json['access_token'],
          'refresh_token' => $json['refresh_token'],
          'expires_in' => $json['expires_in']
        );
      }
    }
  }