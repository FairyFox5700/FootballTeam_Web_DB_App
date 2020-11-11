using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IFootballersResultRepository<in TKey> where TKey: struct
    {
        Task<IEnumerable<FootballResults>> GetFootballResultsByMatchId(int matchId);
        Task<IEnumerable<FootballResults>> GetFootballerResultsByPlayersIdOrderedBy(TKey playerId, string orderBy);

    }
}