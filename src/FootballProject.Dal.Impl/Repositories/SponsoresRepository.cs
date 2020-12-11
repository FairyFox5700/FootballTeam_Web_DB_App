using System.Collections.Generic;
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
    public class SponsoresRepository:ISponsoresRepository<int>
    {
        private string _connectionString;

        public SponsoresRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString();
        }
        public async Task<IEnumerable<Sponsor>> GetSponsoresByClubId(int clubId)
        {
            var query = @"public.get_all_sponsores_by_club_id";
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<Sponsor>(
                query,
                param: new
                {
                    clubid=clubId
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900);
        }

        //TODO handle error
        public async Task<Sponsor> GetSponsorById(int sponsorId)
        {
            var query = @"public.get_sponore_by_id";
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Sponsor>(
                query,
                param: new
                {
                    sponsoreid= sponsorId
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900);
            return result?.FirstOrDefault();
        }
    }
}