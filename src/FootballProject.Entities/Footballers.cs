using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Footballers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [ForeignKey(nameof(PersonId))]
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Nationality { get; set; }
        public DateTime DataOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        [ForeignKey(nameof(RoleId))]
        public int? RoleId { get; set; }

        public Roles Role { get; set; }
        public ICollection<FootballResults> FootballResults { get; set; }
    }
}
