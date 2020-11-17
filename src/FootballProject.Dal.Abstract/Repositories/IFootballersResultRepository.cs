using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;
using FootballProject.Models.Responses;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IFootballersResultRepository<in TKey> where TKey: struct
    {
        Task<IEnumerable<FootballResultsResponse>> GetFootballResultsByMatchId(TKey matchId);
        Task<IEnumerable<FootballResultsResponse>> GetFootballerResultsByPlayersIdOrderedBy(TKey playerId, string orderBy);
    }
}