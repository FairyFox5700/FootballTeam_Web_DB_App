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

        public Cards Card { get; set; }
        public Footballers Footballer { get; set; }
        public Matches Match { get; set; }
        public Scores Score { get; set; }
        
       
    }
}
