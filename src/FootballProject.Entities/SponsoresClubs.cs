using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class SponsoresClubs
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SponsorClubId { get; set; }
        [ForeignKey(nameof(ClubId))]
        public int ClubId { get; set; }
        [ForeignKey(nameof(SponsorId))]
        public int SponsorId { get; set; }

        public FootballClub Club { get; set; }
        public  Sponsor Sponsor { get; set; }
    }
}
