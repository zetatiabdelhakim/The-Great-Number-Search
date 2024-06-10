let players=document.getElementsByClassName("lose").length;
let colors=["red","green","#c43586","yellow","blue"];

let players_lose=[]

_1_to_100=[]
for(i=1;i<=100;i++)
    _1_to_100.push(i);

let players_predict=[];
for(i=1;i<=players;i++)
    players_predict.push(true)

let players_nb_say=[]
for(i=1;i<=players;i++)
    players_nb_say.push(3)

let players_numbers=[]
let table_no_nb_pl=_1_to_100.slice()
let positions=[[180,10],[180,83],[380,83],[380,10],[550,46.5]]

let tour_time=document.getElementById("tour_time")
let Q_my=document.getElementById("Q_my")
function no_tour(){
    tour_time.style.visibility="hidden";
    Q_my.style.visibility="hidden";
}
no_tour()
function set_tour(i){
    tour_time.style.visibility="visible";
    Q_my.style.visibility="visible";
    tour_time.style.top=String(positions[i][0]-30)+"px";
    Q_my.style.top=String(positions[i][0]+80)+"px";
    tour_time.style.left=String(positions[i][1])+"%";
    Q_my.style.left=String(positions[i][1])+"%";
    Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[i]);
}
function random_from(T){
    return T[Math.floor(Math.random() * T.length)]
}
for(i=0;i<players;i++){
    tt=[]
    for(j=0;j<3;j++){
        choose=random_from(table_no_nb_pl);
        tt.push(choose)
        table_no_nb_pl.splice(table_no_nb_pl.indexOf(choose),1)
    }
    players_numbers.push(tt)
}

let Number_on_screen=[];
tt=_1_to_100.slice()
for(i=0;i<100;i++){
    choose=random_from(tt);
    Number_on_screen.push(choose)
    tt.splice(tt.indexOf(choose),1)
}
let not_yet=_1_to_100.slice()
place_nb_scr=document.getElementsByClassName("number");
function random_nb_on_scr(){
    I_AM_IN=""
    if(not_yet.length==0){
        not_yet=_1_to_100.slice()
    }
    let color_before=[]
            for(let pp=0;pp<100;pp++)
                color_before.push(place_nb_scr[pp].style.backgroundColor);
    no_tour()
    choose=random_from(not_yet);
    not_yet.splice(not_yet.indexOf(choose),1)
    let s=choose
    i=Number_on_screen.indexOf(s)
    let interval = setInterval(function () {
        place_nb_scr[i].style.backgroundColor=color_before[i];
        if(s==100 || s==choose+3){
            setTimeout(function(){place_nb_scr[i].style.backgroundColor="#626262";},1600)
            clearInterval(interval)
            setTimeout(function(){I_AM_IN=2},3000)
        }    
        i=Number_on_screen.indexOf(s);
        place_nb_scr[i].style.backgroundColor="white";
        place_nb_scr[i].innerHTML=String(s);
        s++;
    }, 1500);
}
//*********************************************************************************** */
for(let i=0;i<100;i++){
    place_nb_scr[i].innerHTML=Number_on_screen[i];
}
for(let v=0;v<players;v++){
    color=colors[v];
    for(let s=0;s<3;s++){
        l=Number_on_screen.indexOf(players_numbers[v][s]);
        place_nb_scr[l].style.backgroundColor=color;
    }
}
function now_its_tour(){
    I_AM_IN=""
    click_tour=[0,0,0,0,0]
    let tour_in;
    for(let o=0;o<players;o++){
        if(players_lose.includes(o) || players_nb_say[o]<=0){
            continue;}  
        else{
            tour_in =o;
            break;
        }
    }
    let run=1;
    let time=0
    set_tour(tour_in)
    let color_before=[]
            for(let pp=0;pp<100;pp++)
                color_before.push(place_nb_scr[pp].style.backgroundColor);
    let interval=setInterval(function(){
        if(run==1){
            if(tour_in>players-1){
                clearInterval(interval)
                setTimeout(function(){I_AM_IN=3},2000)
                document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">';
                no_tour()
            }
            if(Math.floor(time)==10 && tour_in==players-1){
                clearInterval(interval)
                setTimeout(function(){I_AM_IN=3},2000)
                document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">';
                no_tour()
                return
            }    
            if(Math.floor(time)==10){
                time=-0.01
                tour_in++;
                if(players_lose.includes(tour_in)|| players_nb_say[tour_in]<=0)
                    tour_in++
                Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
                set_tour(tour_in)
            }
            time+=(1/100)
            tour_time.innerHTML=time.toFixed(1);
            Q_my.onclick=function(){if(players_nb_say[tour_in]>0){players_nb_say[tour_in]--;run=0}}
        }
        if(run==0){
            Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
            document.getElementById("nb_say").style.visibility="visible";
            document.getElementById("nb_say_skip").onclick=function(){
            document.getElementById("nb_say").style.visibility="hidden";
            document.getElementById("input_say").value=""
            players_nb_say[tour_in]++;
            Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
            time=-0.01
            if(tour_in<players-1)
            {
                    tour_in++;
                    if(players_lose.includes(tour_in)|| players_nb_say[tour_in]<=0)
                        tour_in++
                    Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
                    set_tour(tour_in)
                    run=1
            }
            else{
                clearInterval(interval)
                setTimeout(function(){I_AM_IN=3},2000)
                no_tour()
                run=1
            }  
            }
            document.getElementById("nb_say_select").onclick=function(){run=3;
            document.getElementById("nb_say").style.visibility="hidden";
            document.getElementById("decoration").innerHTML="Please choose the square."
            }
        }
        if(run==3){
            nub_plus=Number(document.getElementById("input_say").value);
            if(!(typeof nub_plus == "number" && Number.isInteger(nub_plus))){
                document.getElementById("input_say").value=""
                time=-0.01
            if(tour_in<players-1)
            {
                tour_in++;
                if(players_lose.includes(tour_in)|| players_nb_say[tour_in]<=0)
                    tour_in++
                Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
                set_tour(tour_in)
                run=1
            }
            else{
                clearInterval(interval)
                setTimeout(function(){I_AM_IN=3},2000)
                no_tour()
                run=1
            } 
            place_nb_scr[i].style.backgroundColor=color_before[i]
            document.getElementById("decoration").innerHTML="OUT"
            setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},1000)
            }
            else{
                
            for(let i=0;i<100;i++){
                place_nb_scr[i].onmouseover=function(){
                    if(run==3)
                        this.style.backgroundColor="white"}
                place_nb_scr[i].onmouseout=function(){
                    if(run==3)
                        this.style.backgroundColor=color_before[i]}
                place_nb_scr[i].onclick=function(){
                    if(run==3){
                        click_tour[tour_in]=1
                        result=Number_on_screen[i]+nub_plus;
                    if(result>100 || result<0){
                        time=-0.01
                    if(tour_in<players-1)
                    {
                        tour_in++;
                        if(players_lose.includes(tour_in)||players_nb_say[tour_in]<=0)
                            tour_in++
                        Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
                        set_tour(tour_in)
                        run=1
                        document.getElementById("input_say").value=""
                    }
                    else{
                        clearInterval(interval)
                        setTimeout(function(){I_AM_IN=3},500)
                        no_tour()
                        run=1
                        document.getElementById("input_say").value=""
                    }
                    place_nb_scr[i].style.backgroundColor=color_before[i]
                    document.getElementById("decoration").innerHTML="OUT"
                    document.getElementById("input_say").value=""
                    setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},1000)
                }
                else{
                    let ww=Number_on_screen.indexOf(result)
                    place_nb_scr[ww].style.backgroundColor="white"
                    time=-0.01
                    if(tour_in<players-1)
                    {
                        tour_in++;
                        if(players_lose.includes(tour_in)||players_nb_say[tour_in]<=0)
                            tour_in++
                        Q_my.innerHTML='<img src="../images/light-bulb.png">'.repeat(players_nb_say[tour_in]);
                        set_tour(tour_in)
                        run=1
                        document.getElementById("input_say").value=""
                        document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">';
                    }
                    else{
                        clearInterval(interval)
                        setTimeout(function(){I_AM_IN=3},2000)
                        no_tour()
                        run=1
                        document.getElementById("input_say").value=""
                        document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">';
                    }  
                    run=1
                    document.getElementById("input_say").value=""
                    setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">';
                    place_nb_scr[ww].style.backgroundColor=color_before[ww];
                    place_nb_scr[i].style.backgroundColor=color_before[i];
                    },2000)}}}}}}},10)}
function about_my_numbres(){
    I_AM_IN=""
    document.getElementById("player_said_y").value=""
    document.getElementById("value_y").value=""
    time_place=document.getElementById("time_yourself");
    total_time=60;
    let skip=document.getElementById("yourself_skip");
    let send=document.getElementById("yourself_send");
    let div=document.getElementById("yourself");
    div.style.visibility="visible";
    let interval=setInterval(function(){
        time_place.innerHTML= String(total_time);
        total_time-=1;
        skip.onclick=function(){
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=1},2000)
            div.style.visibility="hidden";
        }
        if(total_time<=0){
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=1},2000)
            div.style.visibility="hidden";
        }
        send.onclick=function(){
            player_said_y=document.getElementById("player_said_y").value - 1
            value_y=document.getElementById("value_y").value
            document.getElementById("player_said_y").value=""
            document.getElementById("value_y").value=""
            div.style.visibility="hidden";
            if(player_said_y>players || player_said_y<0 || !Number.isInteger(player_said_y) || players_lose.includes(player_said_y)){
                document.getElementById("decoration").innerHTML=`Nothing`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                return
            }
            if(players_numbers[player_said_y].includes(Number(value_y))){
                document.getElementById("decoration").innerHTML=`player ${player_said_y+1} find his number`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                place_nb_scr[Number_on_screen.indexOf(Number(value_y))].style.backgroundColor="#626262";
                players_numbers[player_said_y].splice(players_numbers[player_said_y].indexOf(Number(value_y)),1);
                document.getElementById("player"+String(player_said_y+1)).innerHTML=`<p id="player1p" class="playerp">&#128420;<br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_y].length)+`</p><p class="name">Player ${player_said_y+1}</p></div>`
                if(players_numbers[player_said_y].length==0){
                    clearInterval(interval);
                    winner(player_said_y+1);
                }
            }
            else{
                document.getElementById("decoration").innerHTML=`Nothing, false`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                if(players_predict[player_said_y]){
                    players_predict[player_said_y]=false;
                    document.getElementById("player"+String(player_said_y+1)).innerHTML=`<p id="player1p" class="playerp"> <br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_y].length)+`</p><p class="name">Player ${player_said_y+1}</p></div>`
                }
                else{
                    lose(player_said_y+1)
                }
            }
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=6},2000)
        }
    },1000)
}
function About_your_opponent_numbers(){
    I_AM_IN=""
    special2=""
    time_place=document.getElementById("time_oppenent");
    total_time=60;
    let skip=document.getElementById("opponent_skip");
    let send=document.getElementById("opponent_send");
    let div=document.getElementById("opponent");
    div.style.visibility="visible";
    let interval=setInterval(function(){
        time_place.innerHTML= String(total_time);
        total_time-=1;
        skip.onclick=function(){
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=6},3000)
            special2=""
            div.style.visibility="hidden";
            document.getElementById("player_said_p").value="";
            document.getElementById("player_had_p").value="";
            document.getElementById("value_p").value="";

        }
        if(total_time<0){
            clearInterval(interval);
            div.style.visibility="hidden";
            setTimeout(function(){I_AM_IN=6},3000)
            special2=""
            document.getElementById("player_said_p").value="";
            document.getElementById("player_had_p").value="";
            document.getElementById("value_p").value="";
        }
        send.onclick=function(){
            player_said_p=document.getElementById("player_said_p").value - 1;
            player_had_p=document.getElementById("player_had_p").value - 1;
            value_p=document.getElementById("value_p").value;
            div.style.visibility="hidden";
            document.getElementById("player_said_p").value="";
            document.getElementById("player_had_p").value="";
            document.getElementById("value_p").value="";
            if(player_said_p>players || player_said_p<0 || !Number.isInteger(player_said_p) || players_lose.includes(player_said_p)|| player_had_p>players || player_had_p<0 || !Number.isInteger(player_had_p) || players_lose.includes(player_had_p)){
                document.getElementById("decoration").innerHTML=`Nothing`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                return
            }
            if(player_said_p==player_had_p){
                document.getElementById("decoration").innerHTML=`You can't say your number`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                return
            }
            if(players_numbers[player_had_p].includes(Number(value_p))){
                document.getElementById("decoration").innerHTML=`player ${player_had_p+1} your number has been changed`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                place_nb_scr[Number_on_screen.indexOf(Number(value_p))].style.backgroundColor="#626262";
                players_numbers[player_had_p].splice(players_numbers[player_had_p].indexOf(Number(value_p)),1);
                players_numbers[player_had_p].push(random_from(table_no_nb_pl));
                x=players_numbers[player_had_p].length
                //console.log(x)
                place_nb_scr[Number_on_screen.indexOf(players_numbers[player_had_p][x-1])].style.backgroundColor=colors[player_had_p];
                //console.log(players_numbers[player_had_p])
            }
            else{
                document.getElementById("decoration").innerHTML=`Nothing, false`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                if(players_predict[player_said_p]){
                    players_predict[player_said_p]=false;
                    document.getElementById("player"+String(player_said_p+1)).innerHTML=`<p id="player1p" class="playerp"> <br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_p].length)+`</p><p class="name">Player ${player_said_p+1}</p></div>`
                }
                else{
                    lose(player_said_p+1)
                }
            }
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=5},2500);
            special2=player_said_p;
        }
    },1000)
}
function winner(pl){
    div=document.getElementById("winner");
    winner=document.getElementById("winner_name");
    div.style.visibility="visible";
    winner.innerHTML="Player "+pl
}
function lose(pl){
    div=document.getElementById("lose"+String(pl));
    div.style.visibility="visible"
    div.style.top=String(positions[pl-1][0])+"px"
    div.style.left=String(positions[pl-1][1])+"%"
    players_lose.push(pl-1)
    console.log(players_lose)
    for(let i =0;i<players_numbers[pl-1].length;i++){
        x=Number_on_screen.indexOf(players_numbers[pl-1][i])
        place_nb_scr[x].style.backgroundColor="#626262"
    }
}
function Special_about_my_numbres(pl){
    if(players_lose.includes(pl-1)){
        special=""
        for(let s=pl;s<players;s++){
            if(click_tour[s]){
                special=s;
                break;
            }
            else{
                if(s==players-1){
                    special=""
                    setTimeout(function(){I_AM_IN=4},3000)
                }
            }
        }
        return;
    }
    I_AM_IN=""
    special=""
    time_place=document.getElementById("time_yourself");
    total_time=60;
    let skip=document.getElementById("yourself_skip");
    let send=document.getElementById("yourself_send");
    let div=document.getElementById("yourself");
    div.style.visibility="visible";
    let player_said_y_i=document.getElementById("player_said_y")
    player_said_y_i.value=pl;
    let player_said_y=pl-1
    player_said_y_i.readOnly=true;
    let interval=setInterval(function(){
        time_place.innerHTML= String(total_time);
        total_time-=1;
        skip.onclick=function(){
            clearInterval(interval);
            special=""
            for(let s=pl;s<players;s++){
                if(click_tour[s]){
                    special=s;
                    setTimeout(function(){special=s;},1000)
                    break;
                }
                else{
                    if(s==players-1){
                        special=""
                        setTimeout(function(){I_AM_IN=4},3000)
                    }
                }
            }
            player_said_y_i.readOnly=false;
            div.style.visibility="hidden";
        }
        if(total_time<=0){
            clearInterval(interval);
            special=""
            for(let s=pl;s<players;s++){
                if(click_tour[s]){
                    setTimeout(function(){special=s;},1000)
                    break;
                }
                else{
                    if(s==players-1){
                        special=""
                        setTimeout(function(){I_AM_IN=4},3000)
                    }
                }
            }
            player_said_y_i.readOnly=false;
            div.style.visibility="hidden";
        }
        send.onclick=function(){
            value_y=document.getElementById("value_y").value
            document.getElementById("player_said_y").value=""
            document.getElementById("value_y").value=""
            div.style.visibility="hidden";
            if(player_said_y>players || player_said_y<0 || !Number.isInteger(player_said_y) || players_lose.includes(player_said_y)){
                document.getElementById("decoration").innerHTML=`Nothing`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                return
            }
            if(players_numbers[player_said_y].includes(Number(value_y))){
                document.getElementById("decoration").innerHTML=`player ${player_said_y+1} find his number`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                place_nb_scr[Number_on_screen.indexOf(Number(value_y))].style.backgroundColor="#626262";
                players_numbers[player_said_y].splice(players_numbers[player_said_y].indexOf(Number(value_y)),1);
                document.getElementById("player"+String(player_said_y+1)).innerHTML=`<p id="player1p" class="playerp">&#128420;<br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_y].length)+`</p><p class="name">Player ${player_said_y+1}</p></div>`
                if(players_numbers[player_said_y].length==0){
                    clearInterval(interval);
                    player_said_y_i.readOnly=false;
                    winner(player_said_y+1)
                }
            }
            else{
                document.getElementById("decoration").innerHTML=`Nothing, false`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                if(players_predict[player_said_y]){
                    players_predict[player_said_y]=false;
                    document.getElementById("player"+String(player_said_y+1)).innerHTML=`<p id="player1p" class="playerp"> <br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_y].length)+`</p><p class="name">Player ${player_said_y+1}</p></div>`
                }
                else{
                    lose(player_said_y+1)
                }
            }
            clearInterval(interval);
            I_AM_IN=3
            special=pl-1
            player_said_y_i.readOnly=false;
            
        }
    },1000)
}
function Special_About_your_opponent_numbers(pl){
    if(players_lose.includes(pl-1)){
        setTimeout(function(){I_AM_IN=4},1500)
        special2=""
        return;
    }
    I_AM_IN=""
    special2=""
    time_place=document.getElementById("time_yourself");
    total_time=60;
    let skip=document.getElementById("yourself_skip");
    let send=document.getElementById("yourself_send");
    let div=document.getElementById("yourself");
    div.style.visibility="visible";
    let player_said_y_i=document.getElementById("player_said_y")
    player_said_y_i.value=pl;
    let player_said_y=pl-1
    player_said_y_i.readOnly=true;
    let interval=setInterval(function(){
        time_place.innerHTML= String(total_time);
        total_time-=1;
        skip.onclick=function(){
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=4},1500)
            special2=""
            player_said_y_i.readOnly=false;
            div.style.visibility="hidden";
        }
        if(!total_time){
            clearInterval(interval);
            setTimeout(function(){I_AM_IN=4},1500)
            special2=""
            player_said_y_i.readOnly=false;
            div.style.visibility="hidden";
        }
        send.onclick=function(){
            value_y=document.getElementById("value_y").value
            document.getElementById("player_said_y").value=""
            document.getElementById("value_y").value=""
            div.style.visibility="hidden";
            if(player_said_y>players || player_said_y<0 || !Number.isInteger(player_said_y) || players_lose.includes(player_said_y)){
                document.getElementById("decoration").innerHTML=`Nothing`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                return
            }
            if(players_numbers[player_said_y].includes(Number(value_y))){
                document.getElementById("decoration").innerHTML=`player ${player_said_y+1} find his number`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                place_nb_scr[Number_on_screen.indexOf(Number(value_y))].style.backgroundColor="#626262";
                players_numbers[player_said_y].splice(players_numbers[player_said_y].indexOf(Number(value_y)),1);
                document.getElementById("player"+String(player_said_y+1)).innerHTML=`<p id="player1p" class="playerp">&#128420;<br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_y].length)+`</p><p class="name">Player ${player_said_y+1}</p></div>`
                if(players_numbers[player_said_y].length==0){
                    clearInterval(interval);
                    player_said_y_i.readOnly=false;
                    winner(player_said_y+1)
                }
            }
            else{
                document.getElementById("decoration").innerHTML=`Nothing, false`;
                setTimeout(function(){document.getElementById("decoration").innerHTML='<img class="dc" src="../images/pawn.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/crown.png">&nbsp;&nbsp;&nbsp;<img class="dc" src="../images/pawn.png">'},5000)
                if(players_predict[player_said_y]){
                    players_predict[player_said_y]=false;
                    document.getElementById("player"+String(player_said_y+1)).innerHTML=`<p id="player1p" class="playerp"> <br>`+'<img src="../images/lost-items.png"> '.repeat(players_numbers[player_said_y].length)+`</p><p class="name">Player ${player_said_y+1}</p></div>`
                }
                else{
                    lose(player_said_y+1)
                }
            }
            clearInterval(interval);
            I_AM_IN=4
            special2=""
            player_said_y_i.readOnly=false;
            
        }
    },1000)
}
let click_tour=[0,0,0,0,0]
let I_AM_IN=0
let special=""
let special2=""
document.getElementById("Awesome").onclick=function(){
    I_AM_IN=1;
    document.getElementById("start").style.visibility="hidden"
}
setInterval(function(){
    if(I_AM_IN==1){
        random_nb_on_scr()
    }
},10)
setInterval(function(){
    if(I_AM_IN==2){
        now_its_tour()
    }
},10)

setInterval(function(){
    if(I_AM_IN==3){
        for(let s=0;s<players&&special=="";s++){
            if(click_tour[s]){
                special=s;
                break;
            }
            else{
                if(s==players-1){
                    special=""
                    setTimeout(function(){I_AM_IN=4},3000)
                }
            }
        }
        setInterval(function(){
            if(special===0){
                Special_about_my_numbres(special+1)
            }
        },10)
        setInterval(function(){
            if(special==1){
                Special_about_my_numbres(special+1)
            }
        },10)
        setInterval(function(){
            if(special==2){
                Special_about_my_numbres(special+1)
            }
        },10)
        setInterval(function(){
            if(special==3){
                Special_about_my_numbres(special+1)
            }
        },10)
        setInterval(function(){
            if(special==4){
                Special_about_my_numbres(special+1)
            }
        },10)
    }
},10)
setInterval(function(){
    if(I_AM_IN==4){
        About_your_opponent_numbers()
    }
},10)
setInterval(function(){
    if(I_AM_IN==5){
        setInterval(function(){
            if(special2===0){
                Special_About_your_opponent_numbers(special2+1)
            }
        },10)
        setInterval(function(){
            if(special2==1){
                Special_About_your_opponent_numbers(special2+1)
            }
        },10)
        setInterval(function(){
            if(special2==2){
                Special_About_your_opponent_numbers(special2+1)
            }
        },10)
        setInterval(function(){
            if(special2==3){
                Special_About_your_opponent_numbers(special2+1)
            }
        },10)
        setInterval(function(){
            if(special2==4){
                Special_About_your_opponent_numbers(special2+1)
            }
        },10)
    }
},10)
setInterval(function(){
    if(I_AM_IN==6){
        about_my_numbres()
    }
},10)