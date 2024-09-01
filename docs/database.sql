SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `crss` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `crss`;

CREATE TABLE IF NOT EXISTS `governments` (
  `id` bigint(20) NOT NULL,
  `nation_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nation_id` (`nation_id`)
);

CREATE TABLE IF NOT EXISTS `government_officials` (
  `id` bigint(20) NOT NULL,
  `government_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `government_id` (`government_id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`)
);

CREATE TABLE IF NOT EXISTS `government_roles` (
  `id` bigint(20) NOT NULL,
  `government_id` bigint(20) NOT NULL,
  `level` int(11) NOT NULL,
  `name` varchar(48) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `government_id` (`government_id`)
);

CREATE TABLE IF NOT EXISTS `images` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(64) NOT NULL,
  `alt` text NOT NULL,
  `type` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `image_user` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `image_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_id` bigint(20) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `z` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
);

CREATE TABLE IF NOT EXISTS `image_sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_id` bigint(20) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
);

CREATE TABLE IF NOT EXISTS `mc_links` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `uuid` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `mc_link_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `code` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `user_id` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `nations` (
  `id` bigint(20) NOT NULL,
  `code` varchar(3) NOT NULL,
  `name` varchar(48) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `nation_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nation_id` bigint(20) NOT NULL,
  `x` int(11) NOT NULL,
  `z` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nation_id` (`nation_id`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(32) NOT NULL,
  `display_name` varchar(64) NOT NULL,
  `email` varchar(320) NOT NULL,
  `avatar` text NOT NULL,
  `banner` text NOT NULL,
  `accent_color` int(11) NOT NULL,
  `discord_id` bigint(20) NOT NULL,
  `permissions` int(11) NOT NULL,
  `badges` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `discord_id` (`discord_id`)
);

CREATE TABLE IF NOT EXISTS `user_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `token` varchar(1024) NOT NULL,
  `dc_access_token` text NOT NULL,
  `dc_refresh_token` text NOT NULL,
  `dc_id_token` text NOT NULL,
  `user_agent` text NOT NULL,
  `ip` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`) USING HASH,
  KEY `user_id` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `user_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`settings`)),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
);

--- Foreign keys

ALTER TABLE `governments` ADD CONSTRAINT `nation` FOREIGN KEY (`nation_id`) REFERENCES `nations` (`id`) ON DELETE CASCADE;
ALTER TABLE `government_officials` ADD CONSTRAINT `government_official` FOREIGN KEY (`government_id`) REFERENCES `governments` (`id`) ON DELETE CASCADE, ADD CONSTRAINT `government_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, ADD CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `government_roles` (`id`) ON DELETE CASCADE;
ALTER TABLE `government_roles` ADD CONSTRAINT `government_role` FOREIGN KEY (`government_id`) REFERENCES `governments` (`id`) ON DELETE CASCADE;
ALTER TABLE `images` ADD CONSTRAINT `image_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `image_locations` ADD CONSTRAINT `image_location_id` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE;
ALTER TABLE `image_sizes` ADD CONSTRAINT `image_size` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE;
ALTER TABLE `mc_links` ADD CONSTRAINT `mc_link_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `mc_link_codes` ADD CONSTRAINT `mc_link_code_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `nation_points` ADD CONSTRAINT `nation_point_id` FOREIGN KEY (`nation_id`) REFERENCES `nations` (`id`) ON DELETE CASCADE;
ALTER TABLE `user_sessions` ADD CONSTRAINT `session_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `user_settings` ADD CONSTRAINT `setting_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

COMMIT;