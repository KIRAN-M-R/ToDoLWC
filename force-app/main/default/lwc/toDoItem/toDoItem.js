import { LightningElement, api } from 'lwc';
import updateTodo from '@salesforce/apex/ToDoController.updateTodo';
import deleteTodo from '@salesforce/apex/ToDoController.deleteTodo';

export default class ToDoItem extends LightningElement {

    @api todoId;
    @api todoName;
    @api done = false;

    updateHandler() {
        const todo = {
            todoId: this.todoId,
            todoName: this.todoName,
            done: !this.done
        }
        updateTodo({payload: JSON.stringify(todo)}).then(result=>{
            console.log('item updated succesfully');
            const updateEvent = new CustomEvent('update');
            this.dispatchEvent(updateEvent);
        }).catch(error=>{
            console.error('error in update '+error);
        })

    }

    deleteHandler() {
        deleteTodo({todoId: this.todoId}).then(result=>{
            console.log('item deleted succesfully');
            const deleteEvent = new CustomEvent('delete');
            this.dispatchEvent(deleteEvent);
        }).catch(error=>{
            console.error('error in delete '+error);
        })
    }

    get containerClass() {
        return this.done ? "todo completed" : "todo upcoming";
    }
    get iconName() {
        return this.done ? "utility:check" : "utility:add";
    }
}