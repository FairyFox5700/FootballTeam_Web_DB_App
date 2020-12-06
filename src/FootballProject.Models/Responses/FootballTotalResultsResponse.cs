using System;
using FootballProject.Entities;

namespace FootballProject.Models.Responses
{
    public abstract class FootballTotalResultsResponse
    {
        public  int RedCardTotalCount { get; set; }
        public  int YellowCardTotalCount { get; set; }
        public  int ScoredGoalsTotalCount { get; set; }
        public  int MissedGoalsTotalCount { get; set; }
    }

    public class TotalResultsForMatch:FootballTotalResultsResponse
    {
        public  int MatchId { get; set; }
        public  string MatchName { get; set; }
    }

    public class TotalResultsForFootballer:FootballTotalResultsResponse
    {
        public  int PlayerId { get; set; }
        public  string FirstName { get; set; }
        public  string MiddleName { get; set; }
    }

}