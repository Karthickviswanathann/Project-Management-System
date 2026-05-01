using System.ComponentModel.DataAnnotations;

namespace PMS_Api.DtoModels
{
    public class AddUserDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Role { get; set; }
    }
    public class UserMasterDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
    }

    public class RemoveUserDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }

    }
}
