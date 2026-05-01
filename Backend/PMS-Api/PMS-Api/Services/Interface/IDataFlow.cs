using PMS_Api.DtoModels;

namespace PMS_Api.Services.Interface
{
    public interface IDataFlow
    {
        Task<RespModel> Login(string Username, string Password);
        Task<RespModel> AddUserDel(AddUserDto userDto,HttpContext context);
        Task<RespModel> RemoveUser(List<RemoveUserDto> removeUsers);
        Task<RespModel> AddSkills(List<SkillsDto> SkillsDto);

        Task<RespModel> AddProjectSkills(int ProjectId, List<ProjectSkillDto> SkillsDto);
        Task<RespModel> AddSkillsToUser(int UserId, List<ProjectSkillDto> SkillsDto);
        Task<RespModel> AddProject(ProjectDto userDto, HttpContext context);
        Task<RespModel> ProjectMemersAssign(int ProjectId, List<ProjectSkillDto> SkillsDto);

        Task<RespModel> AutoAllocateProjMem(int ProjectId, HttpContext context)
    }
}
