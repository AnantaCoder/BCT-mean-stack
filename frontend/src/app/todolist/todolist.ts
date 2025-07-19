import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser, CommonModule } from '@angular/common'; 
import { TodoService } from '../services/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.html',
  styleUrls: ['./todolist.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Todolist implements OnInit {
  todos: any[] = [];
  newTodo: string = '';

  constructor(
    private todoService: TodoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTodos();
    }
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => this.todos = data,
      error: (err) => console.error('Error loading todos:', err)
    });
  }

  onAddTodo(): void {
    if (!this.newTodo.trim()) return;

    const todo = { task: this.newTodo, status: false };
    this.todoService.addTodo(todo).subscribe({
      next: (addedTodo) => {
        this.todos.unshift(addedTodo);
        this.newTodo = '';
      },
      error: (err) => console.error('Error adding todo:', err)
    });
  }

  onDelete(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo._id !== id);
      },
      error: (err) => console.error('Error deleting todo:', err)
    });
  }

  onEdit(todo: any): void {
    const updatedTask = prompt('Edit Todo:', todo.task);
    if (!updatedTask?.trim()) return;

    const updatedTodo = { ...todo, task: updatedTask };
    this.todoService.updateTodo(todo._id, updatedTodo).subscribe({
      next: (res) => {
        this.todos = this.todos.map(t => t._id === todo._id ? res : t);
      },
      error: (err) => console.error('Error editing todo:', err)
    });
  }

  onToggleStatus(todo: any): void {
    const updatedTodo = { ...todo, status: !todo.status };
    this.todoService.updateTodo(todo._id, updatedTodo).subscribe({
      next: (res) => {
        this.todos = this.todos.map(t => t._id === todo._id ? res : t);
      },
      error: (err) => console.error('Error toggling status:', err)
    });
  }
}