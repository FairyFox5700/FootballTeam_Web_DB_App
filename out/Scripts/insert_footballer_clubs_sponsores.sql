ALTER TABLE public.sponsores_clubs DISABLE TRIGGER ALL;
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (1, 1, 1);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (2, 1, 2);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (3, 1, 2);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (4, 2, 1);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (5, 2, 2);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (6, 2, 3);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (7, 3, 1);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (8, 3, 4);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (9, 4, 5);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (10, 4, 6);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (11, 5, 7);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (12, 5, 8);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (13, 6, 9);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (14, 6, 10);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (15, 7, 11);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (16, 8, 12);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (17, 8, 13);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (18, 8, 14);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (19, 8, 15);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (20, 9, 16);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (21, 10, 17);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (22, 11, 18);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (23, 12, 19);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (24, 13, 20);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (25, 13, 21);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (26, 12, 22);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (27, 11, 23);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (28, 9, 25);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (29, 10, 1);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (30, 11, 8);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (31, 12, 9);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (32, 13, 2);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (33, 13, 1);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (34, 12, 2);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (35, 11, 3);
INSERT INTO public.sponsores_clubs( sponsor_club_id, club_id, sponsor_id) VALUES (36, 1, 24);
select * from public.sponsores_clubs;
ALTER TABLE public.sponsores_clubs ENABLE TRIGGER ALL;