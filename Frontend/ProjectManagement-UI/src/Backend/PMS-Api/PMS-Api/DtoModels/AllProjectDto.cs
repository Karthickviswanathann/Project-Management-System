using Microsoft.AspNetCore.Http.HttpResults;
using System.Xml.Linq;

namespace PMS_Api.DtoModels
{
    public class SkillsDto
    {
        public string Name { get; set; }
    }
    public class ProjectSkillDto
    {
        public int Id { get; set; }
    }

    public class ProjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string EstimatedHours { get; set; }
        public string Deadline { get; set; }
        public string CreatedBy { get; set; }
    }
}
