using FootballProject.Entities;
using Microsoft.EntityFrameworkCore;

namespace FootballProject.Dal.Impl
{
    public class FootballTeamContext : DbContext
    {
        public FootballTeamContext()
        {
        }

        public FootballTeamContext(DbContextOptions<FootballTeamContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Addresses> Addresses { get; set; }
        public virtual DbSet<Cards> Cards { get; set; }
        public virtual DbSet<Coaches> Coaches { get; set; }
        public virtual DbSet<FootballClubs> FootballClubs { get; set; }
        public virtual DbSet<FootballClubsSeasones> FootballClubsSeasones { get; set; }
        public virtual DbSet<FootballResults> FootballResults { get; set; }
        public virtual DbSet<FootballerClubs> FootballerClubs { get; set; }
        public virtual DbSet<Footballers> Footballers { get; set; }
        public virtual DbSet<Logos> Logos { get; set; }
        public virtual DbSet<Matches> Matches { get; set; }
        public virtual DbSet<Persons> Persons { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Scores> Scores { get; set; }
        public virtual DbSet<Seasones> Seasones { get; set; }
        public virtual DbSet<Sponsores> Sponsores { get; set; }
        public virtual DbSet<SponsoresClubs> SponsoresClubs { get; set; }
        public virtual DbSet<Stadiums> Stadiums { get; set; }
        public virtual DbSet<Trainings> Trainings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=football_team;Username=postgres;Password=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Addresses>(entity =>
            {
                entity.HasKey(e => e.AddressId)
                    .HasName("pk_addresses");

                entity.ToTable("addresses", "organization");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasColumnName("city")
                    .HasMaxLength(30);

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasColumnName("country")
                    .HasMaxLength(30);

                entity.Property(e => e.PostalCode)
                    .IsRequired()
                    .HasColumnName("postal_code")
                    .HasMaxLength(12);

                entity.Property(e => e.StateProvince)
                    .HasColumnName("state_province")
                    .HasMaxLength(25);

                entity.Property(e => e.StreetAddress)
                    .IsRequired()
                    .HasColumnName("street_address")
                    .HasMaxLength(40);
            });

            modelBuilder.Entity<Cards>(entity =>
            {
                entity.HasKey(e => e.CardId)
                    .HasName("pk_cards");

                entity.ToTable("cards", "analytics");

                entity.Property(e => e.CardId).HasColumnName("card_id");

                entity.Property(e => e.RedCardCount).HasColumnName("red_card_count");

                entity.Property(e => e.YellowCardCount).HasColumnName("yellow_card_count");
            });

            modelBuilder.Entity<Coaches>(entity =>
            {
                entity.HasKey(e => e.PersonId)
                    .HasName("pk_coaches");

                entity.ToTable("coaches");

                entity.Property(e => e.PersonId)
                    .HasColumnName("person_id")
                    .HasDefaultValueSql("nextval('persons_person_id_seq'::regclass)");

                entity.Property(e => e.ClubId).HasColumnName("club_id");

                entity.Property(e => e.CountOfVictories).HasColumnName("count_of_victories");

                entity.Property(e => e.DataOfBirth)
                    .HasColumnName("data_of_birth")
                    .HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50);

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasColumnName("middle_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Nationality)
                    .IsRequired()
                    .HasColumnName("natinality")
                    .HasMaxLength(30);

                entity.Property(e => e.PlaceOfBirth)
                    .IsRequired()
                    .HasColumnName("place_of_birth")
                    .HasMaxLength(50);

                entity.Property(e => e.YearsOfExpirience).HasColumnName("years_of_expirience");
            });

            modelBuilder.Entity<FootballClubs>(entity =>
            {
                entity.HasKey(e => e.FootballClubId)
                    .HasName("pk_football_club");

                entity.ToTable("football_clubs");

                entity.Property(e => e.FootballClubId).HasColumnName("football_club_id");

                entity.Property(e => e.FootballClubName).HasColumnName("football_club_name");
            });

            modelBuilder.Entity<FootballClubsSeasones>(entity =>
            {
                entity.HasKey(e => e.FootballClubsSeasonId)
                    .HasName("pk_football_clubs_seasones");

                entity.ToTable("football_clubs_seasones");

                entity.Property(e => e.FootballClubsSeasonId).HasColumnName("football_clubs_season_id");

                entity.Property(e => e.ClubId).HasColumnName("club_id");

                entity.Property(e => e.SeasonId).HasColumnName("season_id");

                entity.HasOne(d => d.Club)
                    .WithMany(p => p.FootballClubsSeasones)
                    .HasForeignKey(d => d.ClubId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_football_clubs_seasones_club_club_id");

                entity.HasOne(d => d.Season)
                    .WithMany(p => p.FootballClubsSeasones)
                    .HasForeignKey(d => d.SeasonId)
                    .HasConstraintName("fk_football_clubs_seasones_seasones_season_id");
            });

            modelBuilder.Entity<FootballResults>(entity =>
            {
                entity.HasKey(e => e.ResultId)
                    .HasName("pk_football_results");

                entity.ToTable("football_results", "analytics");

                entity.HasIndex(e => e.CardId)
                    .HasName("fk_football_results_cards_unique_card_id")
                    .IsUnique();

                entity.HasIndex(e => e.ScoreId)
                    .HasName("fk_football_results_scores_unique_score_id")
                    .IsUnique();

                entity.HasIndex(e => new { e.MatchId, e.FootballerId })
                    .HasName("match_fatballer_unigue_pair")
                    .IsUnique();

                entity.Property(e => e.ResultId).HasColumnName("result_id");

                entity.Property(e => e.CardId).HasColumnName("card_id");

                entity.Property(e => e.FootballerId).HasColumnName("footballer_id");

                entity.Property(e => e.MatchId).HasColumnName("match_id");

                entity.Property(e => e.ScoreId).HasColumnName("score_id");

                entity.HasOne(d => d.Card)
                    .WithOne(p => p.FootballResults)
                    .HasForeignKey<FootballResults>(d => d.CardId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_football_results_cards_card_id");

                entity.HasOne(d => d.Footballer)
                    .WithMany(p => p.FootballResults)
                    .HasForeignKey(d => d.FootballerId)
                    .HasConstraintName("fk_football_results_footballers_footballer_id");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.FootballResults)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("fk_football_results_matches_match_id");

                entity.HasOne(d => d.Score)
                    .WithOne(p => p.FootballResults)
                    .HasForeignKey<FootballResults>(d => d.ScoreId)
                    .HasConstraintName("fk_football_results_scores_score_id");
            });

            modelBuilder.Entity<FootballerClubs>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("footballer_clubs");

                entity.Property(e => e.ClubId).HasColumnName("club_id");

                entity.Property(e => e.DataOfBirth)
                    .HasColumnName("data_of_birth")
                    .HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50);

                entity.Property(e => e.FootballerClubId)
                    .HasColumnName("footballer_club_id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.FootballerClubName)
                    .IsRequired()
                    .HasColumnName("footballer_club_name");

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasColumnName("middle_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Natinality)
                    .IsRequired()
                    .HasColumnName("natinality")
                    .HasMaxLength(30);

                entity.Property(e => e.PersonId)
                    .HasColumnName("person_id")
                    .HasDefaultValueSql("nextval('persons_person_id_seq'::regclass)");

                entity.Property(e => e.PlaceOfBirth)
                    .IsRequired()
                    .HasColumnName("place_of_birth")
                    .HasMaxLength(50);

                entity.Property(e => e.PlayerId).HasColumnName("player_id");

                entity.HasOne(d => d.Club)
                    .WithMany()
                    .HasForeignKey(d => d.ClubId)
                    .HasConstraintName("fk_footballer_clubs_football_clubs_club_id");

                entity.HasOne(d => d.Player)
                    .WithMany()
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("fk_footballer_clubs_footballers_player_id");
            });

            modelBuilder.Entity<Footballers>(entity =>
            {
                entity.HasKey(e => e.PersonId)
                    .HasName("pk_footballers");

                entity.ToTable("footballers");

                entity.Property(e => e.PersonId)
                    .HasColumnName("person_id")
                    .HasDefaultValueSql("nextval('persons_person_id_seq'::regclass)");

                entity.Property(e => e.DataOfBirth)
                    .HasColumnName("data_of_birth")
                    .HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Height)
                    .HasColumnName("height")
                    .HasColumnType("numeric(6,3)");

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasColumnName("middle_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Nationality)
                    .IsRequired()
                    .HasColumnName("natinality")
                    .HasMaxLength(30);

                entity.Property(e => e.PlaceOfBirth)
                    .IsRequired()
                    .HasColumnName("place_of_birth")
                    .HasMaxLength(50);

                entity.Property(e => e.RoleId)
                    .HasColumnName("role_id")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Weight)
                    .HasColumnName("weight")
                    .HasColumnType("numeric(6,3)");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Footballers)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_footballers_roles_role_id");
            });

            modelBuilder.Entity<Logos>(entity =>
            {
                entity.HasKey(e => e.LogoId)
                    .HasName("pk_logos");

                entity.ToTable("logos");

                entity.Property(e => e.LogoId).HasColumnName("logo_id");

                entity.Property(e => e.ClubId).HasColumnName("club_id");

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasColumnName("image");

                entity.Property(e => e.ImageName)
                    .IsRequired()
                    .HasColumnName("image_name");

                entity.HasOne(d => d.Club)
                    .WithMany(p => p.Logos)
                    .HasForeignKey(d => d.ClubId)
                    .HasConstraintName("fk_logos_football_clubs_club_id");
            });

            modelBuilder.Entity<Matches>(entity =>
            {
                entity.HasKey(e => e.MatchId)
                    .HasName("pk_matches");

                entity.ToTable("matches", "organization");

                entity.Property(e => e.MatchId).HasColumnName("match_id");

                entity.Property(e => e.MatchDate)
                    .HasColumnName("match_date")
                    .HasColumnType("date")
                    .HasDefaultValueSql("CURRENT_DATE");

                entity.Property(e => e.MatchName)
                    .IsRequired()
                    .HasColumnName("match_name");

                entity.Property(e => e.StadiumId).HasColumnName("stadium_id");

                entity.Property(e => e.TicketPrice)
                    .HasColumnName("ticket_price")
                    .HasColumnType("money");

                entity.HasOne(d => d.Stadium)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.StadiumId)
                    .HasConstraintName("fk_matches_satiums_stadium_id");
            });

            modelBuilder.Entity<Persons>(entity =>
            {
                entity.HasKey(e => e.PersonId)
                    .HasName("pk_persons");

                entity.ToTable("persons");

                entity.Property(e => e.PersonId).HasColumnName("person_id");

                entity.Property(e => e.DataOfBirth)
                    .HasColumnName("data_of_birth")
                    .HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50);

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasColumnName("middle_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Nationality)
                    .IsRequired()
                    .HasColumnName("natinality")
                    .HasMaxLength(30);

                entity.Property(e => e.PlaceOfBirth)
                    .IsRequired()
                    .HasColumnName("place_of_birth")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("pk_roles");

                entity.ToTable("roles");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<Scores>(entity =>
            {
                entity.HasKey(e => e.ScoreId)
                    .HasName("pk_scores");

                entity.ToTable("scores", "analytics");

                entity.Property(e => e.ScoreId).HasColumnName("score_id");

                entity.Property(e => e.MissedGoals).HasColumnName("missed_goales");

                entity.Property(e => e.ScoredGoals).HasColumnName("scored_goales");
            });

            modelBuilder.Entity<Seasones>(entity =>
            {
                entity.HasKey(e => e.SeasonId)
                    .HasName("pk_seasones");

                entity.ToTable("seasones");

                entity.Property(e => e.SeasonId).HasColumnName("season_id");

                entity.Property(e => e.LeagueName)
                    .IsRequired()
                    .HasColumnName("league_name");
            });

            modelBuilder.Entity<Sponsores>(entity =>
            {
                entity.HasKey(e => e.PersonId)
                    .HasName("pk_sponsores");

                entity.ToTable("sponsores");

                entity.Property(e => e.PersonId)
                    .HasColumnName("person_id")
                    .HasDefaultValueSql("nextval('persons_person_id_seq'::regclass)");

                entity.Property(e => e.DataOfBirth)
                    .HasColumnName("data_of_birth")
                    .HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(50);

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasColumnName("middle_name")
                    .HasMaxLength(50);

                entity.Property(e => e.Nationality)
                    .IsRequired()
                    .HasColumnName("natinality")
                    .HasMaxLength(30);

                entity.Property(e => e.PlaceOfBirth)
                    .IsRequired()
                    .HasColumnName("place_of_birth")
                    .HasMaxLength(50);

                entity.Property(e => e.SponsorshipKind)
                    .IsRequired()
                    .HasColumnName("sponsorship_kind")
                    .HasMaxLength(30);

                entity.Property(e => e.SponsorshipSum)
                    .HasColumnName("sponsorship_sum")
                    .HasColumnType("money");
            });

            modelBuilder.Entity<SponsoresClubs>(entity =>
            {
                entity.HasKey(e => e.SponsorClubId)
                    .HasName("pk_sponsor_club");

                entity.ToTable("sponsores_clubs");

                entity.Property(e => e.SponsorClubId).HasColumnName("sponsor_club_id");

                entity.Property(e => e.ClubId).HasColumnName("club_id");

                entity.Property(e => e.SponsorId).HasColumnName("sponsor_id");

                entity.HasOne(d => d.Club)
                    .WithMany(p => p.SponsoresClubs)
                    .HasForeignKey(d => d.ClubId)
                    .HasConstraintName("fk_sponsores_clubs_clubs_club_id");

                entity.HasOne(d => d.Sponsor)
                    .WithMany(p => p.SponsoresClubs)
                    .HasForeignKey(d => d.SponsorId)
                    .HasConstraintName("fk_sponsores_clubs_sponseres_sponsor_id");
            });

            modelBuilder.Entity<Stadiums>(entity =>
            {
                entity.HasKey(e => e.StadiumId)
                    .HasName("pk_stadiums");

                entity.ToTable("stadiums", "organization");

                entity.HasIndex(e => e.AddressId)
                    .HasName("fk_stadiums_addresses_unique_address_id")
                    .IsUnique();

                entity.Property(e => e.StadiumId).HasColumnName("stadium_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.StadiumName)
                    .IsRequired()
                    .HasColumnName("stadium_name");

                entity.Property(e => e.Surface)
                    .IsRequired()
                    .HasColumnName("surface")
                    .HasMaxLength(40);

                entity.Property(e => e.YearOfBuild)
                    .HasColumnName("year_of_build")
                    .HasMaxLength(4)
                    .HasDefaultValueSql("date_part('year'::text, CURRENT_DATE)");

                entity.HasOne(d => d.Address)
                    .WithOne(p => p.Stadiums)
                    .HasForeignKey<Stadiums>(d => d.AddressId)
                    .HasConstraintName("fk_stadiums_addresses_address_id");
            });

            modelBuilder.Entity<Trainings>(entity =>
            {
                entity.HasKey(e => e.TrainingId)
                    .HasName("pk_trainings");

                entity.ToTable("trainings", "organization");

                entity.Property(e => e.TrainingId).HasColumnName("training_id");

                entity.Property(e => e.CoachId).HasColumnName("coach_id");

                entity.Property(e => e.StadiumId).HasColumnName("stadium_id");

                entity.Property(e => e.TrainingData)
                    .HasColumnName("training_data")
                    .HasColumnType("date");

                entity.HasOne(d => d.Coach)
                    .WithMany(p => p.Trainings)
                    .HasForeignKey(d => d.CoachId)
                    .HasConstraintName("fk_trainings_coahes_coach_id");

                entity.HasOne(d => d.Stadium)
                    .WithMany(p => p.Trainings)
                    .HasForeignKey(d => d.StadiumId)
                    .HasConstraintName("fk_trainings_stadiums_stadium_id");
            });
        }
    }
}
