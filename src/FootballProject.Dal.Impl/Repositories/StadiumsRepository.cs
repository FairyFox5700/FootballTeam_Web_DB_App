using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class StadiumsRepository:IStadiumsRepository<int>
    {
        private string _connectionString;

        public StadiumsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString();
        }
   
        public async Task<Stadium> GetStadiumByIdWithAddresses(int stadiumId)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"public.get_stadium_by_stadium_Id_with_address";
            var results = await connection.QueryAsync<Stadium,Address,Stadium>(query,
                (s, a) =>
                {
                    s.Address = a;
                    return s;
                },
                splitOn:"address_id",
                param: new
                {
                    stadiumid= stadiumId,
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results.FirstOrDefault();
        }
    }
}