using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
    }
}