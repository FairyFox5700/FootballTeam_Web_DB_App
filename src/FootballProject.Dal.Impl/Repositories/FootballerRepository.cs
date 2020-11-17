using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;
using  Dapper;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class FootballerRepository : IFootballerRepository<int>
    {
        private string _connectionString;

        public FootballerRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Footballer>> GetFootballers()
        {
            var sql = @"SELECT person_id, first_name, middle_name, 
                      nationality, data_of_birth, place_of_birth, height, weight
                    FROM public.footballers;";
            await using var connection =  new NpgsqlConnection(_connectionString);
                connection.Open();
                var result = await connection.QueryAsync<Footballer>(sql);
                return result;
        }

        public async Task<IEnumerable<Footballer>> GetFootballersWithRoles()
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "get_all_footballers_with_roles";
            var results = await connection.QueryAsync<Footballer, Role, Footballer>(query,
                (f, r) =>
                {
                    f.Role = r;
                    return f;
                },
                splitOn: "role_id",
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results;
        }

        public async Task<IEnumerable<Footballer>> GetFootballersByRoleName(string role)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
                await connection.OpenAsync();
                var query = @"get_all_footballers_with_role_name";
                var results = await connection.QueryAsync<Footballer, Role, Footballer>(query,
                    (f, r) =>
                    {
                        f.Role = r;
                        return f;
                    },
                    splitOn: "role_id",
                    param: new
                    {
                        rolename = role,
                    },
                    commandType:CommandType.StoredProcedure,
                    commandTimeout:900
                );
                return results;
        }

        //TODO refactor not working why??
        public async Task<IEnumerable<Footballer>> GetFootballersByNameSurnameNationality(string name = "", 
            string surname = "", string nationality = "")
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<Footballer>(
                "public.get_all_footballers_by_name_surname_nationality",
                new { footballername = name??"",   surname = surname??"", footballernationality  = nationality??"" },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
        }
    

        public async Task<Footballer> GetFootballerById(int footballerId)
        {
            var sql = @"SELECT person_id, first_name, middle_name, nationality,
                      data_of_birth, place_of_birth, height, weight
                      FROM public.footballers
                      WHERE person_id= @footballerId;";
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Footballer>(sql, 
                new { footballerid = footballerId });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Footballer>> GetFootballersOrdered(string search, 
            bool @ascending = true)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<Footballer>(
                @"public.get_all_footballers_order_by_parameter",
                new { orderbykey = search, orderascdesc= ascending?"ASC":"DESC" },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
        }
    }
}