using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

namespace FootballProject.Dal.Impl.Repositories
{
    public class SponsoresRepository:ISponsoresRepository<int>
    {
        private string _connectionString;

        public SponsoresRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<IEnumerable<Sponsor>> GetSponsoresByClubId(int clubId)
        {
            var query = @"EXEC public.get_all_sponsores_by_club_id @clubId  = @ClubId";
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<Sponsor>(
                query,
                param: new
                {
                    ClubId=clubId
                });
        }

        public async Task<Sponsor> GetSponsorById(int sponsorId)
        {
            var query = @"EXEC public.get_sponore_by_id @sponsoreId = @SponsorId";
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Sponsor>(
                query,
                param: new
                {
                    SponsorId= sponsorId
                });
            return result.FirstOrDefault();
        }
    }
}