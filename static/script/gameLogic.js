
function GameLogic(rowCount,blockClass,pickBoxElClass,colorAtribute) {

    const $ = (selector,isAll=false)=>{
        return  (isAll)? Array.from(document.querySelectorAll(selector)):document.querySelector(selector);
    }

    const selectAll = true;
    const checkLoginReqExp = new RegExp('^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$');
    
    this.blockClass = blockClass; 
    this.pickBoxElClass = pickBoxElClass ;
    this.colorAtribute = colorAtribute; 
   

    this.rowCount = rowCount;
    this.amountStep = 0;
    this.namePlayer = false;
    this.isFinish = ()=> $(`.${pickBoxElClass}`,true).length === $(`.${blockClass}`,true).length;
    this.getBlocks = ()=>$(`.${blockClass}`,selectAll);
    this.indexPickElCol = new Set([0]); 
   
   this.setnamePlayer = ()=>{
       const textMes = "For start, please enter your name";

       const namePlayer = (prompt(textMes,"")).trim();

       if( checkLoginReqExp.test(namePlayer) ) {

            this.namePlayer = namePlayer;
       }  else {
           this.setnamePlayer();
       }
   }

   this.handler =  event => {
      
       if( !this.namePlayer ) {
           this.setnamePlayer();
       }
    const {pickBoxElClass,indexPickElCol,getBlocks,rowCount,colorAtribute} = this;
       
        const checkDataColor = checklAttributeТNeighbors.bind(null, colorAtribute);
    
        const elTarget = event.target; 
        

        if(isNeighbors(indexPickElCol,getBlocks(),elTarget,rowCount)) {
           
            this.amountStep++;
            
            propagateClass(elTarget,checkDataColor,pickBoxElClass,indexPickElCol,getBlocks(),rowCount);

            const pickColor = elTarget.getAttribute( colorAtribute);
            
            const pickSquare = $(`.${pickBoxElClass}`,selectAll); 
                pickSquare.forEach(el=>{
                    el.setAttribute( colorAtribute,pickColor);
                })

        }
    
    }

    this.reset = ()=> {
      
        this.amountStep = 0;
        this.indexPickElCol = new Set([0]);
        this.namePlayer = false;
        
    }

    this.isVin = ()=>{

        if( this.isFinish() ) {

            const {namePlayer,amountStep} = this;
            alert(`${namePlayer} you did it on the ${amountStep} moves`);
            const reqOpt = {
                method:"post",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    namePlayer,
                    amountStep
                })
            };
           
            fetch('/session',reqOpt)
            .then(function(response) {
               
                if(response.status === 200) {
                    const message = `${namePlayer} your result success save in db`
                    alert(message)
                } else {
                    const badMes = ` sorry ${namePlayer} your result not save in db`;
                    alert(badMes);
                }
            }).catch( err=>{
                console.log(err)
                
            });
        
        }
    }

    function propagateClass(targetEl,fnCheck,classPropag,picksIndexSBox,boxesEl,rowCount) {

        targetEl.classList.add(classPropag);
       
        picksIndexSBox.add(boxesEl.indexOf(targetEl));
    
       
        const neighborsEl =  getNeighbors(boxesEl,targetEl,rowCount);

        for(el of neighborsEl){ 

            if(fnCheck(el,targetEl)) {

                picksIndexSBox.add(boxesEl.indexOf(el));
                el.classList.add(classPropag);
            
            }
        }
    
    }

    function checklAttributeТNeighbors(atributeName,element1,element2) {

        
        const atributValEl1 = element1.getAttribute(atributeName);
        const atributValEl2 = element2.getAttribute(atributeName);

        return atributValEl1 === atributValEl2;
    }

    function isNeighbors(elindS,elS,el,countRow) {
       
        const targetInd = elS.indexOf(el);
    
        return Array.from(elindS).some(ind=>ind+1 === targetInd || ind-1 === targetInd || ind+countRow === targetInd || ind-countRow === targetInd);
        
    }

    function getNeighbors(Mas,el,coutRow) {
       
        const targetInd = Mas.indexOf(el);
        const response = [];
        const stepForNeighbors = [1,-1,coutRow,-coutRow];
        
        stepForNeighbors.forEach(step=>{

            const indePlusStep = targetInd+step;
            const Elneighbors = Mas[indePlusStep];

            if(Elneighbors ) {

                response.push(Elneighbors);
            }
        })
        return response;
    }
}