using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class FootballClubsSeasones
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FootballClubsSeasonId { get; set; }
        [ForeignKey(nameof(ClubId))]
        public int? ClubId { get; set; }
        [ForeignKey(nameof(SeasonId))]
        public int SeasonId { get; set; }
        
        public FootballClubs Club { get; set; }
        public Seasones Season { get; set; }
    }
}
