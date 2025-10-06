CREATE DATABASE football_club;



CREATE TABLE tournaments(
    tournament_id INT PRIMARY KEY NOT NULL,
    tournament_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL    
);

SELECT * FROM tournaments;




CREATE TABLE tournament_groups(
   group_id INT,
   group_name VARCHAR(100) NOT NULL,
   tournament_id NOT NULL REFERENCES tournaments(tournament_id),
   created_at TIMESTAMP
);

SELECT * from tournament_groups;





CREATE TABLE match_fixtures(
    match_id INT,
    match_date TIMESTAMP NOT NULL,
    venue VARCHAR(100) ,
    home_team_id INT REFERENCES teams(team_id),
    away_team_id INT REFERENCES teams(team_id),
    home_score INT,
    away_score INT,
    tournament_id INT REFERENCES tournaments(tournament_id)
);

SELECT * FROM match_fixtures;








CREATE TABLE teams(
    team_id INT,
    team_name VARCHAR(100) NOT NULL REFERENCES tournament_groups(group_id),
    club_id INT,
    group_id INT REFERENCES tournament_groups(group_id),
    coach_name VARCHAR(100)
)

SELECT * FROM teams;






CREATE TABLE football_clubs(
    club_id INT REFERENCES teams(club_id),
    club_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    founded_year INT 
);

SELECT * FROM football_club;





CREATE TABLE  players(
    player_id INT,
    full_name VARCHAR(100) NOT NULL,
    dat_of_birth DATE NOT NULL,
    position VARCHAR(50) NOT NULL,
    team_id INT REFERENCES teams(team_id),
    jensey_number INT
);

SELECT * FROM players;
















create table baza(
    id int PRIMARY key,
    name VARCHAR(200) not null,
    role VARCHAR(200) not NULL,
    salary int not null,
    departement_id int 
);


SELECT * FROM baza;

INSERT INTO baza (id, name, role, salary, departement_id) VALUES
(1, 'Rahimov Sardor', 'Director', 50000, 1),
(2, 'Komilov Mansur', 'Buhalter', 20000, 1),
(3, 'Salomov Botir', 'Dizayner', 22000, 2),
(4, 'Davronov Sobir', 'Marketolog', 21000, 3),
(5, 'Olimov Shokir', 'Dasturchi', 25000, 4),
(6, 'Vohodov Zohid', 'Dasturchi', 24000, 4),
(7, 'Qodirov Nosir', 'Dizayner', 15000, 2);







SELECT AVG(salary) from baza;


SELECT MAX(salary) FROM baza;


select * from baza WHERE COUNT(departement_id)> 1;


select count(departement_id) from baza COLUMN()










CREATE TABLE products(
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quintily int not NULL check(quintily >= 0)
    
);  





CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


