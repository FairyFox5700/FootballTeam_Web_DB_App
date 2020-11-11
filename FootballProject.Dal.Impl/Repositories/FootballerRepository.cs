using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;
using  Dapper;

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
            var sql = "SELECT person_id, first_name, middle_name, nationality, data_of_birth, place_of_birth, height, weight"+
            "FROM public.footballers;";
            await using var connection = new SqlConnection(_connectionString);
                connection.Open();
                var result = await connection.QueryAsync<Footballer>(sql);
                return result;
        }

        public async Task<IEnumerable<Footballer>> GetFootballersWithRoles()
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_all_footballers_with_roles";
            var results = await connection.QueryAsync<Footballer, Role, Footballer>(query,
                (f, r) =>
                {
                    f.Role = r;
                    return f;
                },
                splitOn: "PersonId"
            );
            return results;
        }

        public async Task<IEnumerable<Footballer>> GetFootballersByRoleName(string role)
        {
            await using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();
                var query = @"EXEC public.get_all_footballers_with_role_name @roleName = @RoleName";
                var results = await connection.QueryAsync<Footballer, Role, Footballer>(query,
                    (f, r) =>
                    {
                        f.Role = r;
                        return f;
                    },
                    splitOn: "PersonId",
                    param: new
                    {
                        RoleName= role,
                    }
                );
                return results;
        }

        //TODO refactor
        public async Task<IEnumerable<Footballer>> GetFootballersByNameSurnameNationality(string name = "", string surname = "", string nationality = "")
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<Footballer>(
                @"EXEC public.get_all_footballers_by_name_surname_nationality @_footballerName=@Name, @_surname=@Surname, @_nationality=@Nationality",
                new { Name= name, Surname = surname, Nationality = nationality }
            );
        }

        public async Task<Footballer> GetFootballerById(int footballerId)
        {
            var sql = "SELECT person_id, first_name, middle_name, nationality, data_of_birth, place_of_birth, height, weight " +
                      "FROM public.footballers" +
                      "WHERE UserId= @footballerId;";
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Footballer>(sql, new { Id = footballerId });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Footballer>> GetFootballersOrdered(string search, bool @ascending = true)
        {
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<Footballer>(
                @"EXEC public.get_all_footballers_order_by_parameter @_orderbyKey = @OrderByKey, @_order_asc_desc = @IsAscending",
                new { OrderByKey = search, IsAscending = ascending?"ASC":"DESC" }
            );
        }
    }
}