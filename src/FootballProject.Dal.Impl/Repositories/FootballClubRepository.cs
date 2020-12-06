using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class FootballClubRepository:IFootballerClubsRepository<int>
    {
        private string _connectionString;

        public FootballClubRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<FootballClub>> GetFootballClubsWithLogos()
        {
            var query = "get_all_footballers_clubs_with_logos";
            var footballClubsDictionary = new Dictionary<int, FootballClub>();
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var result = await connection.QueryAsync<FootballClub,Logo, FootballClub>(
                query ,
                map: (fc, l) =>
                {
                FootballClub footballClub;
                if (!footballClubsDictionary.TryGetValue(fc.FootballClubId, out footballClub))
                {
                    footballClub = fc;
                    fc.Logos = new List<Logo>();
                    footballClubsDictionary.Add(fc.FootballClubId, footballClub);
                }
                footballClub.Logos.Add(l);
                return footballClub;
            },
                splitOn:"logo_id",
                commandType:CommandType.StoredProcedure,
                commandTimeout:900);
            return result
                .Distinct();;
        }

        public async Task<FootballClub> GetFootballClubsById(int clubId)
        {
            var query = "get_footballers_club_by_id_with_details";
            var footballClubsDictionary = new Dictionary<int, FootballClub>();

            await using var connection =  new NpgsqlConnection(_connectionString);
                connection.Open();
                var result =  await connection.QueryAsync<FootballClub, Logo, FootballClub>(
                    query,
                    map: (fc, l) =>
                    {
                        FootballClub footballClub;
                        if (!footballClubsDictionary.TryGetValue(fc.FootballClubId, out footballClub))
                        {
                            footballClub = fc;
                            fc.Logos = new List<Logo>();
                            footballClubsDictionary.Add(fc.FootballClubId, footballClub);
                        }

                        footballClub.Logos.Add(l);
                        return footballClub;
                    },
                    param: new
                    {
                        clubid = clubId
                    },
                    splitOn:"logo_id",
                    commandType:CommandType.StoredProcedure,
                    commandTimeout:900);
                return result.Distinct().FirstOrDefault();
        }

        public async Task<IEnumerable<FootballClub>> GetFootballClubsByPlayerId(int playerId)
        {
            var query = @"get_all_football_clubs_by_player_id";
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<FootballClub>(
                query,
                param: new
                {
                    playerid = playerId
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
                );
        }
    }
}