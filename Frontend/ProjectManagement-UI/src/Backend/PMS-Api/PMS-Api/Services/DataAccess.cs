using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;

namespace PMS_Api.Services
{
    public class DataAccess
    {
        private SqlConnection myConnection { get; set; }
        private SqlDataAdapter oSqlAdap { get; set; }

        SqlCommand oCommand = new SqlCommand();


        public DataSet ExecuteDataSet(string str, string connectionstr)
        {
            DataSet functionReturnValue = null;
            myConnection = new SqlConnection(connectionstr);
            DataSet Ds = new DataSet();
            try
            {
                myConnection.Open();
                oSqlAdap = new SqlDataAdapter(str, myConnection);
                oSqlAdap.Fill(Ds, "T_Temp");
                functionReturnValue = Ds;
            }
            catch (Exception ex)
            {
                myConnection.Close();
                throw new ApplicationException("Exception in Run Query  " + ex.Message.ToString());
            }
            finally
            {
                myConnection.Close();
                myConnection = null;
                oSqlAdap = null;
            }
            return functionReturnValue;
        }
        public DataTable ExecuteDataTable(string strQuery, string strconnection)
        {

            myConnection = new SqlConnection(strconnection);
            DataTable _retVal = null;
            DataSet oDataSet = new DataSet();
            try
            {
                myConnection.Open();

                if (myConnection.State == ConnectionState.Open)
                {
                    oCommand.Connection = myConnection;
                    oCommand.CommandText = strQuery;
                    oCommand.CommandType = CommandType.Text;
                    oSqlAdap = new SqlDataAdapter(oCommand);
                    if (oSqlAdap != null)
                        oSqlAdap.Fill(oDataSet);
                }
                else
                {
                    throw new Exception("");
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                myConnection.Close();
                SqlCommand oCommand = null;
                oSqlAdap = null;
            }
            return _retVal= oDataSet.Tables[0];

        }
        public int ExecuteNonQuery(string str, string strconn, string strIdentity = "")
        {
            int _retVal = 0;

            SqlConnection myConnection = new SqlConnection(strconn);
            try
            {
                myConnection.Open();
                oCommand = new SqlCommand(str, myConnection);
                _retVal = oCommand.ExecuteNonQuery();
                if (_retVal > 0)
                {
                    if (strIdentity.Length > 0)
                    {
                        oCommand = new SqlCommand(strIdentity, myConnection);
                        _retVal = Convert.ToInt32(oCommand.ExecuteScalar());
                    }
                }

            }
            catch (Exception ex)
            {
                myConnection.Close();
                throw new ApplicationException("Exception in Run Query  " + ex.Message.ToString());
            }
            finally
            {
                myConnection.Close();
                myConnection = null;
                oCommand = null;
            }
            return _retVal;
        }


        public  DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table 
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

    }
}
