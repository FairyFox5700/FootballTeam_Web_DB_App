using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class FootballerClubs
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FootballerClubId { get; set; }
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Natinality { get; set; }
        public DateTime DataOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string FootballerClubName { get; set; }
        [ForeignKey(nameof(ClubId))]
        public int ClubId { get; set; }
        [ForeignKey(nameof(PlayerId))]
        public int PlayerId { get; set; }

        public FootballClubs Club { get; set; }
        public Footballers Player { get; set; }
    }
}
