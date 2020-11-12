--scheme analytics
CREATE SCHEMA analytics
    AUTHORIZATION postgres;
COMMENT ON SCHEMA analytics
    IS 'analytics schema';
GRANT ALL ON SCHEMA analytics TO PUBLIC;--who is public crete roles o=in postge sql
GRANT ALL ON SCHEMA analytics TO postgres;
--scheme organization
CREATE SCHEMA organization
    AUTHORIZATION postgres;

COMMENT ON SCHEMA organization
    IS 'organization schema';

GRANT ALL ON SCHEMA organization TO PUBLIC;--who is public crete roles o=in postge sql

GRANT ALL ON SCHEMA organization TO postgres;

CREATE TABLE public.roles (
   role_id serial,
   role_name text COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE public.persons  (
   person_id serial,
   first_name VARCHAR (50) NOT NULL,
   middle_name VARCHAR (50) NOT NULL,
   natinality VARCHAR (30) NOT NULL,
   data_of_birth date NOT NULL ,
   place_of_birth VARCHAR (50) NOT NULL
);


CREATE TABLE public.footballers (
   height decimal (6,3) NOT NULL,
   weight decimal (6,3) NOT NULL,
   role_id integer DEFAULT 0
) inherits (persons);


CREATE TABLE public.footballer_clubs (
   footballer_club_id serial,
   club_id integer NOT NULL,
   player_id integer NOT NULL
);
CREATE TABLE public.sponsores_clubs (
   sponsor_club_id serial,
   club_id integer NOT NULL,
   sponsor_id integer NOT NULL
);
CREATE TABLE public.coaches (
   count_of_victories int  NOT NULL default 0 ,
   years_of_expirience int  NOT NULL default 0,
   club_id integer NOT NULL
) inherits (persons);
CREATE TABLE public.sponsores (
   sponsorship_kind VARCHAR (30) NOT NULL,
   sponsorship_sum money NOT NULL
) inherits (persons);

CREATE TABLE organization.trainings (
   training_id serial,
   training_data date NOT NULL,
   coach_id integer NOT NULL DEFAULT 0,
   stadium_id integer NOT NULL DEFAULT 0
);
CREATE TABLE organization.matches (
   match_id serial,
   match_name  text COLLATE pg_catalog."default" NOT NULL,
   ticket_price money NOT NULL default 0,
   match_date date NOT NULL default CURRENT_DATE,
   stadium_id integer NOT NULL DEFAULT 0
);
CREATE TABLE organization.addresses (
   address_id serial,
   street_address VARCHAR (40) NOT NULL,
   postal_code    VARCHAR(12) NOT NULL,
   city           VARCHAR(30) NOT NULL,
   country        VARCHAR(30) NOT NULL,
   state_province VARCHAR(25)
);

CREATE TABLE organization.stadiums (
   stadium_id serial ,
   stadium_name text COLLATE pg_catalog."default" NOT NULL,
   capacity INT NOT NULL default 0 ,
   year_of_build varchar(4) default  date_part('year', CURRENT_DATE) ,
   surface   VARCHAR (40) NOT NULL,
   address_id INT NOT NULL
);

CREATE TABLE analytics.cards (
   card_id serial,
   red_card_count  INT NOT NULL default 0 ,
   yellow_card_count  INT NOT NULL default 0 
);
CREATE TABLE analytics.football_results (
   result_id serial,
   score_id INT NOT NULL,
   card_id INT,
   match_id INT NOT NULL,
   footballer_id INT NOT NULL
);
CREATE TABLE analytics.scores (
   score_id serial ,
   scored_goales INT NOT NULL default 0,
   missed_goales INT NOT NULL default 0
);

CREATE TABLE public.seasones (
   season_id serial ,
   league_name text COLLATE pg_catalog."default" NOT NULL
);

CREATE TABLE public.football_clubs_seasones (
	football_clubs_season_id serial,
	club_id INT,
	season_id INT NOT NULL
);

CREATE TABLE public.logos (
   logo_id serial,
   image bytea NOT NULL,
   image_name text COLLATE pg_catalog."default" NOT NULL,
   club_id integer NOT NULL DEFAULT 0
);

CREATE TABLE public.football_clubs (
    football_club_id serial ,
    football_club_name text COLLATE pg_catalog."default"
);

SET search_path TO analytics,organization,public;

--А.2 SQL-скрипти наповнення таблиць відповідними полями з типами та розміром 
--А.3 SQL-скрипти  додання ключів – первинних та зовнішніх для формалізації зв’язків
--primary keys
ALTER TABLE roles ADD CONSTRAINT PK_roles PRIMARY KEY (role_id);
ALTER TABLE persons ADD CONSTRAINT PK_persons PRIMARY KEY (person_id);
ALTER TABLE sponsores ADD CONSTRAINT PK_sponsores PRIMARY KEY (person_id);
ALTER TABLE coaches ADD CONSTRAINT PK_coaches PRIMARY KEY (person_id);
ALTER TABLE footballers ADD CONSTRAINT PK_footballers PRIMARY KEY (person_id);
ALTER TABLE trainings ADD CONSTRAINT PK_trainings PRIMARY KEY (training_id);
ALTER TABLE matches ADD CONSTRAINT PK_matches PRIMARY KEY (match_id);
ALTER TABLE addresses ADD CONSTRAINT PK_addresses PRIMARY KEY (address_id);
ALTER TABLE seasones ADD CONSTRAINT PK_seasones PRIMARY KEY (season_id);
ALTER TABLE cards ADD CONSTRAINT PK_cards PRIMARY KEY (card_id);
ALTER TABLE logos ADD CONSTRAINT PK_logos PRIMARY KEY (logo_id);
ALTER TABLE stadiums ADD CONSTRAINT PK_stadiums PRIMARY KEY (stadium_id);
ALTER TABLE scores ADD CONSTRAINT PK_scores PRIMARY KEY (score_id);
ALTER TABLE football_results ADD CONSTRAINT PK_football_results PRIMARY KEY (result_id);
ALTER TABLE football_clubs_seasones ADD CONSTRAINT PK_football_clubs_seasones PRIMARY KEY (football_clubs_season_id);
ALTER TABLE football_clubs ADD CONSTRAINT PK_football_club PRIMARY KEY (football_club_id);
ALTER TABLE sponsores_clubs ADD CONSTRAINT PK_sponsor_club PRIMARY KEY (sponsor_club_id );
--FOREIGN KEYS 
--logos
ALTER TABLE  logos ADD CONSTRAINT FK_logos_football_clubs_club_id FOREIGN KEY (club_id)
REFERENCES football_clubs (football_club_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE logos VALIDATE CONSTRAINT  FK_logos_football_clubs_club_id;


-- football_results
ALTER TABLE  football_results ADD CONSTRAINT FK_football_results_scores_score_id FOREIGN KEY (score_id)
REFERENCES scores (score_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE football_results VALIDATE CONSTRAINT FK_football_results_scores_score_id;

ALTER TABLE  football_results ADD CONSTRAINT FK_football_results_cards_card_id FOREIGN KEY (card_id)
REFERENCES cards (card_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE football_results VALIDATE CONSTRAINT FK_football_results_cards_card_id;

ALTER TABLE  football_results ADD CONSTRAINT FK_football_results_footballers_footballer_id FOREIGN KEY (footballer_id)
REFERENCES footballers (person_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE football_results VALIDATE CONSTRAINT FK_football_results_footballers_footballer_id;

ALTER TABLE  football_results ADD CONSTRAINT FK_football_results_matches_match_id FOREIGN KEY (match_id)
REFERENCES matches (match_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE football_results VALIDATE CONSTRAINT FK_football_results_matches_match_id;

--stadiums
ALTER TABLE  stadiums ADD CONSTRAINT FK_stadiums_addresses_address_id FOREIGN KEY (address_id)
REFERENCES addresses (address_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE stadiums VALIDATE CONSTRAINT FK_stadiums_addresses_address_id;


--matches
ALTER TABLE  matches ADD CONSTRAINT FK_matches_satiums_stadium_id FOREIGN KEY (stadium_id)
REFERENCES stadiums (stadium_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE matches VALIDATE CONSTRAINT FK_matches_satiums_stadium_id;

--trainings
ALTER TABLE  trainings ADD CONSTRAINT FK_trainings_coahes_coach_id FOREIGN KEY (coach_id)
REFERENCES coaches (person_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE  trainings VALIDATE CONSTRAINT FK_trainings_coahes_coach_id;

ALTER TABLE  trainings ADD CONSTRAINT FK_trainings_stadiums_stadium_id FOREIGN KEY (stadium_id)
REFERENCES stadiums (stadium_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE  trainings VALIDATE CONSTRAINT FK_trainings_stadiums_stadium_id ;


--sponsores_clubs

ALTER TABLE  sponsores_clubs ADD CONSTRAINT FK_sponsores_clubs_sponseres_sponsor_id FOREIGN KEY (sponsor_id)
REFERENCES sponsores (person_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE  sponsores_clubs VALIDATE CONSTRAINT FK_sponsores_clubs_sponseres_sponsor_id ;


ALTER TABLE  sponsores_clubs ADD CONSTRAINT FK_sponsores_clubs_clubs_club_id FOREIGN KEY (club_id)
REFERENCES football_clubs (football_club_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE  sponsores_clubs VALIDATE CONSTRAINT FK_sponsores_clubs_clubs_club_id;

--footballers
ALTER TABLE  footballers ADD CONSTRAINT FK_footballers_roles_role_id FOREIGN KEY (role_id)
REFERENCES roles (role_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE footballers VALIDATE CONSTRAINT FK_footballers_roles_role_id;

--fatballer_clubs
ALTER TABLE  footballer_clubs ADD CONSTRAINT FK_footballer_clubs_footballers_player_id FOREIGN KEY (player_id)
REFERENCES footballers (person_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE footballer_clubs VALIDATE CONSTRAINT FK_footballer_clubs_footballers_player_id;

ALTER TABLE  footballer_clubs ADD CONSTRAINT FK_footballer_clubs_football_clubs_club_id FOREIGN KEY (club_id)
REFERENCES football_clubs (football_club_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE footballer_clubs VALIDATE CONSTRAINT FK_footballer_clubs_football_clubs_club_id;

--football_clubs_seasones
ALTER TABLE  football_clubs_seasones ADD CONSTRAINT FK_football_clubs_seasones_club_club_id FOREIGN KEY (club_id)
REFERENCES football_clubs (football_club_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE football_clubs_seasones VALIDATE CONSTRAINT FK_football_clubs_seasones_club_club_id;

ALTER TABLE  football_clubs_seasones ADD CONSTRAINT FK_football_clubs_seasones_seasones_season_id FOREIGN KEY (season_id)
REFERENCES seasones (season_id) 
MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE;
ALTER TABLE football_clubs_seasones VALIDATE CONSTRAINT FK_football_clubs_seasones_seasones_season_id;


--one to one realtionships
ALTER TABLE  stadiums ADD CONSTRAINT FK_stadiums_addresses_unique_address_id UNIQUE(address_id);
ALTER TABLE  football_results ADD CONSTRAINT FK_football_results_scores_unique_score_id UNIQUE (score_id);
---ALTER TABLE  football_clubs ADD CONSTRAINT FK_football_results_cards_unique_card_id UNIQUE (card_id);
ALTER TABLE  logos ADD CONSTRAINT FK_logos_unique_club_id UNIQUE (club_id);
--A.4 SQL-скрипти для введення необхідних індексів 
--A.5 SQL-скрипти для введення додаткових обмежень цілісності 
ALTER TABLE footballers ADD CONSTRAINT positive_height CHECK (height > 0);
ALTER TABLE footballers ADD CONSTRAINT positive_wight CHECK (weight > 0);
ALTER TABLE coaches ADD CONSTRAINT positive_count_of_victories CHECK (count_of_victories > 0);
ALTER TABLE coaches ADD CONSTRAINT years_of_expirience  CHECK (years_of_expirience  > 0);
ALTER TABLE stadiums ADD CONSTRAINT positive_capacity CHECK (capacity >= 0);
ALTER TABLE cards ADD CONSTRAINT positive_red_card_count  CHECK (red_card_count   >= 0);
ALTER TABLE cards ADD CONSTRAINT positive_yellow_card_count  CHECK (yellow_card_count >= 0);
ALTER TABLE football_results ADD CONSTRAINT match_fatballer_unigue_pair UNIQUE(match_id,footballer_id);
ALTER TABLE scores ADD CONSTRAINT  positive_scored_goales CHECK (scored_goales >= 0);
ALTER TABLE scores ADD CONSTRAINT positive_missed_goales CHECK (missed_goales >= 0);
SELECT person_id, first_name, middle_name, natinality, data_of_birth, place_of_birth, height, weight, role_id
	FROM public.footballers;
