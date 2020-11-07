using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class FootballClub
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FootballClubId { get; set; }
        public string FootballClubName { get; set; }

        public ICollection<FootballClubsSeasones> FootballClubsSeasones { get; set; }
        public ICollection<Logo> Logos { get; set; }
        public ICollection<SponsoresClubs> SponsoresClubs { get; set; }
    }
}
