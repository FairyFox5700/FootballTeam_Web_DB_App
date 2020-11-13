using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IFootballerClubsRepository<in TKey> where TKey: struct
    {
        Task<IEnumerable<FootballClub>> GetFootballClubsWithLogos();
        Task<FootballClub>  GetFootballClubsById(TKey clubId);
        Task<IEnumerable<FootballClub>> GetFootballClubsByPlayerId(TKey playerId);
    }
}