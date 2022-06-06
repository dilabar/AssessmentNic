using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoApi.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeId { get; set; }
        [StringLength(150)]
        public string? FirstName { get; set; }
        [StringLength(150)]
        public string? LastName { get; set; }
        [Display(Name = "Designation")]
        [StringLength(150)]
        public string? EmployeeDesignation { get; set; }
        [Display(Name = "Address")]
        [StringLength(150)]
        public string? EmployeeAddress { get; set; }
        [StringLength(15)]
        [Display(Name = "Phone")]
        public string? EmployeePhone { get; set; }
        [Display(Name = "Gender")]
        [StringLength(15)]
        public string? EmployeeGender { get; set; }
        [Display(Name = "City")]
        [StringLength(150)]
        public string? City { get; set; }
        [Display(Name = "Pin Code")]
        [StringLength(150)]
        public string? PinCode { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        [NotMapped]
        public string? Department { get; set; }


    }
}
