using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/footballersResults")]
    public class FootballersResultController : ControllerBase
    {
        private readonly IFootballersResultRepository<int> _footballersResultRepository;

        public FootballersResultController(IFootballersResultRepository<int> footballersResultRepository)
        {
            _footballersResultRepository = footballersResultRepository;
        }
        
        //GET api/footballersResults/match/{matchId}
        [HttpGet]
        [Route("match/{matchId}")]
        public async Task<IEnumerable<FootballResultsResponse>> GetFootballResultsByMatchId([FromRoute]int matchId)
        {
            return await _footballersResultRepository.GetFootballResultsByMatchId(matchId);
        }
        //GET api/footballersResults/player/?player={playerId}&orderBy={orderBy}
        [HttpGet]
        [Route("player")]
        public async Task<IEnumerable<FootballResultsResponse>> GetFootballerResultsByPlayersIdOrderedBy([FromQuery]int playerId, [FromQuery]string orderBy)
        {
            return await _footballersResultRepository.GetFootballerResultsByPlayersIdOrderedBy(playerId,orderBy);
        }
    }

}