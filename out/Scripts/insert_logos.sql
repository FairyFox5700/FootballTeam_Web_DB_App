ALTER TABLE public.logos DISABLE TRIGGER ALL;
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (1, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Orlando_City_2012.svg/300px-Orlando_City_2012.svg.png'), '300px-Orlando_City_2012.svg.png', 1);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (2, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/7/74/2016_logo_of_the_Rochester_Rhinos.png/354px-2016_logo_of_the_Rochester_Rhinos.png'), 
			'354px-2016_logo_of_the_Rochester_Rhinos.png', 2);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (3, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Richmond_Kickers_Logo.svg/330px-Richmond_Kickers_Logo.svg.png'), '330px-Richmond_Kickers_Logo.svg.png', 3);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (4, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/3/31/New_York_Red_Bulls_II_crest.svg/330px-New_York_Red_Bulls_II_crest.svg.png'), ' 330px-New_York_Red_Bulls_II_crest.svg.png', 4);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (5, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Louisville_City_FC_logo.svg/330px-Louisville_City_FC_logo.svg.png'), '330px-Louisville_City_FC_logo.svg.png', 5);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (6, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Sacramento_Republic_FC.svg/270px-Sacramento_Republic_FC.svg.png'), '270px-Sacramento_Republic_FC.svg.png',6);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (7, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Charleston_Battery_%282020%29_logo.svg/330px-Charleston_Battery_%282020%29_logo.svg.png'), '330px-Charleston_Battery_(2020)_logo.svg.png', 7);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (8, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Real_Monarchs_logo.svg/270px-Real_Monarchs_logo.svg.png'), '270px-Real_Monarchs_logo.svg.png', 8);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (9, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/0/06/FC_Cincinnati_blue_on_orange_shield.svg/225px-FC_Cincinnati_blue_on_orange_shield.svg.png'), '225px-FC_Cincinnati_blue_on_orange_shield.svg.png', 9);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (10, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Phoenix_Rising_FC_logo.svg/225px-Phoenix_Rising_FC_logo.svg.png'), '225px-Phoenix_Rising_FC_logo.svg.png', 10);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (11, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Penn_FC_crest.svg/270px-Penn_FC_crest.svg.png'), '270px-Penn_FC_crest.svg.png', 11);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (12, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Wilmington_Hammerheads_2014.svg/300px-Wilmington_Hammerheads_2014.svg.png'), '300px-Wilmington_Hammerheads_2014.svg.png', 12);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (13, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Sporting_Kansas_City_II_logo.svg/270px-Sporting_Kansas_City_II_logo.svg.png'), '270px-Sporting_Kansas_City_II_logo.svg.png', 13);
INSERT INTO public.logos(
	logo_id, image, image_name, club_id)
	VALUES (14, bytea('https://upload.wikimedia.org/wikipedia/en/thumb/1/18/LA_Galaxy_II_logo.svg/255px-LA_Galaxy_II_logo.svg.png'), '255px-LA_Galaxy_II_logo.svg.png', 1);

ALTER TABLE public.logos ENABLE TRIGGER ALL;