import { showModal} from './modal'

export function showWinnerModal(fighter) {
const winnerInfo = {
  title: 'WINNER',
  bodyElement: fighter.name
}

showModal(winnerInfo);
}
