namespace FootballProject.Models.Responses
{
    public class FootballResultsResponse
    {
        public int ResultId { get; set; }
        public int ScoreId { get; set; }
        public int ScoredGoals { get; set; }
        public int MissedGoals { get; set; }
        public int? CardId { get; set; }
        public int RedCardCount { get; set; }
        public int YellowCardCount { get; set; }
        public int MatchId { get; set; }
        public int FootballerId { get; set; }
    }
}