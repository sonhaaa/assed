using System.ComponentModel.DataAnnotations;

namespace Assed.Models
{
    public class Teachers
    {
        [Key]
        public string TeacherId { get; set; }
        [Required]
        public string TeacherName { get; set; }

        [Required]
        public string TeacherEmail { get; set; }

        [Required]
        public string TeacherPassword { get; set; }

        [Required]
        public string TeacherOrganize { get; set; }

        [Required]
        public string TeacherSpecialize { get; set; }

        [Required]
        public string TeacherImage { get; set; }
    }
}