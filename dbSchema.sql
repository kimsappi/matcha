DROP DATABASE IF EXISTS matcha;

CREATE DATABASE IF NOT EXISTS matcha;

USE matcha;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(24) UNIQUE NOT NULL,
	`password` CHAR(64),
	email VARCHAR(99) UNIQUE NOT NULL,
	first_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	age INT DEFAULT NULL,
	fame INT DEFAULT NULL,
	gender VARCHAR(1) DEFAULT '0',
	target_genders VARCHAR(2) DEFAULT 'fm',
	biography VARCHAR(512) DEFAULT '',
	email_confirmation_string VARCHAR(64),
	forgot_password_string VARCHAR(64) DEFAULT NULL,
	longitude FLOAT DEFAULT NULL,
	latitude FLOAT DEFAULT NULL,
	last_login DATETIME DEFAULT NULL,
	main_pic INT UNSIGNED DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_photos (
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`user` INT UNSIGNED,
	`extension` VARCHAR(16),
	FOREIGN KEY (`user`) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS tags (
	string VARCHAR(32) NOT NULL,
	user INT UNSIGNED,
	PRIMARY KEY (string, user),
	FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS likes (
	liker INT UNSIGNED NOT NULL,
	likee INT UNSIGNED NOT NULL,
	is_match BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (liker, likee),
	FOREIGN KEY (liker) REFERENCES users(id),
	FOREIGN KEY (likee) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS visits (
	visitor INT UNSIGNED NOT NULL,
	visitee INT UNSIGNED NOT NULL,
	`time` DATETIME NOT NULL,
	PRIMARY KEY (visitor, visitee),
	FOREIGN KEY (visitor) REFERENCES users(id),
	FOREIGN KEY (visitee) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	sender INT UNSIGNED NOT NULL,
	recipient INT UNSIGNED NOT NULL,
	content VARCHAR(512) NOT NULL,
	FOREIGN KEY (sender) REFERENCES users(id),
 	FOREIGN KEY (recipient) REFERENCES users(id)
);

-- CREATE TABLE IF NOT EXISTS chats (
-- 	id INT UNSIGNED AUTO_INCREMENT,
-- 	chatter1 INT UNSIGNED NOT NULL,
-- 	chatter2 INT UNSIGNED NOT NULL,
-- 	PRIMARY KEY (chatter1, chatter2),
-- 	FOREIGN KEY (chatter1) REFERENCES users(id),
-- 	FOREIGN KEY (chatter2) REFERENCES users(id)
-- );

-- CREATE TABLE IF NOT EXISTS messages (
-- 	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
-- 	chat INT UNSIGNED,
-- 	chatter INT UNSIGNED NOT NULL,
-- 	message VARCHAR(512) NOT NULL,
-- 	FOREIGN KEY (chat) REFERENCES chats(id),
-- 	FOREIGN KEY (chatter) REFERENCES users(id)
-- );

-- Passwords are '123'
INSERT INTO users (username, `password`, email, first_name, last_name, gender) VALUES
	('admin1', 'ad9b191cd8d24d4e57710893f9922c11c6aeb8143ec99baf4332f191c6bfba9c', 'admin1@example.com', 'Admin', 'One', 'm'),
	('admin2', 'b0b46aaf9bab6524f15c40e3c82febe1bbad1f5cb87def29023f3303edd709f1', 'admin2@example.com', 'Admin', 'Two', 'f');

DROP USER 'dbuser'@'%';
CREATE USER 'dbuser'@'%' IDENTIFIED WITH mysql_native_password BY '123dbuser';
GRANT ALL PRIVILEGES ON *.* TO 'dbuser'@'%';
