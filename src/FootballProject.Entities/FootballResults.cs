using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class FootballResults
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResultId { get; set; }
        
        [ForeignKey(nameof(ScoreId))]
        public int ScoreId { get; set; }
        [ForeignKey(nameof(CardId))]
        public int? CardId { get; set; }
        [ForeignKey(nameof(MatchId))]
        public int MatchId { get; set; }
        [ForeignKey(nameof(FootballerId))]
        public int FootballerId { get; set; }

        public Card Card { get; set; }
        public Footballer Footballer { get; set; }
        public Match Match { get; set; }
        public Score Score { get; set; }
        
       
    }
}
