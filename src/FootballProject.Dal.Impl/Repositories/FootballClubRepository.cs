using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

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
            var query = @"EXEC public.get_all_footballers_clubs_with_logos";
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var footballClubsDictionary = new Dictionary<int, FootballClub>();
            return await connection.QueryAsync<FootballClub, Logo, FootballClub>(
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
                splitOn: "FootballClubId"
            );
        }

  
        //TODO return coach name
        public async Task<IEnumerable<FootballClub>> GetFootballClubsById(int clubId)
        {
            var query = @"EXEC public.get_footballers_club_by_id_with_details @clubId = @ClubId";
            var footballClubsDictionary = new Dictionary<int, FootballClub>();

            await using var connection = new SqlConnection(_connectionString);
                connection.Open();
                return await connection.QueryAsync<FootballClub, Logo, FootballClub>(
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
                        ClubId = clubId
                    },
                    splitOn: "FootballClubId"
                );
        }

        public async Task<IEnumerable<FootballClub>> GetFootballClubsByPlayerId(int playerId)
        {
            var query = @"EXEC public.get_all_football_clubs_by_player_id @playerId= @PlayerId";
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            return await connection.QueryAsync<FootballClub>(
                query,
                param: new
                {
                    PlayerId = playerId
                });
        }
    }
}