using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.AspNetCore.Mvc;


namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/footballClub")]
    public class FootballClubController : ControllerBase
    {
        private readonly IFootballerClubsRepository<int> _footballerClubsRepository;

        public FootballClubController(IFootballerClubsRepository<int> footballerClubsRepository)
        {
            _footballerClubsRepository = footballerClubsRepository;
        }

        //GET api/footballClub
        [HttpGet]
        public async Task<IEnumerable<FootballClub>> GetFootballClubsWithLogos()
        {
            return await _footballerClubsRepository.GetFootballClubsWithLogos();
        }


        //GET api/footballClub/{footballerClubId}
        [HttpGet]
        [Route("{footballerClubId}")]
        public async Task<FootballClub> GetFootballClubsById([FromRoute]int footballerClubId)
        {
            return await _footballerClubsRepository.GetFootballClubsById(footballerClubId);
        }

        //GET api/footballClub/player/{playerId}
        [HttpGet]
        [Route("player/{playerId}")]
        public async Task<IEnumerable<FootballClub>> GetFootballClubsWithLogos([FromRoute]int playerId)
        {
            return await _footballerClubsRepository.GetFootballClubsByPlayerId(playerId);
        }
    }
}