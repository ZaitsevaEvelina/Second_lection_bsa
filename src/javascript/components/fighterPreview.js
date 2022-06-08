import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });


  function createProperty(keyValue) {
    const nameElement = createElement({ tagName: 'span', className: 'fighter-preview_property'});
    nameElement.innerText = keyValue.join(':').replace(/(\w+):/, subStr => subStr.toUpperCase());

    return nameElement;
  }

  function createPreviewImage(source){
    const attributes = { src: source};
    const imgElement = createElement({
      tagName: 'img',
      className: 'fighter-image___preview',
      attributes
    });

    return imgElement;
  }

  if(fighter) {
    const keyValueArrayOfObject = Object.entries(fighter);
    fighterElement.append(createPreviewImage(fighter['source']));
    keyValueArrayOfObject.filter(keyValueAll => keyValueAll[0] !== '_id' && keyValueAll[0] !== 'source')
    .forEach(keyValue => fighterElement.append(createProperty(keyValue)));
  }
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
