using System.ComponentModel.DataAnnotations;

namespace Assed.DTOs
{
    public class TeacherUpdate
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
    }
}