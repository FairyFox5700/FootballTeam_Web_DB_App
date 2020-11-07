using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public  class Seasones
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SeasonId { get; set; }
        public string LeagueName { get; set; }

        public ICollection<FootballClubsSeasones> FootballClubsSeasones { get; set; }
    }
}
