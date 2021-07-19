DROP TABLE IF EXISTS anime;

CREATE TABLE anime (
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  genre varchar(255) NOT NULL,
  rating int NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username varchar(255) PRIMARY KEY,
  password varchar(255) NOT NULL
);
