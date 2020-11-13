using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/sponsores")]
    public class SponsoresController:ControllerBase
    {
        private readonly ISponsoresRepository<int> _sponsoresRepository;

        public SponsoresController(ISponsoresRepository<int> sponsoresRepository)
        {
            _sponsoresRepository = sponsoresRepository;
        }
        
        //GET api/sponsores?clubId={clubId}
        [HttpGet]
        [Route("clubId={clubId}")]
        public async  Task<IEnumerable<Sponsor>>  GetSponsoresByClubId(int clubId)
        {
            return await _sponsoresRepository.GetSponsoresByClubId(clubId);
        }
        
        //GET api/sponsores?sponsorId={sponsorId}
        [HttpGet]
        [Route("sponsorId={sponsorId}")]
        public async  Task<Sponsor>  GetSponsorById(int sponsorId)
        {
            return await _sponsoresRepository.GetSponsorById(sponsorId);
        }
    }
}