﻿using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/coaches")]
    public class CoachController : ControllerBase
    {
        private readonly ICoachRepository<int> _coachRepository;

        public CoachController(ICoachRepository<int> coachRepository)
        {
            _coachRepository = coachRepository;
        }

        //GET api/coaches?coachId={coachId}
        [HttpGet]
        public async Task<IEnumerable<Coach>> GetAllCoachesById(int coachId)
        {
            return await _coachRepository.GetCoachesWithClubsById(coachId);
        }
    }
}