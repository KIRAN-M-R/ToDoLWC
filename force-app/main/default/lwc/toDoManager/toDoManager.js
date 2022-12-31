import { LightningElement, track } from 'lwc';
import addTodo from "@salesforce/apex/ToDoController.addTodo";
import getCurrentTodos from '@salesforce/apex/ToDoController.getCurrentTodos'

export default class ToDoManager extends LightningElement {
    time="8:15 PM";
    greeting="Good Morning";
    @track todos = []

    connectedCallback(){
        this.getTime();
       // this.populateTodos();
       this.fetchToDos();
        setInterval(()=>{
            this.getTime();
           
        },1000 * 60)
    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;
        this.setGreeting(hour)
    }

    getHour(hour){
        return hour===0 ? 12 : hour > 12 ? (hour-12) : hour; 
    }

    getMidDay(hour){
        return hour>=12 ? "PM" : "AM"
    }

    getDoubleDigit(digit){
        return digit<10 ? "0"+digit : digit
    }

    setGreeting(hour){
        if(hour < 12){
            this.greeting="Good Morning"
        }else if(hour >=12 && hour <=17){
            this.greeting="Good Afternoon"
        }else{
            this.greeting="Good Evening"
        }
    }

    addToDoHandler(){
        const inputBox = this.template.querySelector("lightning-input");
        console.log("current value"+inputBox.value);
        const todo = {
            
            todoName: inputBox.value,
            done: false,
            

        }
        addTodo({payload: JSON.stringify(todo)}).then(response =>{
            console.log('item inserted successfully');
            this.fetchToDos();
        }).catch(error => {
            console.error('error in inserting todo'+error);
        })
        //this.todos.push(todo);
        inputBox.value="";
    }

    fetchToDos() {
        getCurrentTodos().then(result => {
            if(result){
                console.log("Retrieved todos from server "+result.length);
                this.todos = result;
            }

        }).catch(error => {
            console.error('error in fetching todo'+error);
        })
    }

    get upcomingTasks(){
        return this.todos && this.todos.length ? this.todos.filter(todo =>!todo.done) : []
    }
    get completedTasks(){
        return this.todos && this.todos.length ? this.todos.filter(todo =>todo.done) : []
    }

    populateTodos() {
        const todos = [
            {
                todoId: 0,
                todoName: "Feed the cat",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 1,
                todoName: "Feed the Dog",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 2,
                todoName: "Wash the cloth",
                done: true,
                todoDate: new Date()
            },

        ];
        this.todos = todos
    }
}