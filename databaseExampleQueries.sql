-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(40)
);

-- Insert some animals (C in CRUD - Create)
INSERT INTO animals
  (first_name, type, accessory)
VALUES
  ('Dodo',  'turtle',  'scope'),
  ('Paco',  'dog',  'jacket'),
  ('Tira',  'cat',  'glasses'),
  ('Danny',  'guineapig',  'zylinder'),
  ('Karl',  'llama',  'hat');


-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;
