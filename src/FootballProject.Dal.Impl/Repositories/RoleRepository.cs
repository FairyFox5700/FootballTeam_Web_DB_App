using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class RoleRepository:IRoleRepository<int>
    {
        private string _connectionString;

        public RoleRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<FootballerByRoleCountModel>> GetFootballersCountByRoleName(string roleName)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<FootballerByRoleCountModel>(
                @"public.count_footballers_by_role_name",
                param:
                new { rolename = roleName },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            var dictionary = new Dictionary<int, Role>();
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            var result =  connection.QueryAsync<Role, Footballer, Role>(
                @"SELECT  r.role_id, r.role_name,
                    p.person_id, p.first_name, p.middle_name, 
                    p.nationality, p.data_of_birth, p.place_of_birth,
                    p.height, p.weight, p.role_id
	                    FROM public.roles  r INNER JOIN public.footballers p
	                    ON p.role_id = r.role_id;",
                map:(r,f) =>
                {
                    if (!dictionary.TryGetValue(r.RoleId, out var role))
                    {
                        role = r;
                        role.Footballers = new List<Footballer>();
                        dictionary.Add(role.RoleId, role);
                    }
                    role.Footballers.Add(f);
                    return role;
                },
                splitOn:"person_id"
            ).Result
                .Distinct();
            return result;
        }
    }
}