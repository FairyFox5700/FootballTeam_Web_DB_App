using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;
using FootballProject.Entities.Requests;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface IRoleRepository<in TKey> where TKey: struct
    {
        Task<IEnumerable<FootballerByRoleCountModel>>GetFootballersCountByRoleName(string roleName);
    }
}