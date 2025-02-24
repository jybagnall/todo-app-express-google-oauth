CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    text VARCHAR(250) NOT NULL,
    completed TINYINT(1) NOT NULL
); 

CREATE TABLE reminder (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    text VARCHAR(1000)
); 

CREATE TABLE priority (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    text VARCHAR(250) NOT NULL,
    completed TINYINT(1) NOT NULL
); 

INSERT into todo (text, completed) VALUES
    ('Clean the house', 0),
    ('Order cheese', 1),
    ('Choose books to sell', 0),
    ('Make tomato soup', 1);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NULL,  -- Google OAuth users 
    email VARCHAR(255) UNIQUE NOT NULL,  -- Required for all users
    password VARCHAR(255) NULL,           -- Only for local
    name VARCHAR(255) NOT NULL,           -- from Google or manually typed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE todo
    ADD COLUMN user_id INT NOT NULL;


ALTER TABLE reminder
ADD CONSTRAINT reminder_fk_user 
FOREIGN KEY (user_id) REFERENCES users(id) 
ON DELETE CASCADE;

ALTER TABLE reminder
    ADD COLUMN user_id INT NOT NULL;