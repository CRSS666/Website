<?php
  class Database {
    private string $host;
    private string $user;
    private string $pass;
    private string $db;
    private mysqli $conn;

    function __construct($host, $user, $pass, $db) {
      $this->host = $host;
      $this->user = $user;
      $this->pass = $pass;
      $this->db = $db;

      $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->db);
    }

    function createUserRecord($user): void {
      $sql = 'INSERT IGNORE INTO users (id, username, display_name) VALUES (?, ?, ?)';
      
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('iss', $user['id'], $user['username'], $user['global_name']);
      
      $stmt->execute();
    }
    
    function getUserRecordFromUsername($username): array | null {
      $sql = 'SELECT * FROM users WHERE username = ?';
      
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $username);
      
      $stmt->execute();
      
      $res = $stmt->get_result();
      
      if($res->num_rows > 0) {
        return $res->fetch_assoc();
      } else {
        return null;
      }
    }
    
    function getUserRecordFromId($id): array | null {
      $sql = 'SELECT * FROM users WHERE id = ?';
      
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('i', $id);
      
      $stmt->execute();
      
      $res = $stmt->get_result();
      
      if($res->num_rows > 0) {
        return $res->fetch_assoc();
      } else {
        return null;
      }
    }

    function getMarkers() {
      $sql = 'SELECT * FROM markers';

      $stmt = $this->conn->prepare($sql);

      $stmt->execute();

      $res = $stmt->get_result();

      if($res->num_rows > 0) {
        return $res->fetch_all(MYSQLI_ASSOC);
      } else {
        return null;
      }
    }
  }