CREATE DATABASE jubelio

CREATE TABLE products(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  image TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT
);