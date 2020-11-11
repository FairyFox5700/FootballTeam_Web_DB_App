using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IMatchesRepository<in TKey> where TKey: struct
    {
        public Task<IEnumerable<Match>> GetAllMatches();
        Task<Match> GetMatchByMatchId(int matchId);
        Task<IEnumerable<Match>> GetNextMatches();
    }
}