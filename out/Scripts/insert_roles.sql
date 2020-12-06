ALTER TABLE public.roles DISABLE TRIGGER ALL;
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (1, 'Goalkeeper');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (2, 'Right Backr');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (3, 'Left Back');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (4, 'Centre Back');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (5, 'Centre Back');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (6, 'Central Defensive/Holding Midfielder');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (7, 'Right Attacking Midfielders/Wingers');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (8, 'Central/Box-to-Box Midfielder');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (9, 'Striker');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (10, 'Attacking Midfielder/Playmaker');
INSERT INTO public.roles(
	role_id, role_name)
	VALUES (11, 'Left Attacking Midfielders/Wingers');

SELECT * FROM ROLES;
ALTER TABLE public.roles ENABLE TRIGGER ALL;