ALTER TABLE organization.trainings  DISABLE TRIGGER ALL;
set datestyle = mdy;
select count(1) from coaches;
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (1, '5/7/2018', 3, 1);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (2, '9/23/2019', 42, 2);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (3, '3/5/2017', 32, 3);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (4, '8/27/2020', 35, 11);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (5, '11/7/2019', 31, 6);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (6, '4/5/2017', 38, 8);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (7, '2/18/2018', 10, 3);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (8, '7/7/2018', 49, 4);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (9, '7/17/2020', 43, 3);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (10, '3/23/2019', 48, 2);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (11, '12/28/2017', 16, 2);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (12, '10/12/2017', 25, 4);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (13, '1/18/2018', 35, 3);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (14, '5/6/2020', 26, 9);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (15, '11/6/2016', 34, 3);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (16, '7/2/2019', 36, 4);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (17, '11/11/2019', 48, 22);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (18, '6/18/2017', 35, 23);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (19, '9/17/2019', 22, 23);
--insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (20, '5/4/2018', 6, 24);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (21, '9/13/2018', 32, 22);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (22, '3/4/2017', 41, 20);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (23, '3/25/2020', 36, 21);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (24, '3/12/2017', 41, 17);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (25, '3/31/2020', 34, 19);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (26, '1/1/2018', 38, 19);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (27, '1/9/2020', 4, 18);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (28, '7/5/2018', 21, 19);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (29, '4/14/2018', 1, 17);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (30, '4/22/2020', 13, 16);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (31, '12/25/2017', 15, 14);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (32, '5/26/2017', 17, 15);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (33, '6/1/2020', 49, 13);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (34, '7/18/2019', 35, 12);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (35, '11/26/2017', 47, 11);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (36, '8/8/2018', 46, 10);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (37, '7/18/2018', 15, 9);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (38, '7/22/2020', 13, 8);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (39, '7/2/2018', 31, 7);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (40, '4/8/2017', 31, 6);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (41, '5/2/2019', 44, 5);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (42, '8/26/2019', 16, 4);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (43, '2/3/2018', 36, 3);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (44, '12/29/2017', 21, 2);
insert into organization.trainings (training_id, training_data, stadium_id, coach_id) values (45, '2/28/2020', 42, 1);
select * from organization.trainings;
ALTER TABLE organization.trainings  ENABLE TRIGGER ALL;

