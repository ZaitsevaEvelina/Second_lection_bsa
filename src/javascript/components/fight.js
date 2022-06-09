import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {

    const healthBarContainer = document.getElementsByClassName('arena___health-bar');
    const healthBars = [...healthBarContainer];
    const statusInfo = {
      block: false,
      currentHealth: 100,
      critRelease: false,
      timeOfCrit: 0,
      critInput: [] 
    }

    const playerOne = {...firstFighter, ...statusInfo, healthBar: healthBars[0]};
    const playerTwo = {...secondFighter, ...statusInfo, healthBar: healthBars[1]};

    function attackRelease(attacker, defender){
      const totalDamage = getDamage(attacker, defender);

      attacker.block = false;
      defender.currentHealth = defender.currentHealth - totalDamage /defender.health * 100;
      if(defender.currentHealth < 0){
        resolve(attacker);
      }

      defender.healthBar.style.width = `${defender.currentHealth}%`;
    }

    function critHandler(fighter) {
      const currentTime = Date.now();

      if(currentTime - fighter.timeOfCrit < 1000){
        return false;
      } 

      if(!fighter.critInput.includes(event.code)){
        fighter.critInput.push(event.code);
      }

      if(fighter.critInput.length === 3){
        fighter.critRelease = true;
        fighter.timeOfCrit = currentTime;
        return true;
      }
    }

    function onDown(event){
      if(!event.repeat) {
        switch(event.code){
          case controls.PlayerOneAttack: {
            attackRelease(playerOne, playerTwo);
            break;
          }
          
          case controls.PlayerTwoAttack: {
            attackRelease(playerTwo, playerOne);
            break;
          }

          case controls.PlayerOneBlock: {
            playerOne.block = true;
            block;
          }

          case controls.PlayerTwoBlock: {
            playerTwo.block = true;
            block;
          }
        }

        if(controls.PlayerOneCriticalHitCombination.includes(event.code)){
          critHandler(playerOne) ? attackRelease(playerOne, playerTwo) : null;
        }

        
        if(controls.PlayerTwoCriticalHitCombination.includes(event.code)){
          critHandler(playerTwo) ? attackRelease(playerOne, playerTwo) : null;
        }
      }
    }

    function onUp(event){
      switch(event.code){
        case controls.PlayerOneBlock: playerOne.block= false; break;
        case controls.PlayerTwoBlock: playerTwo.block= false; break;
        }

        if(playerOne.critInput.includes(event.code)){
          playerOne.critInput.slice(playerOne.critInput.indexOf(event.code), 1);
        }

        if(playerTwo.critInput.includes(event.code)){
          playerTwo.critInput.slice(playerTwo.critInput.indexOf(event.code), 1);
        }
      }


      document.addEventListener('keydown', onDown);
      document.addEventListener('keyup', onUp);
  });
}

export function getDamage(attacker, defender) {
  const damage= getHitPower(attacker) - getBlockPower(defender);
  return  damage > 0 ? damage : 0;

}

export function getHitPower(fighter) {
  const criticalHitChance  = fighter.critRelease ? 2 : Math.random() + 1;
  fighter.critRelease = false;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  if(!fighter.block){
    return 0;
  }
    const dodgeChanse = fighter.critRelease ? 2: Math.random() +1;
    return fighter.defence * dodgeChanse;
  
}
