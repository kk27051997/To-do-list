import { ElementRef, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(){
     var storedNames:string[] = JSON.parse(localStorage.getItem("Lists"));
      this.arrayList = storedNames;

  }
  title = 'Todolist';
  @ViewChild('inputs', { static: true }) input: ElementRef;
  arrayList:string[]=[];
  tempArray:string[]=[];
  editFlag:boolean=false;
  oldEditValue:string='';

  onenter(event:KeyboardEvent){
    if(event.keyCode == 13){
      this.addlist(this.input.nativeElement.value);
      this.input.nativeElement.value='';
    }
    //$event.keyCode == 13 ? addlist(inputs.value) : null
  }
   addlist(value:string){
     if(value!="" && value!==undefined && value!=null){
     if(!this.editFlag){
     this.tempArray=[...this.arrayList];
     this.tempArray.push(value);
     this.arrayList=this.tempArray;
     localStorage.setItem("Lists", JSON.stringify(this.arrayList));
     }
     else{
       let index:number = this.arrayList.indexOf(this.oldEditValue);
       this.tempArray=[...this.arrayList];
       this.tempArray[index]=value;
       this.arrayList=this.tempArray;
       localStorage.setItem("Lists", JSON.stringify(this.arrayList));
       this.editFlag= false;
       this.oldEditValue='';
     }
    }
    else{
      alert("please enter valid values");
    }
  }

  removelist(value:string){
    this.tempArray=[...this.arrayList];
    this.arrayList = this.tempArray.filter((val)=>val!==value);
    localStorage.setItem("Lists", JSON.stringify(this.arrayList));
  } 
  editlist(value:string){
   this.editFlag=true;
   this.oldEditValue=value;
   this.input.nativeElement.value=value;
  }





}
