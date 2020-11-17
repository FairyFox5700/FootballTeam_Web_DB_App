using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Coach:Person
    {
       // [Key]
       // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
       // [ForeignKey(nameof(PersonId))]
        //public int PersonId { get; set; }
       // public string FirstName { get; set; }
       // public string MiddleName { get; set; }
       // public string Nationality { get; set; }
        //public DateTime DataOfBirth { get; set; }
        //public string PlaceOfBirth { get; set; }
        public int CountOfVictories { get; set; }
        public int YearsOfExpirience { get; set; }
        [ForeignKey(nameof(ClubId))]
        public int ClubId { get; set; }
        public  ICollection<FootballClub> FootballClubs  { get; set; }
        public ICollection<Training> Trainings { get; set; }
    }
}
