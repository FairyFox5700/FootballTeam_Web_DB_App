using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/trainings")]
    public class TrainingController : ControllerBase
    {
        private readonly ITrainingRepository<int> _trainingRepository;

        public TrainingController(ITrainingRepository<int> trainingRepository)
        {
            _trainingRepository = trainingRepository;
        }

        //GET api/trainings/coach/{coachId}
        [HttpGet]
        [Route("coach/{coachId}")]
        public async Task<IEnumerable<Training>>  GetAllTrainingByCoachId([FromRoute]int coachId)
        {
            return await _trainingRepository.GetAllTrainingByCoachId(coachId);
        }
        
        //GET api/trainings/{trainingId}
        [HttpGet]
        [Route("{trainingId}")]
        public async Task<Training>  GetTrainingByTrainingId(int trainingId)
        {
            return await _trainingRepository.GetTrainingByTrainingId(trainingId);
        }
    }
}