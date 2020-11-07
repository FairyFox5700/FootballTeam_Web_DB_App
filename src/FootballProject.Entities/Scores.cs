using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Scores
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ScoreId { get; set; }
        public int ScoredGoals { get; set; }
        public int MissedGoals { get; set; }

        public FootballResults FootballResults { get; set; }
    }
}
