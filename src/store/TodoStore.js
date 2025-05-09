import { action, autorun, computed, makeObservable, observable } from "mobx";

    
//    completedTodoCount (){
//         return this.todoArr.filter(todo=> todo.completed).length;
//     }
//     addTodo (task){
//         this.todoArr?.push({
//             task,
//             completed:false,
//             asignnee:null
//         })
//     }
//     printTodo (){
//         this.todoArr?.forEach(item=>{
//             console.log(item);
//         })
//     }
//     }

//     const todoStore = new TodoStore();
//     const result =todoStore.addTodo("hello")
//     console.log(result);
    
    
//     // console.log(todoStore.addTodo("hello"));
//     // console.log(todoStore.addTodo("hello2"));
//     // console.log(todoStore.addTodo("hello3"));
//     // console.log(todoStore.addTodo("hello4"));
//     // console.log(todoStore.addTodo("hello5"));
//     // console.log(todoStore.addTodo("hello6"));

//     todoStore?.printTodo()
    

class ObservableTodoList {
    todo =[];

    currentTodoText="";
    currentTaskDescription="";

    constructor (){
        const savedTodos = localStorage.getItem("todos");
        this.todo = savedTodos ? JSON.parse(savedTodos) : [];
        makeObservable(this,{
            todo:observable,
            currentTodoText:observable,
            currentTaskDescription:observable,
            addTask:action,
            taskCompletedToggle:action,
            setCurrentTodoText:action,
            completedTaskCount:computed,
        });
        // autorun(() => {
        //     console.log(this.todo);
        //     localStorage.setItem("todos", JSON.stringify(this.todo));
        // });
    }
  
    get completedTaskCount (){
        return this.todo?.filter(task=>task?.isCompleted)?.length || 0;
    }
    setCurrentTodoText (text){
        this.currentTodoText = text?.trim() ||"";
    }

    resetTask (){
        this.todo =[];
        this.currentTodoText ="";
        localStorage.removeItem("todos");
    }
    taskCompletedToggle(id){
        this.todo.map((item)=>{
            if(id === item?.id){
                item.isCompleted = !item?.isCompleted
            }
        })

    }
     addTask (){
        if(!this?.currentTodoText?.trim()) return;
        this.todo.push({
            id: Date.now(),
            name:this.currentTodoText?.trim(),
            isCompleted:false,
            descripton: this.currentTaskDescription?.trim() || "",
        })
        this.currentTodoText ="";
        return;
    }
}

export const todoList= new ObservableTodoList();

// autorun(() => {
//     localStorage.setItem("todos", JSON.stringify(todoList.todo));
//     if (todoList.todo.length > 0) {
//       console.log("First item:", todoList.todo[0]);
//     }
//   });