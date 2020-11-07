using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Logos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LogoId { get; set; }
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
        [ForeignKey(nameof(ClubId))]
        public int ClubId { get; set; }

        public FootballClubs Club { get; set; }
    }
}
