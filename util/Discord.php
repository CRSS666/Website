<?php
  use anlutro\cURL\cURL;

  class Discord {
    private string $client;
    private string $secret;
    private string $redirect;
    private cURL $curl;

    function __construct($client, $secret, $redirect) {
      $this->client = $client;
      $this->secret = $secret;
      $this->redirect = $redirect;
      
      $this->curl = new anlutro\cURL\cURL;
    }

    function validateCode($code): array {
      $res = $this->curl->post('https://discord.com/api/v10/oauth2/token', [
        'client_id' => $this->client, 
        'client_secret' => $this->secret,
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $this->redirect
      ]);
      
      $json = json_decode($res->body, true);
      
      if(isset($json['error'])) {
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
    
    function refreshToken($refresh_token): array {
      $res = $this->curl->post('https://discord.com/api/oauth2/token', [
        'client_id' => $this->client,
        'client_secret' => $this->secret,
        'grant_type' => 'authorization_code',
        'refresh_token' => $refresh_token
      ]);

      $json = json_decode($res->body, true);

      if(isset($json['error'])) {
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

    function getUser($token): array {
      $res = $this->curl->newRequest('get', '/users/@me')
        ->setHeader('Authorization', 'Bearer ' . $token)
        ->send();
      
      return json_decode($res->body, true);
    }
    
    function getGuilds($token): array {
      $res = $this->curl->newRequest('get', '/users/@me/guilds')
        ->setHeader('Authorization', 'Bearer ' . $token)
        ->send();

      return json_decode($res->body, true);
    }
  }