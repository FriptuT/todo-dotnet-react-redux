using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.TodoItems.Any()){
                return;
            }

            var todoItems = new List<TodoItem>
            {
                new TodoItem
                {
                    Text = "sleep -> next = wakeUpAt5am -> previous"
                },
                new TodoItem
                {
                    Text = "wakeUpAt5am -> next = startCoding -> previous"
                },
                new TodoItem
                {
                    Text = "startCoding -> next = goToGym -> previous"
                },
                new TodoItem
                {
                    Text = "goToGym -> next = backToCoding -> previous"
                },
                new TodoItem
                {
                    Text = "backToCoding -> next = readHarryPotter -> previous"
                },
                new TodoItem
                {
                    Text = "readHarryPotter -> next = sleep -> previous"
                }
            };

            foreach (var item in todoItems)
            {
                context.TodoItems.Add(item);
            }

            context.SaveChanges();
        }
    }
}