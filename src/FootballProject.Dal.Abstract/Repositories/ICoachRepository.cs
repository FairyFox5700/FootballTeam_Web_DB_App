using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;
using FootballProject.Models.Responses;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface ICoachRepository<in TKey> where TKey : struct
    {
        Task<IEnumerable<Coach>> GetCoachesWithClubsById(TKey coachId);
    }
}