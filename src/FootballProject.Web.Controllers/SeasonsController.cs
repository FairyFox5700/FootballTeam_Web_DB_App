using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/seasons")]
    public class SeasonsController:ControllerBase
    {
        private readonly ISeasonesRepository<int> _seasonesRepository;

        public SeasonsController(ISeasonesRepository<int> seasonesRepository)
        {
            _seasonesRepository = seasonesRepository;
        }
        
        //GET api/seasons/club/{clubId}
        [HttpGet]
        [Route("club/{clubId}")]
        public async  Task<IEnumerable<Season>>  GetSeasonesByClubsId([FromRoute]int clubId)
        {
            return await _seasonesRepository.GetSeasonesByClubsId(clubId);
        }
        
        //TODO catch error
        //GET api/seasons/{seasonId}
        [HttpGet]
        [Route("{seasonId}")]
        public async  Task<Season>   GetSeasonById(int seasonId)
        {
            return await _seasonesRepository.GetSeasonById(seasonId);
        }
    }
}