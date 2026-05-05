using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS_Api.DtoModels;
using PMS_Api.Services.Interface;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;

namespace PMS_Api.Services.Implementation
{
    public class DataFlow:IDataFlow
    {
        private readonly IConfiguration _configuration;

        private string connectStr { get; set; }

        private readonly DataAccess _dataAccess;
        public DataFlow(IConfiguration configuration, DataAccess dataAccess)
        {
            _configuration = configuration;
            _dataAccess = dataAccess;
            connectStr = _configuration.GetRequiredSection("ConnectionStrings:DefaultConnection").Value;


        }

        public async Task<RespModel> AddUserDel(AddUserDto userDto,HttpContext context)
        {
            RespModel resp = new RespModel();

            try
            {
                using (SqlConnection connection=new SqlConnection(connectStr))
                {

                    SqlCommand cmd = new SqlCommand("AddUser", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", userDto.Name);
                    cmd.Parameters.AddWithValue("@Email", userDto.Email);
                    cmd.Parameters.AddWithValue("@Password", ConvertMd5(userDto.PasswordHash));
                    cmd.Parameters.AddWithValue("@Role", userDto.Role);
                    cmd.Parameters.AddWithValue("@Status", true);
        
                    connection.Open();
                    cmd.ExecuteNonQuery();

                    resp.resStatus = "PM200";
                    resp.resType = "Succes";
                    resp.resDesc = "User Added Succesfully";

                }


            }
            catch (Exception ex)
            {
                resp.resStatus = "PM400";
                resp.resType = "Error";
                resp.resDesc = ex.Message;

            }
            return resp;

        }


        public async Task<RespModel> RemoveUser(List<RemoveUserDto> removeUsers)
        {
            RespModel resp = new RespModel();

            try
            {
                DataSet dt_REs = new DataSet();

                DataTable dB = new DataTable();

                DataSet dtReq = new DataSet("RemoveUser");

                dB = _dataAccess.ToDataTable(removeUsers);
                dB.TableName = "User";

                dtReq.Tables.Add(dB);

                var xml=dtReq.GetXml();


                var query = $"Exec RemoveUser{xml}";


                if (connectStr != null)
                {
                    dt_REs = _dataAccess.ExecuteDataSet(query, connectStr);
                    var table1 = dt_REs.Tables[0];


                    resp.resType = table1.Rows[0]["respType"].ToString();
                    resp.resStatus = table1.Rows[0]["respCode"].ToString();
                    resp.resDesc = table1.Rows[0]["respDesc"].ToString();

                }

            }
            catch (Exception ex)
            {
                resp.resType="Error";
                resp.resStatus="PM400";
                resp.resDesc=ex.Message;
            }

            return resp;

        }
       


        public async Task<RespModel> Login(string Username, string Password)
        {
            RespModel resp = new RespModel();

            try
            {
                var validUser = GetValidUser(Username, Password);

                if (validUser != null)
                {
                    var token =await GenerateToken(validUser.Result);

                    resp.resStatus = "PM200";
                    resp.resType = "Success";
                    resp.resDesc = "Login Succesfully";
                    resp.Data = token;

                }
            }
            catch (Exception ex)
            {
                resp.resStatus = "PM400";
                resp.resType = "Error";
                resp.resDesc = ex.Message;
            }
            return resp;
        }




        public async Task<RespModel> AddSkills(List<SkillsDto> SkillsDto)
        {
            RespModel resp = new RespModel();

            try
            {
                DataSet dt_REs = new DataSet();

                DataTable dB = new DataTable();

                DataSet dtReq = new DataSet("Skills");

                dB = _dataAccess.ToDataTable(SkillsDto);
                dB.TableName = "Skill";

                dtReq.Tables.Add(dB);

                var xml = dtReq.GetXml();


                var query = $"Exec PM_AddSkills{xml}";


                if (connectStr != null)
                {
                    dt_REs = _dataAccess.ExecuteDataSet(query, connectStr);
                    var table1 = dt_REs.Tables[0];


                    resp.resType = table1.Rows[0]["respType"].ToString();
                    resp.resStatus = table1.Rows[0]["respCode"].ToString();
                    resp.resDesc = table1.Rows[0]["respDesc"].ToString();

                }

            }
            catch (Exception ex)
            {
                resp.resType = "Error";
                resp.resStatus = "PM400";
                resp.resDesc = ex.Message;
            }

            return resp;

        }
        public async Task<RespModel> AddProjectSkills(int ProjectId,List<ProjectSkillDto> SkillsDto)
        {
            RespModel resp = new RespModel();

            try
            {
                DataSet dt_REs = new DataSet();

                DataTable dB = new DataTable();

                DataSet dtReq = new DataSet("ProjectSkills");

                dB = _dataAccess.ToDataTable(SkillsDto);
                dB.TableName = "Skill";

                dtReq.Tables.Add(dB);

                var xml = dtReq.GetXml();


                var query = $"Exec PM_ADDProjectSkills{ProjectId},{xml}";


                if (connectStr != null)
                {
                    dt_REs = _dataAccess.ExecuteDataSet(query, connectStr);
                    var table1 = dt_REs.Tables[0];


                    resp.resType = table1.Rows[0]["respType"].ToString();
                    resp.resStatus = table1.Rows[0]["respCode"].ToString();
                    resp.resDesc = table1.Rows[0]["respDesc"].ToString();

                }

            }
            catch (Exception ex)
            {
                resp.resType = "Error";
                resp.resStatus = "PM400";
                resp.resDesc = ex.Message;
            }

            return resp;

        }
        


        public async Task<RespModel> AddSkillsToUser(int UserId, List<ProjectSkillDto> SkillsDto)
        {
            RespModel resp = new RespModel();

            try
            {
                DataSet dt_REs = new DataSet();

                DataTable dB = new DataTable();

                DataSet dtReq = new DataSet("UserSkills");

                dB = _dataAccess.ToDataTable(SkillsDto);
                dB.TableName = "Skill";

                dtReq.Tables.Add(dB);

                var xml = dtReq.GetXml();


                var query = $"Exec PM_AssignSkillsToUser{UserId},{xml}";


                if (connectStr != null)
                {
                    dt_REs = _dataAccess.ExecuteDataSet(query, connectStr);
                    var table1 = dt_REs.Tables[0];


                    resp.resType = table1.Rows[0]["respType"].ToString();
                    resp.resStatus = table1.Rows[0]["respCode"].ToString();
                    resp.resDesc = table1.Rows[0]["respDesc"].ToString();

                }

            }
            catch (Exception ex)
            {
                resp.resType = "Error";
                resp.resStatus = "PM400";
                resp.resDesc = ex.Message;
            }

            return resp;

        }


        public async Task<RespModel> AddProject(ProjectDto userDto, HttpContext context)
        {
            RespModel resp = new RespModel();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectStr))
                {

                    SqlCommand cmd = new SqlCommand("PM_AddProject", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", userDto.Name);
                    cmd.Parameters.AddWithValue("@Description", userDto.Description);
                    cmd.Parameters.AddWithValue("@EstimatedHours", userDto.EstimatedHours);
                    cmd.Parameters.AddWithValue("@Deadline", userDto.Deadline);
                    cmd.Parameters.AddWithValue("@CreatedBy", userDto.CreatedBy);

                    connection.Open();
                    cmd.ExecuteNonQuery();

                    resp.resStatus = "PM200";
                    resp.resType = "Succes";
                    resp.resDesc = "Project Added Succesfully";

                }


            }
            catch (Exception ex)
            {
                resp.resStatus = "PM400";
                resp.resType = "Error";
                resp.resDesc = ex.Message;

            }
            return resp;

        }

        public async Task<RespModel>AutoAllocateProjMem (int ProjectId, HttpContext context)
        {
            RespModel resp = new RespModel();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectStr))
                {

                    SqlCommand cmd = new SqlCommand("[PM_AutoAllocateProjectMembers]", connection);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProjectId", ProjectId);


                    connection.Open();
                    cmd.ExecuteNonQuery();

                    resp.resStatus = "PM200";
                    resp.resType = "Succes";
                    resp.resDesc = "Project Added Succesfully";

                }


            }
            catch (Exception ex)
            {
                resp.resStatus = "PM400";
                resp.resType = "Error";
                resp.resDesc = ex.Message;

            }
            return resp;

        }


        public async Task<RespModel> ProjectMemersAssign(int ProjectId, List<ProjectSkillDto> SkillsDto)
        {
            RespModel resp = new RespModel();

            try
            {
                DataSet dt_REs = new DataSet();

                DataTable dB = new DataTable();

                DataSet dtReq = new DataSet("Members");

                dB = _dataAccess.ToDataTable(SkillsDto);
                dB.TableName = "Member";

                dtReq.Tables.Add(dB);

                var xml = dtReq.GetXml();


                var query = $"Exec PM_AssignProjectMembers{ProjectId},{xml}";


                if (connectStr != null)
                {
                    dt_REs = _dataAccess.ExecuteDataSet(query, connectStr);
                    var table1 = dt_REs.Tables[0];


                    resp.resType = table1.Rows[0]["respType"].ToString();
                    resp.resStatus = table1.Rows[0]["respCode"].ToString();
                    resp.resDesc = table1.Rows[0]["respDesc"].ToString();

                }

            }
            catch (Exception ex)
            {
                resp.resType = "Error";
                resp.resStatus = "PM400";
                resp.resDesc = ex.Message;
            }

            return resp;

        }

































































        private async Task<UserMasterDto> GetValidUser(string Username, string Password)
        {
            UserMasterDto userDetails = new UserMasterDto();

            try
            {
                var HashPass = ConvertMd5(Password);


                using (SqlConnection connection=new SqlConnection(connectStr))
                {
                    await connection.OpenAsync();

                    string query = $"select * from Usermaster where Name =@UserName and PasswordHash=@Password";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@UserName", Username);
                        command.Parameters.AddWithValue("@Password", HashPass);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {

                            if(await reader.ReadAsync())
                            {
                                if (reader.GetBoolean(reader.GetOrdinal("IsActive")) != true)
                                {
                                    throw new UnauthorizedAccessException("You are currently inactive user");
                                }

                                userDetails = new UserMasterDto
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    Role = reader.GetString(reader.GetOrdinal("Role")),
                                };
                            }
                            else
                            {
                                throw new ArgumentException("UserName Or Password Mismatch");
                            }
                        }

                    }


                }
                return userDetails;


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        private async Task<string> GenerateToken(UserMasterDto UserDto)
        {
            try
            {
                var tokenkey = Encoding.UTF8.GetBytes(_configuration.GetRequiredSection("JWT:SecurityKey").Value);
                var TokenHandler = new JwtSecurityTokenHandler();

                var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier,UserDto.Name),
                new Claim("UserId",UserDto.Id.ToString()),
                new Claim("Email",UserDto.Email),
                new Claim("Role",UserDto.Role),

            };

                var encrptedclaim = EncryptClaims(claims);

                var tokenDesc = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
               new List<Claim>
               {
                    new Claim ("encrptedClaims",encrptedclaim)
               }
              ),

                    Expires = DateTime.UtcNow.AddHours(8),
                    SigningCredentials = new SigningCredentials(
                  new SymmetricSecurityKey(tokenkey),
                  SecurityAlgorithms.HmacSha256)
                    
                };

                var token = TokenHandler.CreateToken(tokenDesc);

                string finaltoken = TokenHandler.WriteToken(token);
                return finaltoken;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public string ConvertMd5(string value)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(value));

                StringBuilder builder = new StringBuilder("0x");
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("X2"));
                }

                return builder.ToString();
            }
        }

        private string EncryptClaims(IEnumerable<Claim> claims)
        {
            var jsonClaims = new JwtPayload(claims);
            var jsonClaimsString = JsonConvert.SerializeObject(jsonClaims);
            return Encryption(jsonClaimsString);
        }


        public string Encryption(string EncText)
        {
            using var aesAlg = Aes.Create();

            string enkey = "42358357407474453245745740747545";
            aesAlg.Key = Encoding.UTF8.GetBytes(enkey);
            aesAlg.Mode = CipherMode.ECB;
            aesAlg.Padding = PaddingMode.PKCS7;
            byte[] encrypted;
            using (var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV))
            {
                byte[] plainTextBytes = Encoding.UTF8.GetBytes(EncText);
                encrypted = encryptor.TransformFinalBlock(plainTextBytes, 0, plainTextBytes.Length);
            }
            //byte[] result = new byte[aesAlg.IV.Length + encrypted.Length];
            //Array.Copy(aesAlg.IV, 0, result, 0, aesAlg.IV.Length);
            //Array.Copy(encrypted, 0, result, aesAlg.IV.Length, encrypted.Length);
            return Convert.ToBase64String(encrypted);


        }







    }
}
