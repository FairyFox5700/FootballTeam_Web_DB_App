using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface ISponsoresRepository<in TKey> where TKey: struct
    {

        Task<IEnumerable<Sponsor>> GetSponsoresById(int sponsorId);
        Task<Sponsor> GetSponsorById(int sponsorId);
         
    }
}