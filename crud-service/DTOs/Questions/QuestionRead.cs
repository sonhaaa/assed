using System.ComponentModel.DataAnnotations;

namespace Assed.Models
{
    public class QuestionRead
    {
        [Key]
        public string QuestionId { get; set; }
        public string QuestionSetId { get; set; }
        public string QuestionTitle { get; set; }
        public string QuestionReferenceAnswer { get; set; }
    }
}