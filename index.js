class Timer {
    constructor(durationInput , startButton,pauseButton){
        this.durationInput=durationInput;
        this.startButton=startButton;
        this.pauseButton=pauseButton;
        this.onStart=null;
        this.onTick=null;
        this.onComplete=null;
        
    }
    static timerWithCallbacks=(durationInput , startButton,pauseButton)=>{
       return new Timer(durationInput , startButton,pauseButton)
        .registerCallbacks({
            onStart(total){
                duration=total;
            },
            onTick(currentTime){
                circle.setAttribute('stroke-dashoffset', per*currentTime/duration-per)
                
            },
            onComplete(){
                console.log('done with ticking')
            }
        })
        .addEvents()
    }


    registerCallbacks = (callbacks)=>{
        this.onStart=callbacks?.onStart;
        this.onTick=callbacks?.onTick;
        this.onComplete=callbacks?.onComplete;
        return this;
    }

    addEvents=()=>{
        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause);
    }

    start=()=>{
       if (this.onStart) {
        this.onStart(this.currentTime)
       };
        this.tick();
        this.id=setInterval(this.tick,10)

    }

    pause=()=>{
        clearInterval(this.id);
    }
    tick=()=>{
        if (this.currentTime<=0){
            this.pause()
            if(this.onComplete){
                this.onComplete()
            }
        }
        else{
            this.currentTime=this.currentTime-0.01
            if(this.onTick){
                this.onTick(this.currentTime)
            }
        }
        
    }

    get currentTime() {
       return parseFloat(this.durationInput.value)
    }
    set currentTime(time){
    this.durationInput.value=time.toFixed(2);
    }

    
}

const durationInput= document.querySelector('#duration') ;
const startButton=document.querySelector('#start');
const pauseButton=document.querySelector('#pause');
const circle =document.querySelector('circle');
per = circle.getAttribute('r')*2*Math.PI;
circle.setAttribute('stroke-dasharray',per)
let duration ;

Timer.timerWithCallbacks(durationInput,startButton,pauseButton)
