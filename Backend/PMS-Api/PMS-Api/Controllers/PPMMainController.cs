using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS_Api.DtoModels;
using PMS_Api.Services.Interface;

namespace PMS_Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PPMMainController : ControllerBase
    {
        private readonly IDataFlow _Flow;
        public PPMMainController(IDataFlow Flow)
        {
            _Flow=Flow;
        }

        /*--Authentication----*/

        [HttpPost("PM_AddUser")]
        public async Task<IActionResult> AddUser(AddUserDto userDto)
        {
            var res = await _Flow.AddUserDel(userDto, HttpContext);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }


        [HttpPost("PM_RemoveUser")]

        public async Task<IActionResult> RemoveUser(List<RemoveUserDto> removeUser)
        {
            var res = await _Flow.RemoveUser(removeUser);
            if (res.resStatus == "PM400")
            {
                return BadRequest(res);
            }

            return Ok(res);

        }

        [AllowAnonymous]
        [HttpPost("PM_Login")]

        public async Task<IActionResult>Login(string Username,string Password)
        {
           var res=await _Flow.Login(Username, Password);
            if(res.resStatus == "PM400")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }


        /*-------------------Skills/Projects ------------*/


        [HttpPost("PM_AddSkills")]

        public async Task<IActionResult> AddSkills(List<SkillsDto> skilsDtos)
        {
            var res = await _Flow.AddSkills(skilsDtos);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }

        [HttpPost("PM_AddProjectSkills")]

        public async Task<IActionResult> AddProjectSkills(int ProjectId,List<ProjectSkillDto> skilsDtos)
        {
            var res = await _Flow.AddProjectSkills(ProjectId, skilsDtos);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }


        [HttpPost("PM_AddSkillsToUser")]

        public async Task<IActionResult> AddSkillsToUser(int UserID,List<ProjectSkillDto> skilsDtos)
        {
            var res = await _Flow.AddSkillsToUser(UserID, skilsDtos);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }

        [HttpPost("PM_AddProject")]

        public async Task<IActionResult> AddProject(ProjectDto userDto)
        {
            var res = await _Flow.AddProject(userDto,HttpContext);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }

        [HttpPost("PM_AddProjectMemers")]

        public async Task<IActionResult> AddProjectMemers(int ProjectId, List<ProjectSkillDto> SkillsDto)
        {
            var res = await _Flow.ProjectMemersAssign(ProjectId, SkillsDto);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }


        [HttpPost("PM_AutoAllocateProjMem")]

        public async Task<IActionResult> PM_AutoAllocateProjMem(int ProjectId, List<ProjectSkillDto> SkillsDto)
        {
            var res = await _Flow.AutoAllocateProjMem(ProjectId, HttpContext);
            if (res.resStatus == "PM200")
            {
                return BadRequest(res);
            }

            return Ok(res);
        }


    }
}
