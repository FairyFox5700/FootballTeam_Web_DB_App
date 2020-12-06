using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Sponsor:Person
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [ForeignKey(nameof(PersonId))]

        public string SponsorshipKind { get; set; }
        public decimal SponsorshipSum { get; set; }
        public  ICollection<SponsoresClubs> SponsoresClubs { get; set; }
    }
}
