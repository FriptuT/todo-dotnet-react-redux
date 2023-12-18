using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoItemsController: ControllerBase
    {
        private readonly StoreContext context;

        public TodoItemsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoItem>>> GetItems(){
            var items = await context.TodoItems.ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetItem(int id)
        {
            var item = await context.TodoItems.FindAsync(id);

            if (item == null) return NotFound();

            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostItem([FromBody] TodoItem todoItem)
        {
            context.TodoItems.Add(todoItem);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new {id = todoItem.Id}, todoItem );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, [FromBody] TodoItem updatedTodoItem)
        {
            var existingItem = await context.TodoItems.FindAsync(id);
            
            if (existingItem == null){
                return NotFound();
            }

            existingItem.Text = updatedTodoItem.Text;
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await context.TodoItems.FindAsync(id);

            if (item == null){
                return NotFound();
            }

            context.TodoItems.Remove(item);
            await context.SaveChangesAsync();

            return NoContent();
        }

    
    }
}