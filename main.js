var go = false;

canvas = document.getElementById('main')
ctx = canvas.getContext('2d')


try{
  localStorage
}
catch(e){
  clearInterval(intrid)

  document.getElementById("wdt").innerHTML = "localstroage not avalible"
  document.getElementById("main").style.display = 'none'
  throw new Error("localstroage not avalible")
}



document.getElementById("hsc").innerHTML = `high score: ${localStorage.getItem("hs") || 0} pts`

function main(l) {
  var score = 0;
  var lvs = 3;
  var aspd = 1
  var ain = 120;
  var tcolor = "#ffffff"
  var cols = ['#ff0000', '#FFA500', "#ffffff"]
  var msp = 5
  var lvl = 1
  var [$a, $b, $c, $d,$e] = Array(5).fill(false)
  class rect {
    constructor(x, y, rad, color, fill) {
      this.x = x
      this.y = y
      this.rad = rad
      this.color = color
      this.fill = fill
    }
    draw(ctx) {

      ctx.beginPath()

      ctx.rect(this.x, this.y, this.rad, this.rad,)

      if (this.fill) {
        ctx.fillStyle = this.color
        ctx.fill()
      }
      else {
        ctx.lineWidth = 3
        ctx.strokeStyle = this.color
        ctx.stroke()


      }
      ctx.closePath()
    }
  }


  class line {
    constructor(stx, sty, enx, eny) {
      this.stx = stx
      this.sty = sty
      this.enx = enx
      this.eny = eny
    }

    draw(c) {
      c.beginPath()
      c.moveTo(this.stx, this.sty)
      c.strokeStyle = '#ffffff'
      c.lineTo(this.enx, this.eny)
      c.stroke()
      c.closePath()
    }

  }

  class mis {
    constructor(xs, ys) {
      this.x = 310
      this.y = 310
      this.rect = new rect(310, 310, 5, "#ff0000", true)
      this.xs = xs
      this.ys = ys
      this.isac = true
    }
    draw() {
      if (this.isac) {
        this.rect.draw(ctx)
        this.x += this.xs
        this.y += this.ys
        this.rect.x = this.x
        this.rect.y = this.y
      }
    }
  }



  class aster {
    constructor(xs, ys, x, y, ltr = 'a',sz='r') {
      this.img = new Image()
      var inum = Math.floor(Math.random() * 3) + 1

      this.img.src = `/${ltr}${inum}.png`

      this.img.onload = function() {
        //ctx.drawImage(this,this.x,this.y)
      }
      this.x = x
      this.y = y
      if (sz == 'r')
      {this.pts = [100, 100, 100, 100, 200, 200, 400][Math.round(Math.random() * 10) % 7]}
      else{
        this.pts = sz
      }

      this.rect = new rect(x, y, { 100: 40, 200: 35, 400: 30, }[this.pts], "#ffffff", true)
      this.xs = xs
      this.ys = ys
      this.isac = true
    }
    draw() {
      if (this.isac) {
        ctx.drawImage(this.img, this.x, this.y, this.rect.rad, this.rect.rad)
        //this.rect.draw(ctx)
        this.x += this.xs
        this.y += this.ys
        this.rect.x = this.x
        this.rect.y = this.y
      }
    }
  }



  function rot_to_cord(r) {
    return [Math.sin(r), Math.cos(r)]
  }
  function collide(r1, r2) {
    //console.log(r1.isac,r2.isac)
    if (r1.isac && r2.isac) {
      if (r2.x + r2.rect.rad > r1.x && r1.x + r1.rect.rad > r2.x &&
        r2.y + r2.rect.rad > r1.y && r1.y + r1.rect.rad > r2.y
      ) {
        return true
      }
      return false
    }
    else {
    }
    return false
  }

  function collide2(r1, r2) {
    //console.log(r1.isac,r2.isac)
    if (r2.isac) {
      if (r2.x + r2.rect.rad > r1.x && r1.x + r1.rad > r2.x &&
        r2.y + r2.rect.rad > r1.y && r1.y + r1.rad > r2.y
      ) {
        return true
      }
      return false
    }
    else {
    }
    return false
  }


  let ro = 0
  var ms = []
  var ast = []
  var plyr = new rect(300, 300, 20, "#ffffff", true)
  var plyr2 = new line(300, 300, 310, 310)
  var map = {}

  document.addEventListener('keydown', function(ev) {
    if (ev.key == " " && !ev.repeat) {
      var [lxs, lxy] = rot_to_cord(ro)
      ms.push(new mis(lxs * msp, lxy * msp,))
    }
    ev.preventDefault()
    map[ev.key] = true

  })
  document.addEventListener('keyup', function(ev) {
    map[ev.key] = false
  })




  /*document.onkeydown = document.onkeyup = function(ev){
    map[ev.key] = ev.type == 'keydown';
  
  if (map["Arrow"] || map["ArrowRight"]){
    ro -= Math.PI/25
  }
  if (map ["Left"] || map ["ArrowLeft"]){
    ro += Math.PI/25
  }
  if (map [" "]){
      //if (ev.repeat) { return }
  
    var [lxs,lxy] = rot_to_cord(ro)
    ms.push(new mis(lxs,lxy,))
  }
    
  }
  */


  var ind = 0;
  var intid = setInterval(function() {
    ctx.clearRect(0, 0, 600, 600)


    var [px, py] = rot_to_cord(ro)

    var plyr2 = new line(310, 310, (px * 30) + 310, (py * 30) + 310,)

    plyr.draw(ctx)
    plyr2.draw(ctx)
    for (var i = 0; i < ms.length; i++) {
      ms[i].draw()
    }
    for (var a = 0; a < ast.length; a++) {
      ast[a].draw()
    }
for (var d=0;d<ast.length;d++){
  for (var e=0;e<ast.length;e++){
  if(d==e){continue}
  if (collide(ast[d],ast[e])){
    if(Math.sqrt(ast[d].x2**2+ast[d].ys**2)>Math.sqrt(ast[e].x2**2+ast[e].ys**2)){
    ast[e].isac = false
    }
    else{
      ast[d].isac = false
    }
  }
}
  
}
      nel = []
  for (var f=0; f<ast.lenght;f++){
    if (ast[f].iasc){
      nel.push(ast[f])
    }
  }

    
    out: for (var b = 0; b < ast.length; b++) {
      for (var c = 0; c < ms.length; c++) {
        if (collide(ms[c], ast[b])) {
          ast[b].isac = false
          ms[c].isac = false
          if (score >= 1000 && !$a) {
            lvl = 2
            aspd += 1
            $a = true
            msp += 1
          }
          if (score >= 2000 && !$b) {
            lvl = 3
            ain = 110
            $b = true
          }
          if (score >= 3000 && !$c) {
            lvl = 4
            ain = 100
            $c = true
          }
          if (score >= 4000 && !$d) {
            lvl = 5
            aspd += .5
            msp += .5
            $d = true
          }
          if (score >= 5000 && !$e) {
            lvl = 6
            aspd += .5
            ain = 75
            $e = true
          }
          score += ast[b].pts
          if(ast[b].pts == 100){
            var as = ast[b]
            ast.splice(b, 1)
            
            var cxs = as.xs 
            var cys = as.ys 
            
            ast.push(new aster(aspd*(cys/msp),aspd*(-cxs/msp),as.x+25,as.y-25,l,200))
            
            ast.push(new aster(aspd*(-cys/msp),aspd*(cxs/msp),as.x+25,as.y+25,l,200))
          }
            else{ast.splice(b, 1)}
          
          
          ms.splice(c, 1)

          
          continue out
        }
        
        
        
        }
       if (collide2(plyr, ast[b])) {
          lvs--
          if (lvs > 0) {
            ast[b].isac = false
            tcolor = cols[lvs - 1]
          }
          else {
            if (score>localStorage.getItem('hs')){
              alert(`new high score: ${score}`)
            }
            else{
            alert(`game over! score: ${score}`)
            }
            go = false
            //document.location.reload()
            clearInterval(intid)
            localStorage.setItem("hs",score)
            document.getElementById("hsc").innerHTML = `hight score: ${localStorage.getItem("hs") || 0} pts`

            return
          }
          
          }
      if ((0> ast[b].x)||(ast[b].x > 600) || (0> ast[b].y)||(ast[b].y > 600)){
            ast.splice(b,1)
            console.log(3)}
      
      }

    

    if (map["Arrow"] || map["ArrowRight"]) {
      ro -= Math.PI / 120
    }
    if (map["Left"] || map["ArrowLeft"]) {
      ro += Math.PI / 120
    }
    if (map[" "]) {


    }

    if (ind % ain == 0) {
      var rnd = Math.round(Math.random() * 8) % 4
      if (rnd == 0) {
        xs = Math.random() * aspd
        ys = Math.random() * aspd
        ast.push(new aster(xs, ys, 0, 0, l))
      }
      if (rnd == 1) {
        xs = Math.random() * aspd
        ys = Math.random() * aspd
        ast.push(new aster(-xs, ys, 600, 0, l))
      }
      if (rnd == 2) {
        xs = Math.random() * aspd
        ys = Math.random() * aspd
        ast.push(new aster(xs, -ys, 0, 600, l))
      }
      if (rnd == 3) {
        xs = Math.random() * aspd
        ys = Math.random() * aspd
        ast.push(new aster(-xs, -ys, 600, 600, l))
      }
    }

    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${score} pts`, 452, 20);
    
    ctx.fillText(`level ${lvl}`, 250, 20);
    ctx.fillStyle = tcolor
    ctx.fillText(`${lvs - 1} tries left`, 48, 20);


    ind++
  }, 10)



}


document.getElementById("start").addEventListener("click", function(ev) {
  var l
  if (document.getElementById('i').checked) {
    l = 't'
  }
  else {
    l = 'a'
  }

  if (!go) {
    go = true
    main(l)

  }

})
