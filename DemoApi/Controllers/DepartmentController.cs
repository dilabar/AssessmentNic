using DemoApi.Data;
using DemoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartmentController : Controller
    {
        private readonly MyDataContext myDataContext;
        public DepartmentController(MyDataContext myDataContext)
        {
            this.myDataContext = myDataContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDepartment()
        {
            var dept = await myDataContext.Departments.ToListAsync();
            return Ok(dept);
        }

        //get single dept
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetDept")]
        public async Task<IActionResult> GetDept([FromRoute] int id)
        {
            var dept = await myDataContext.Departments.FirstOrDefaultAsync(x => x.DepartmentId == id);
            if(dept != null)
            {
                return Ok(dept);
            }

            return NotFound("Department Not Found!");
        }
        // add department 
        [HttpPost]
        [Route("AddDept")]
        public async Task<IActionResult> AddDept([FromBody] Department department)
        {
            

            if(department.DepartmentName != null)
            {
                await myDataContext.Departments.AddAsync(department);
                await myDataContext.SaveChangesAsync();
                return Ok(department);
            }
            return NotFound("Name Required");
          
        }

        // update department
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateDept([FromRoute] int id, [FromBody] Department department)
        {
           
            var existDept = await myDataContext.Departments.FirstOrDefaultAsync(x => x.DepartmentId == id);
            if(existDept != null)
            {
                existDept.DepartmentName = department.DepartmentName;
                existDept.ModifiedDate = DateTime.Now;
                await myDataContext.SaveChangesAsync();
                return Ok(existDept);

            }
            return NotFound("Department not found!");
        }

        //delete department
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteDept([FromRoute] int id)
        {
            var existDept = await myDataContext.Departments.FirstOrDefaultAsync(x => x.DepartmentId == id);
            if(existDept != null)
            {
                myDataContext.Remove(existDept);
                await myDataContext.SaveChangesAsync();
                return Ok(existDept);
            }
            return NotFound("Deaprtment not found!");
        }

      
    }
}
