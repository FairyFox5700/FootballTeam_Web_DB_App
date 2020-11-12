
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

--3
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
   role_name text) 
AS $$
BEGIN
	RETURN QUERY
	--all footballers with role name
	SELECT f.person_id, f.first_name, f.middle_name, f.nationality, f.data_of_birth, f.place_of_birth, f.height, f.weight, r.role_name
	FROM public.footballers f
	INNER JOIN public.roles r
	ON f.role_id = r.role_id
	WHERE r.role_name LIKE '%' || roleName || '%';	
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_footballers_with_role_name('Left Attac');

--4

CREATE OR REPLACE FUNCTION get_all_footballers_clubs_with_logos()
RETURNS TABLE (
    football_club_id integer ,
    football_club_name text ,
	image bytea ,
    image_name text
) 
   
AS $$
BEGIN
	RETURN QUERY
	--select football commands logo
	SELECT   fc.football_club_id, fc.football_club_name,l.image, l.image_name
	FROM public.logos l
	INNER JOIN public.football_clubs fc
	ON fc.football_club_id = l.club_id;		
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_footballers_clubs_with_logos();

--5
CREATE OR REPLACE FUNCTION get_footballers_club_by_id_with_details(clubId integer)
RETURNS TABLE (
    football_club_id integer ,
    football_club_name text ,
	image bytea ,
    image_name text,
	coach_full_name text
)   
AS $$
BEGIN
	RETURN QUERY
	--select comand by id with coaches and logos
	SELECT  fc.football_club_id, fc.football_club_name,l.image, l.image_name, (c.first_name || ' ' || c.middle_name) as coach_full_name
	FROM public.logos l
	INNER JOIN public.football_clubs fc
	ON fc.football_club_id = l.club_id
	INNER JOIN coaches c
	ON c.club_id = fc.football_club_id
	where fc.football_club_id =clubId;	
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_footballers_club_by_id_with_details(1);

--6
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
   football_club_name text 
)   
AS $$
BEGIN
	RETURN QUERY
	--select coach with  clubs
	SELECT c.person_id, c.first_name, c.middle_name, c.nationality, c.data_of_birth, c.place_of_birth, c.count_of_victories, c.years_of_expirience, fc.football_club_name
	FROM public.coaches c
	INNER JOIN public.football_clubs fc
	ON c.club_id = fc.football_club_id
	WHERE c.person_id = coachId;	
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_coach_by_id_with_club(1);

--7
CREATE OR REPLACE FUNCTION get_all_sponsores_by_club_id(clubId integer)
RETURNS TABLE (
   person_id integer,
   first_name VARCHAR (50), get_all_seasones_by_club_id

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
	--select sponsores for current club
	SELECT s.person_id, s.first_name, s.middle_name, s.nationality, s.data_of_birth, s.place_of_birth, s.sponsorship_kind, s.sponsorship_sum
	FROM public.sponsores s 
	INNER JOIN public.sponsores_clubs fcs
	ON fcs.sponsor_id = s.person_id
	WHERE fcs.club_id = clubId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_sponsores_by_club_id(1);

--8
CREATE OR REPLACE FUNCTION get_all_seasones_by_club_id(clubId integer)
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
	WHERE fcs.club_id = clubId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_seasones_by_club_id(1);

--9
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

--10
CREATE OR REPLACE FUNCTION get_training_by_training_Id_with_detailes(trainingId integer)
RETURNS TABLE (
   training_id integer,
   training_data date,
   stadium_id integer,
   stadium_name text,
   capacity INT  ,
   year_of_build varchar(4),
   surface   VARCHAR (40),
   street_address VARCHAR (40) ,
   postal_code    VARCHAR(12),
   city           VARCHAR(30),
   country        VARCHAR(30) ,
   state_province VARCHAR(25)
)   
AS $$
BEGIN
	RETURN QUERY
	--select particular training with stadium info
	SELECT t.training_id, t.training_data, s.stadium_id, s.stadium_name, s.capacity, s.year_of_build, s.surface,
	a.street_address, a.postal_code, a.city, a.country, a.state_province
	FROM organization.trainings t
	INNER JOIN organization.stadiums s
	ON s.stadium_id = t.stadium_id
	INNER JOIN organization.addresses a
	ON a.address_id = s.address_id
	WHERE t.training_id = trainingId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_training_by_training_Id_with_detailes(1);


--11
CREATE OR REPLACE FUNCTION get_stadium_by_stadium_Id_with_address(stadiumId integer)
RETURNS TABLE (
   stadium_id integer,
   stadium_name text,
   capacity INT  ,
   year_of_build varchar(4),
   surface   VARCHAR (40),
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
	SELECT s.stadium_id, s.stadium_name, s.capacity, s.year_of_build, s.surface,
	a.street_address, a.postal_code, a.city, a.country, a.state_province
	FROM organization.stadiums s
	INNER JOIN organization.addresses a
	ON a.address_id = s.address_id
	WHERE s.stadium_id = stadiumId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_stadium_by_stadium_Id_with_address(1);

--12
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
	--select all mathes 
	SELECT m.match_id, m.match_name, m.ticket_price, m.match_date, s.stadium_id, s.stadium_name
	FROM organization.matches m
	INNER JOIN organization.stadiums s
	ON s.stadium_id = m.stadium_id;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_matches_with_stadiums();

--13
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

--14
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

--15
CREATE OR REPLACE FUNCTION get_football_results_by_match_id(matchId integer)
RETURNS TABLE (
   result_id integer,
   footballer_id integer,
   scored_goales integer,
   missed_goales integer,
   red_card_count integer,
   yellow_card_count integer	
)   
AS $$
BEGIN
	RETURN QUERY
	--select all football_results for current match 
	SELECT fr.result_id,  fr.footballer_id, s.scored_goales, s.missed_goales,
	c.red_card_count, c.yellow_card_count
	FROM analytics.football_results fr
	INNER JOIN analytics.cards c
	ON c.card_id = fr.card_id
	INNER JOIN analytics.scores s
	ON s.score_id = fr.score_id
	WHERE fr.match_id = matchId;
END
$$ LANGUAGE plpgsql;


SELECT * FROM get_football_results_by_match_id(1);

--16
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


SELECT * FROM get_all_football_results_by_player_id_order_by(1);

--17
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
16
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

--18
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

--19
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

--20
CREATE OR REPLACE FUNCTION get_all_footballers_by_name_surname_nationality(_footballerName text default '',
																		  _surname  text default '',
																		  _nationality text default '')
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
	WHERE f.first_name like '%'||_footballerName||'%' AND f.middle_name like '%'||_surname||'%'  AND f.nationality like '%'||_nationality||'%' ;	

END
$$ LANGUAGE plpgsql;


SELECT * FROM get_all_footballers_by_name_surname_nationality('A', 'B');

--21
CREATE OR REPLACE FUNCTION get_all_footballers_order_by_parameter(_orderbyKey text, _order_asc_desc text = 'ASC')
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
 	IF upper(_order_asc_desc) IN ('ASC', 'DESC') THEN
      -- proceed
   	ELSE
      RAISE EXCEPTION 'Unexpected value for parameter _order_asc_desc.
                       Allowed: ASC, DESC. Default: ASC';
   	END IF;
	RETURN QUERY EXECUTE format(
     'SELECT f.person_id, f.first_name, f.middle_name, f.nationality, f.data_of_birth, f.place_of_birth, f.height, f.weight
		FROM public.footballers f
      	ORDER  BY %I %s'
		,_orderbyKey , _order_asc_desc);
END
$$ LANGUAGE plpgsql;
SELECT * FROM get_all_footballers_order_by_parameter('first_name', 'asc');
