ALTER TABLE analytics.scores DISABLE TRIGGER ALL;
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (1, 6, 2);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (2, 0, 1);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (3, 2, 7);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (4, 3, 1);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (5, 0, 3);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (6, 0, 8);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (7, 6, 5);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (8, 8, 0);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (9, 4, 5);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (10, 9, 0);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (11, 8, 9);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (12, 2, 6);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (13, 3, 9);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (14, 4, 2);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (15, 6, 0);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (16, 8, 1);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (17, 10, 3);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (18, 2, 5);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (19, 2, 2);
insert into analytics.scores (score_id, scored_goales , missed_goales ) values (20, 7, 6);
select * from analytics.scores;
ALTER TABLE analytics.scores ENABLE TRIGGER ALL;