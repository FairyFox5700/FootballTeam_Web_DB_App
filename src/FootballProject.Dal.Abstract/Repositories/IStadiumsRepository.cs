using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IStadiumsRepository<in TKey> where TKey: struct
    {
        public Task<Stadium> GetStadiumByIdWithAddresses(TKey stadiumId);
    }
}