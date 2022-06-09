import { showModal} from './modal'

export function showWinnerModal(fighter) {
  // call showModal function 
const winnerInfo = {
  title: 'WINNER',
  bodyElement: fighter.name
}

showModal(winnerInfo);
}
