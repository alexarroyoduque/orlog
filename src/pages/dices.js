function getDiceWithSpecialFaces(faceTypes) {
  let diceModel = {
    isSelected: false,
    isSaved: false,
    faces: [
      {id: 0, icon: '🪓', amount: 1, type: 'axe', isVisible: true},
      {id: 1, icon: '🛡️', amount: 1, type: 'shield', isVisible: false},
      {id: 2, icon: '🏹', amount: 1, type: 'arrow', isVisible: false},
      {id: 3, icon: '🪓', amount: 1, type: 'axe', isVisible: false},
      {id: 4, icon: '⛑️', amount: 1, type: 'helmet', isVisible: false},
      {id: 5, icon: '🖐️', amount: 1, type: 'hand', isVisible: false}
    ]
  };

  faceTypes.forEach(faceType => {
    diceModel.faces.find(face => face.type === faceType).isSpecial = true;
  });

  return diceModel;
}

let dices = [
  getDiceWithSpecialFaces(['arrow', 'hand']),
  getDiceWithSpecialFaces(['shield', 'hand']),
  getDiceWithSpecialFaces(['arrow', 'helmet']),
  getDiceWithSpecialFaces(['hand', 'helmet']),
  getDiceWithSpecialFaces(['shield', 'arrow']),
  getDiceWithSpecialFaces(['shield', 'helmet'])
];

dices.map((dice, index) =>  dice.id = index);

export function getDices() {
  return dices;
}