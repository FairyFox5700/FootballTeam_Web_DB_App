using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Cards
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CardId { get; set; }
        public int RedCardCount { get; set; }
        public int YellowCardCount { get; set; }
        public FootballResults FootballResults { get; set; }
    }
}
