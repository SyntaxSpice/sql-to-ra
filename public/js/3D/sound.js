//function Sound(source, volume, loop) {
//    this.source = source;
//    this.volume = volume;
//    this.loop = loop;
//    var son;
//    this.son = son;
//    this.finish = false;
//    this.stop = function () {
//        document.body.removeChild(this.son);
//    }
//    this.start = function () {
//        if (this.finish) return false;
//        this.son = document.createElement("embed");
//        this.son.setAttribute("src", this.source);
//        this.son.setAttribute("hidden", "true");
//        this.son.setAttribute("volume", this.volume);
//        this.son.setAttribute("autostart", "true");
//        this.son.setAttribute("loop", this.loop);
//        document.body.appendChild(this.son);
//    }
//    this.remove = function () {
//        document.body.removeChild(this.son);
//        this.finish = true;
//    }
//    this.init = function (volume, loop) {
//        this.finish = false;
//        this.volume = volume;
//        this.loop = loop;
//    }
//}
//
//
//var foo = new Sound("../js/3D/motor.mp3", 100, true);
//var nfs = new Sound("../js/3D/nfs.mp3", 10, true);
//nfs.start();
//var startB = document.getElementById("start");
//startB.addEventListener("mouseover", playMusic);
//startB.addEventListener("mouseout", stopMusic);
//
//
//let intLI;
//let intLD;
//function playMusic() {
//    foo.start();
//
//    clearInterval(intLD);
//    intLI = setInterval(function () {
//        light.intensity += 0.1;
//        if (light.intensity > 2) {
//            clearInterval(intLI);
//        }
//    }, 20);
//}
//
//function stopMusic() {
//    foo.stop();
//    
//    clearInterval(intLI);
//    intLD = setInterval(function () {
//        light.intensity -= 0.1;
//        if (light.intensity < 0) {
//            clearInterval(intLD);
//        }
//    }, 20);
//}
//
//
////foo.stop();
////foo.start();
////foo.init(100,false);
////foo.remove();