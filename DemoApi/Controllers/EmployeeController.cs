using DemoApi.Data;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {
        private readonly MyDataContext myDataContext;

        public EmployeeController(MyDataContext myDataContext)
        {
            this.myDataContext = myDataContext;
        }
        [HttpGet]
        [Route("AllEmp")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmp()
        {
            // var emp = await myDataContext.Employees.ToListAsync();
            var emp= await (from e in myDataContext.Employees
                            join d in myDataContext.Departments
                            on e.DepartmentId equals d.DepartmentId
            select new Employee {
                EmployeeId =e.EmployeeId,
                DepartmentId = d.DepartmentId,
                Department = d.DepartmentName,
                FirstName=e.FirstName,
                LastName=e.LastName,
                EmployeeDesignation=e.EmployeeDesignation,
                EmployeeAddress=e.EmployeeAddress,
                EmployeePhone=e.EmployeePhone,
                EmployeeGender=e.EmployeeGender,
                City=e.City,
                UpdatedDate=e.UpdatedDate
           
            }
            
            ).ToListAsync();

            return  Ok(emp);
        }
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetEmp")]
        public async Task<IActionResult> GetEmp([FromRoute] int id)
        {
            var existEmp = await myDataContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            if(existEmp != null)
            {
                return Ok(existEmp);
            }
            return NotFound("Employee Not Found ");
        }
        [HttpPost]
        [Route("AddEmp")]
        public async Task<IActionResult> AddEmp([FromBody] Employee employee)
        {
            
            await myDataContext.Employees.AddAsync(employee);
            await myDataContext.SaveChangesAsync();
            return Ok(employee);
           
        }

        // update emp0loyee
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEmp([FromRoute] int id, [FromBody] Employee employee)
        {

            var existEmp = await myDataContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            if (existEmp != null)
            {
                existEmp.FirstName = employee.FirstName;
                existEmp.LastName = employee.LastName;
                existEmp.DepartmentId = employee.DepartmentId;
                existEmp.EmployeeDesignation = employee.EmployeeDesignation;
                existEmp.EmployeeAddress = employee.EmployeeAddress;
                existEmp.EmployeeGender = employee.EmployeeGender;
                existEmp.EmployeePhone = employee.EmployeePhone;
                existEmp.PinCode = employee.PinCode;

                await myDataContext.SaveChangesAsync();
                return Ok(existEmp);

            }
            return NotFound("Employee not found!");
        }

        //delete Employee
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmp([FromRoute] int id)
        {
            var existDept = await myDataContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            if (existDept != null)
            {
                myDataContext.Remove(existDept);
                await myDataContext.SaveChangesAsync();
                return Ok(existDept);
            }
            return NotFound("Employee not found!");
        }



    }
}
