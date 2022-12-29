import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
    time="8:15 PM";
    greeting="Good Morning";

    connectedCallback(){
        this.getTime();
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
        inputBox.value="";
    }
}