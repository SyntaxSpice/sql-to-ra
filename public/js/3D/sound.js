function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}


var foo=new Sound("../js/3D/motor.mp3",100,true);
var nfs=new Sound("../js/3D/nfs.mp3",50,true);
nfs.start();
var startB = document.getElementById("start");
startB.addEventListener("mouseover", playMusic);
startB.addEventListener("mouseout", stopMusic);

                        
function playMusic(){
    foo.start();
}

function stopMusic(){
    foo.stop();
}


//foo.stop();
//foo.start();
//foo.init(100,false);
//foo.remove();