DROP TABLE IF EXISTS anime;

CREATE TABLE anime (
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  genre varchar(255) NOT NULL,
  rating int NOT NULL
);
