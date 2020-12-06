ALTER TABLE public.football_clubs DISABLE TRIGGER ALL;
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (1, 'Orlando City SC');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (2, 'Rochester Rhinos');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (3, 'Richmond Kickers');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (4, 'New York Red Bulls');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (5, 'Louisville City FC');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (6, 'Sacramento Republic');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (7, 'Charleston Battery');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (8, 'Real Monarchs');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (9, 'FC Cincinnati');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (10, 'Phoenix Rising FC');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (11, 'Penn FC');
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (12, 'Wilmington Hammerheads');	
INSERT INTO public.football_clubs(
	football_club_id, football_club_name)
	VALUES (13, 'Sporting Kansas City');
	
ALTER TABLE public.football_clubs ENABLE TRIGGER ALL;
