using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface ISeasonesRepository<in TKey> where TKey: struct
    {

        Task<IEnumerable<Season>> GetSeasonesByClubsId(TKey clubId);
        Task<Season> GetSeasonById(TKey id);
    }
}