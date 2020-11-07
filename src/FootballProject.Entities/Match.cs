using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Match
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MatchId { get; set; }
        public string MatchName { get; set; }
        public decimal TicketPrice { get; set; }
        public DateTime MatchDate { get; set; }
        [ForeignKey(nameof(StadiumId))]
        public int StadiumId { get; set; }

        public Stadium Stadium { get; set; }
        public ICollection<FootballResults> FootballResults { get; set; }
    }
}
