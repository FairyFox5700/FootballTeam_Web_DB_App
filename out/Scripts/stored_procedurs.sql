--1 Скрипт отримання всіх футболістів з іменем ролі
CREATE OR REPLACE FUNCTION get_all_footballers_with_roles()
RETURNS TABLE (
   person_id integer,
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   natinality VARCHAR (30),
   data_of_birth date  ,
   place_of_birth VARCHAR (50),
   height decimal (6,3) ,
   weight decimal (6,3),
   role_name text ) as
$$
BEGIN
    RETURN QUERY
    -- subtracting the amount from the sender's account 
	SELECT f.person_id, f.first_name, f.middle_name, f.nationality, f.data_of_birth, f.place_of_birth, f.height, f.weight, r.role_name
	FROM public.footballers f
	INNER JOIN public.roles r
	ON f.role_id = r.role_id;	
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_footballers_with_roles();


--2 Скрипт на отримання всіх футболістів за ім’ям ролі
CREATE OR REPLACE FUNCTION count_footballers_by_role_name
(
 roleName text
)
RETURNS TABLE (
   role_id integer,
   role_name text,
   footballers_count bigint) 
AS $$
BEGIN
	RETURN QUERY
	SELECT  r.role_id,r.role_name,count(f.person_id) as footballers_count
	FROM public.roles r
	INNER JOIN public.footballers f
	ON f.role_id = r.role_id
	WHERE r.role_name LIKE '%' || roleName || '%'
	group by r.role_id ,r.role_name;
END
$$ LANGUAGE plpgsql;

SELECT * FROM count_footballers_by_role_name('Left Attac');

--3 Скрипт на отримання всіх футболістів разом з ролями за ім’ям ролі


CREATE OR REPLACE FUNCTION get_all_footballers_with_role_name
(
 roleName text
)
RETURNS TABLE (
   person_id integer,
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   natinality VARCHAR (30),
   data_of_birth date  ,
   place_of_birth VARCHAR (50),
   height decimal (6,3) ,
   weight decimal (6,3),
   role_id integer,
   role_name text) 
AS $$
BEGIN
	RETURN QUERY
	--all footballers with role name
	SELECT f.person_id, f.first_name, f.middle_name, f.nationality, f.data_of_birth, f.place_of_birth, f.height, f.weight, r.role_id, r.role_name
	FROM public.footballers f
	INNER JOIN public.roles r
	ON f.role_id = r.role_id
	WHERE r.role_name LIKE '%' || roleName || '%';	
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_footballers_with_role_name('Left Attac');

--4 Скрипт збереженої процедури на отримання всіх футбольних клубів з їх логотипами 
CREATE OR REPLACE FUNCTION get_all_footballers_clubs_with_logos()
RETURNS TABLE (
    football_club_id integer ,
    football_club_name text ,
    logo_id integer,
	image bytea ,
    image_name text
) 
   
AS $$
BEGIN
	RETURN QUERY
	--select football commands logo
	SELECT   fc.football_club_id, fc.football_club_name,l.logo_id , l.image, l.image_name
	FROM public.logos l
	INNER JOIN public.football_clubs fc
	ON fc.football_club_id = l.club_id;		
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_footballers_clubs_with_logos();

--5 Скрипт збереженої процедури на отримання всіх футбольних клубів за ідентифікатором клубу
CREATE OR REPLACE FUNCTION get_footballers_club_by_id_with_details(clubId integer)
RETURNS TABLE (
    football_club_id integer ,
    football_club_name text ,
	logo_id integer,
	image bytea ,
    image_name text,
	coach_full_name text
)   
AS $$
BEGIN
	RETURN QUERY
	--select comand by id with coaches and logos
	SELECT  fc.football_club_id, fc.football_club_name,l.logo_id,l.image, l.image_name, (c.first_name || ' ' || c.middle_name) as coach_full_name
	FROM public.logos l
	INNER JOIN public.football_clubs fc
	ON fc.football_club_id = l.club_id
	INNER JOIN coaches c
	ON c.club_id = fc.football_club_id
	where fc.football_club_id =clubId;	
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_footballers_club_by_id_with_details(1);

--6 Скрипт збереженої процедури на отримання всіх тренувань за ідентифікатором клубу

CREATE OR REPLACE FUNCTION get_coach_by_id_with_club(coachId integer)
RETURNS TABLE (
   person_id integer,
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   nationality VARCHAR (30),
   data_of_birth date  ,
   place_of_birth VARCHAR (50),
   count_of_victories integer ,
   years_of_expirience integer,
   club_id integer,
   football_club_id integer,
   football_club_name text 
)   
AS $$
BEGIN
	RETURN QUERY
	--select coach with  clubs
	SELECT c.person_id, c.first_name, c.middle_name, c.nationality, 
                c.data_of_birth, c.place_of_birth, c.count_of_victories, 
                c.years_of_expirience,c.club_id,
                fc.football_club_id, fc.football_club_name
                FROM public.coaches c
                INNER JOIN public.football_clubs fc
                ON c.club_id = fc.football_club_id
                WHERE c.person_id = @coachId;	
END
$$ LANGUAGE plpgsql;


--7 Скрипт збереженої процедури на отримання всіх спонсорів за ідентифікатором клубу

CREATE OR REPLACE FUNCTION get_all_sponsores_by_club_id(clubId integer)
RETURNS TABLE (
   person_id integer, 
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   natinality VARCHAR (30),
   data_of_birth date  ,
   place_of_birth VARCHAR (50),
   sponsorship_kind VARCHAR(30) ,
   sponsorship_sum money 
)   
AS $$
BEGIN
	RETURN QUERY
	--select sponsores for current club
	SELECT s.person_id, s.first_name, s.middle_name, s.nationality, s.data_of_birth, s.place_of_birth, s.sponsorship_kind, s.sponsorship_sum
	FROM public.sponsores s 
	INNER JOIN public.sponsores_clubs fcs
	ON fcs.sponsor_id = s.person_id
	WHERE fcs.club_id = clubId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_sponsores_by_club_id(1);

--8 Скрипт збереженої процедури на отримання всіх сезонів за ідентифікатором клубу

CREATE OR REPLACE FUNCTION get_all_seasones_by_club_id(сlubid integer)
RETURNS TABLE (
   season_id integer,
   league_name text
)   
AS $$
BEGIN
	RETURN QUERY
	--select seasones with team
	SELECT s.season_id, s.league_name
	FROM public.seasones s 
	INNER JOIN public.football_clubs_seasones fcs
	ON fcs.season_id = s.season_id 
	WHERE fcs.club_id = сlubid;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_seasones_by_club_id(1);

--9 Скрипт збереженої процедури на отримання всіх тренувань за ідентифікатором клубу

CREATE OR REPLACE FUNCTION get_all_trainings_by_coach_id(coachId integer)
RETURNS TABLE (
   training_id integer,
   training_data date,
   first_name VARCHAR(50),
   middle_name VARCHAR(50),
   stadium_id integer
)   
AS $$
BEGIN
	RETURN QUERY
	--select traings for current tranner
	SELECT t.training_id, t.training_data, c.first_name, c.middle_name, t.stadium_id
	FROM organization.trainings t
	INNER JOIN public.coaches c 
	ON c.person_id = t.coach_id
	WHERE c.person_id = coachId;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_trainings_by_coach_id(1);

--10 Скрипт збереженої процедури на отримання всіх стадіонів з адресами за ідентифікатором 

CREATE OR REPLACE FUNCTION get_stadium_by_stadium_Id_with_address(stadiumId integer)
RETURNS TABLE (
   stadium_id integer,
   stadium_name text,
   capacity INT  ,
   year_of_build varchar(4),
   surface   VARCHAR (40),
   address_id  INT  ,
   street_address VARCHAR (40) ,
   postal_code    VARCHAR(12),
   city           VARCHAR(30),
   country        VARCHAR(30) ,
   state_province VARCHAR(25)
)   
AS $$
BEGIN
	RETURN QUERY
	--select * stadium with thir addresses
	SELECT s.stadium_id, s.stadium_name, s.capacity, s.year_of_build, s.surface,a.address_id,
	a.street_address, a.postal_code, a.city, a.country, a.state_province
	FROM organization.stadiums s
	INNER JOIN organization.addresses a
	ON a.address_id = s.address_id
	WHERE s.stadium_id = stadiumId;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_stadium_by_stadium_Id_with_address(1);

--11 Скрипт збереженої процедури на отримання всіх матчів з стадіонами 
CREATE OR REPLACE FUNCTION get_all_matches_with_stadiums()
RETURNS TABLE (
   match_id integer,
   match_name  text ,
   ticket_price money,
   match_date date ,
   stadium_id integer,
   stadium_name text
)   
AS $$
BEGIN
	RETURN QUERY

	SELECT m.match_id, m.match_name, m.ticket_price, m.match_date, s.stadium_id, s.stadium_name
	FROM organization.matches m
	INNER JOIN organization.stadiums s
	ON s.stadium_id = m.stadium_id;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_matches_with_stadiums();

--12 Скрипт збереженої процедури на отримання всіх матчів за ідентифікатором 
CREATE OR REPLACE FUNCTION get_matches_by_match_id_with_details(matchId integer)
RETURNS TABLE (
   match_id integer,
   match_name  text ,
   ticket_price money,
   match_date date ,
   stadium_id integer,
   stadium_name text,
   capacity INT  ,
   year_of_build varchar(4),
   surface   VARCHAR (40)
)   
AS $$
BEGIN
	RETURN QUERY
	--select all mathes 
	SELECT m.match_id, m.match_name, m.ticket_price, m.match_date, s.stadium_id, s.stadium_name, s.capacity, s.year_of_build, s.surface
	FROM organization.matches m
	INNER JOIN organization.stadiums s
	ON s.stadium_id = m.stadium_id
	WHERE m.match_id = matchId;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_matches_by_match_id_with_details(1);

--13 Скрипт збереженої процедури на отримання всіх наступних матчів
CREATE OR REPLACE FUNCTION get_next_matches()
RETURNS TABLE (
   match_id integer,
   match_name  text ,
   ticket_price money,
   match_date date ,
   stadium_id integer,
   stadium_name text,
   capacity INT  ,
   year_of_build varchar(4),
   surface   VARCHAR (40)
)   
AS $$
BEGIN
	RETURN QUERY
	--select preciding mathes 
	SELECT m.match_id, m.match_name, m.ticket_price, m.match_date, s.stadium_id, s.stadium_name, s.capacity, s.year_of_build, s.surface
	FROM organization.matches m
	INNER JOIN organization.stadiums s
	ON s.stadium_id = m.stadium_id
	WHERE m.match_date >=  current_date;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_next_matches();

--14 Скрипт збереженої процедури на отримання всіх результатів за ідентифікатором матчу
CREATE OR REPLACE FUNCTION get_football_results_by_match_id(matchId integer)
RETURNS TABLE (
   result_id integer,
   score_id  integer,
   scored_goals integer,
   missed_goals integer,
   card_id integer,
   red_card_count integer,
   yellow_card_count integer,
   match_id integer,
   footballer_id integer
	
)   
AS $$
BEGIN
	RETURN QUERY
	--select all football_results for current match 
	SELECT fr.result_id,   fr.score_id, s.scored_goales, s.missed_goales, fr.card_id,
	c.red_card_count, c.yellow_card_count,fr.match_id,fr.footballer_id
	FROM analytics.football_results fr
	INNER JOIN analytics.cards c
	ON c.card_id = fr.card_id
	INNER JOIN analytics.scores s
	ON s.score_id = fr.score_id
	WHERE fr.match_id = matchId;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_football_results_by_match_id(1); 

--15 Скрипт збереженої процедури на отримання всіх тренувань за ідентифікатором гравця відсортованих за певною колонкою 
CREATE OR REPLACE FUNCTION get_all_football_results_by_player_id_order_by(playerId integer, orderBy text default 'scored_goales' )
RETURNS TABLE (
   result_id integer,
   scored_goales integer,
   missed_goales integer,
   red_card_count integer,
   yellow_card_count integer,
   match_name text
)   
AS $$
BEGIN
	RETURN QUERY
	--select all football_result for particular player in matches with order by  
	SELECT fr.result_id,  s.scored_goales, s.missed_goales,
	c.red_card_count, c.yellow_card_count, m.match_name
	FROM analytics.football_results fr
	INNER JOIN analytics.cards c
	ON c.card_id = fr.card_id
	INNER JOIN analytics.scores s
	ON s.score_id = fr.score_id
	INNER JOIN  organization.matches m
	ON fr.match_id = m.match_id
	WHERE fr.footballer_id = playerId
	ORDER BY   orderby  DESC;
END
$$ LANGUAGE plpgsql;

--16 Скрипт збереженої процедури на отримання всіх тренувань за ідентифікатором гравця та матча 
CREATE OR REPLACE FUNCTION get_all_football_results_by_player_id_and_match_id(playerId integer, matchId integer)
RETURNS TABLE (
   result_id integer,
   scored_goales integer,
   missed_goales integer,
   red_card_count integer,
   yellow_card_count integer,
   match_name text
)   
AS $$
BEGIN
	RETURN QUERY
	--select all football_result for particular player in current match
	SELECT fr.result_id,  s.scored_goales, s.missed_goales,
	c.red_card_count, c.yellow_card_count, m.match_name
	FROM analytics.football_results fr
	INNER JOIN analytics.cards c
	ON c.card_id = fr.card_id
	INNER JOIN analytics.scores s
	ON s.score_id = fr.score_id
	INNER JOIN  organization.matches m
	ON fr.match_id = m.match_id
	WHERE fr.footballer_id = playerId AND fr.match_id =matchId;
	END
$$ LANGUAGE plpgsql;
SELECT * FROM  get_all_football_results_by_player_id_and_match_id(1,4);

--17 Скрипт збереженої процедури на отримання всіх клубів за ідентифікатором гравця 
CREATE OR REPLACE FUNCTION get_all_football_clubs_by_player_id(playerId integer)
RETURNS SETOF football_clubs
AS $$
BEGIN
	RETURN QUERY
	--select * footballer clubs for particular player
	SELECT football_club_id, football_club_name
	FROM public.football_clubs c
	INNER JOIN public.footballer_clubs fc
	ON fc.club_id = c.football_club_id
	WHERE fc.player_id =playerId;
END
$$ LANGUAGE plpgsql;
SELECT * FROM  get_all_football_clubs_by_player_id(1);

--18 Скрипт збереженої процедури на отримання всіх спонсоорів за ідентифікатором спонсора 
CREATE OR REPLACE FUNCTION get_sponore_by_id(sponsoreId integer)
RETURNS TABLE
(
   person_id integer,
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   nationality VARCHAR (30),
   data_of_birth date  ,
   place_of_birth VARCHAR (50),
   sponsorship_kind VARCHAR(30) ,
   sponsorship_sum money 

) 
AS $$
BEGIN
	RETURN QUERY
	--select particaular sponsore information
	SELECT s.person_id, s.first_name, s.middle_name, s.nationality, s.data_of_birth, s.place_of_birth, s.sponsorship_kind, s.sponsorship_sum
	FROM public.sponsores s
	WHERE s.person_id = sponsoreId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM  get_sponore_by_id(1);


--19 Скрипт збереженої процедури на отримання всіх споснорів за ідентифікатором клубу --
CREATE OR REPLACE FUNCTION get_all_sponores_by_club_id(clubId integer)
RETURNS TABLE
(
   person_id integer,
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   nationality VARCHAR (30),
   data_of_birth date  ,
   place_of_birth VARCHAR (50),
   sponsorship_kind VARCHAR(30) ,
   sponsorship_sum money 

) 
AS $$
BEGIN
	RETURN QUERY
	--select all sponsores for curetn team
	SELECT s.person_id, s.first_name, s.middle_name, s.nationality, s.data_of_birth, s.place_of_birth, s.sponsorship_kind, s.sponsorship_sum
	FROM public.sponsores s
	INNER JOIN public.sponsores_clubs sc
	ON sc.sponsor_id = s.person_id
	WHERE sc.club_id =clubId;
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_sponores_by_club_id(1);

--20 Скрипт збереженої процедури на отримання всіх футболістів за ім’ям, прізвищем та національністю гравця 

CREATE OR REPLACE FUNCTION get_all_footballers_by_name_surname_nationality(footballerName text,
surname  text ,
footballerNationality text)
RETURNS TABLE
(
   person_id integer,
   first_name VARCHAR (50),
   middle_name VARCHAR (50),
   nationality VARCHAR (30),
   data_of_birth date,
   place_of_birth VARCHAR (50),
   height decimal (6,3),
   weight decimal (6,3) 

) 
AS $$
BEGIN
	RETURN QUERY
	--filtering footballist by name, surname, nationality
	SELECT f.person_id, f.first_name, f.middle_name, f.nationality, f.data_of_birth, f.place_of_birth, f.height, f.weight
	FROM public.footballers f
	WHERE f.first_name like '%'||footballerName||'%' AND f.middle_name like '%'||surname||'%'  AND f.nationality like '%'||footballerNationality||'%' ;	

END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_footballers_by_name_surname_nationality('A', 'B','');

--21 Скрипт збереженої процедури  для додавання даних футболіста
CREATE FUNCTION insert_footballer(_firstName text, _middleName text, _nationality text, _dataOfBirth date, _placeOfBirth text, _height numeric(5,2), _weight numeric(5,2), _roleId int)
RETURNS void AS
  $BODY$
    BEGIN
        INSERT INTO public.footballers (first_name,
 middle_name,
 nationality, 
data_of_birth, 
place_of_birth, 
height, 
weight, 
role_id)
	VALUES (_firstName, _middleName, _nationality, _dataOfBirth,  _placeOfBirth, _height, _weight, _roleId);
	END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE
  COST 100;


--22 Скрипт збереженої процедури  для оновлення даних футболіста
CREATE OR REPLACE FUNCTION update_footballer
    (_person_id int, 
	 _firstName text, 
	 _middleName text,
	 _nationality text, 
	 _dataOfBirth date,
	 _placeOfBirth text,
	 _height numeric(5,2),
	 _weight numeric(5,2),
	 _roleId int
) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$

BEGIN
    UPDATE public.footballers f
       SET first_name     = COALESCE(_firstName,f.first_name),
           middle_name         = COALESCE(_middleName,f.middle_name),
           nationality       = COALESCE(_nationality, f.nationality),
           data_of_birth       = COALESCE(_dataOfBirth, f.data_of_birth),
           place_of_birth     =  COALESCE(_placeOfBirth, f.place_of_birth),
			height  =  COALESCE(_height, f.height),
	       weight =  COALESCE(_weight, f.weight),
	       role_id =  COALESCE(_roleId, f.role_id)
     WHERE f.person_id = _person_id;
    RETURN FOUND;
END;
$$;

