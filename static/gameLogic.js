
function GameLogic(rowCount,blockClass,pickBoxElClass,colorAtribute) {

    const $ = (selector,isAll=false)=>{
        return  (isAll)? Array.from(document.querySelectorAll(selector)):document.querySelector(selector);
    }
    const selectAll = true;

    this.blockClass = blockClass; 
    this.pickBoxElClass = pickBoxElClass ;
    this.colorAtribute = colorAtribute; 
   

    this.rowCount = rowCount;
    this.amountStep = 0;
    this.playerName = false;
    this.isFinish = ()=> $(`.${pickBoxElClass}`,true).length === $(`.${blockClass}`,true).length;
    this.getBlocks = ()=>$(`.${blockClass}`,selectAll);
    this.indexPickElCol = new Set([0]); 
   
   this.setPlayerName = ()=>{
       const textMes = "For start, please enter your name";

       const playerName = (prompt(textMes,"")).trim();

       if(playerName) {

            this.playerName = playerName;
       }  else {
           this.setPlayerName();
       }
   }

   this.handler =  event => {
      
       if( !this.playerName ) {
           this.setPlayerName();
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
        this.playerName = false;
        
    }

    this.isVin = ()=>{

        if( this.isFinish() ) {

            alert(`${this.playerName} you did it on the ${this.amountStep} moves`);
        
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