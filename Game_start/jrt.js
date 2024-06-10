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