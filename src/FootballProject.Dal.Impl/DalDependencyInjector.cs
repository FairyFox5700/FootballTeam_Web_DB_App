using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Dal.Impl.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace FootballProject.Dal.Impl
{
    public static class DalDependencyInjector
    {
        public static void Install(IServiceCollection services)
        {
            services.AddTransient<ICoachRepository<int>, CoachRepository>();
            services.AddTransient<IFootballerClubsRepository<int>, FootballClubRepository>();
            services.AddTransient<IFootballerRepository<int>, FootballerRepository>();
            services.AddTransient<IFootballersResultRepository<int>, FootballerResultsRepository>();
            services.AddTransient<IMatchesRepository<int>, MachRepository>();
            services.AddTransient<IRoleRepository<int>, RoleRepository>();
            services.AddTransient<ISeasonesRepository<int>, SeasonsRepository>();
            services.AddTransient<ISponsoresRepository<int>, SponsoresRepository>();
            services.AddTransient<IStadiumsRepository<int>,StadiumsRepository>();
            services.AddTransient<ITrainingRepository<int>, TrainingRepository>();
        }
    }
}