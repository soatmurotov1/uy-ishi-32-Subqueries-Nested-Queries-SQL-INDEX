


CREATE DATABASE football_clubs;
\c football_clubs; 




CREATE TABLE tournaments (
    tournament_id SERIAL PRIMARY KEY,
    tournament_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL
);

SELECT * FROM tournaments;




CREATE TABLE tournament_groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    tournament_id INT NOT NULL REFERENCES tournaments(tournament_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM tournament_groups;






CREATE TABLE football_clubs (
    club_id SERIAL PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    founded_year INT
);

SELECT * FROM football_clubs;





CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    club_id INT REFERENCES football_clubs(club_id),
    group_id INT REFERENCES tournament_groups(group_id),
    coach_name VARCHAR(100)
);

SELECT * FROM teams;







CREATE TABLE match_fixtures (
    match_id SERIAL PRIMARY KEY,
    match_date TIMESTAMP NOT NULL,
    venue VARCHAR(100),
    home_team_id INT REFERENCES teams(team_id),
    away_team_id INT REFERENCES teams(team_id),
    home_score INT,
    away_score INT,
    tournament_id INT REFERENCES tournaments(tournament_id)
);

SELECT * FROM match_fixtures;






CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    position VARCHAR(50) NOT NULL,
    team_id INT REFERENCES teams(team_id),
    jersey_number INT
);

SELECT * FROM players;


