using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

namespace FootballProject.Dal.Impl.Repositories
{
    public class StadiumsRepository:IStadiumsRepository<int>
    {
        private string _connectionString;

        public StadiumsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
   
        public async Task<Stadium> GetStadiumByIdWithAddresses(int stadiumId)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_stadium_by_stadium_Id_with_address @stadiumId = @StadiumId";
            var results = await connection.QueryAsync<Stadium,Address,Stadium>(query,
                (s, a) =>
                {
                    s.Address = a;
                    return s;
                },
                splitOn: "StadiumId",
                param: new
                {
                    StadiumId= stadiumId,
                }
            );
            return results.FirstOrDefault();
        }
    }
}