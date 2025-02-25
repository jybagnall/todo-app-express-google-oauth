CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      google_id varchar(255),
      name varchar(255),
      email varchar(255),
      salt varchar(255),
      hashed_password varchar(255) 
);

CREATE TABLE priority (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      text varchar(255),
      completed boolean DEFAULT false,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE todo (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      text varchar(255),
      completed boolean DEFAULT false,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE reminder (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      text varchar(255),
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
