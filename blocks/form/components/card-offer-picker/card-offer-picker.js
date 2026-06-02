import { subscribe } from '../../rules/index.js';
import getCatalog from './catalog.js';

function getCatalogItems(fieldModel) {
  const key = fieldModel?.cardCatalogKey || 'default-credit-cards';
  return getCatalog(key);
}

function resolveAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const base = window.hlx?.codeBasePath || '';
  return `${base}${path}`;
}

function getCardData(fieldModel, input, index) {
  const cards = getCatalogItems(fieldModel);
  return cards.find((card) => card.id === input.value) || cards[index];
}

function getDisplayLabel(fieldModel, input, index) {
  const enumNames = fieldModel?.enumNames || [];
  const display = enumNames[index];

  if (typeof display === 'string') return display;
  if (display?.name) return display.name;

  const card = getCardData(fieldModel, input, index);
  if (card?.name) return card.name;

  return input?.value || `Option ${index + 1}`;
}

function createCardMarkup(fieldModel, input, index) {
  const card = getCardData(fieldModel, input, index);
  const title = getDisplayLabel(fieldModel, input, index);

  const content = document.createElement('div');
  content.className = 'card-offer-picker__content';

  if (card?.image) {
    const image = document.createElement('img');
    image.className = 'card-offer-picker__image';
    image.src = resolveAssetUrl(card.image);
    image.alt = card.imageAlt || title;
    image.loading = 'lazy';
    content.appendChild(image);
  }

  const titleEl = document.createElement('h3');
  titleEl.className = 'card-offer-picker__title';
  titleEl.textContent = title;
  content.appendChild(titleEl);

  if (card?.tagline) {
    const tagline = document.createElement('p');
    tagline.className = 'card-offer-picker__tagline';
    tagline.textContent = card.tagline;
    content.appendChild(tagline);
  }

  if (card?.rewardsRate) {
    const rewardsRate = document.createElement('p');
    rewardsRate.className = 'card-offer-picker__rewards-rate';
    rewardsRate.textContent = card.rewardsRate;
    content.appendChild(rewardsRate);
  }

  if (card?.rewardsDescription) {
    const rewardsDescription = document.createElement('p');
    rewardsDescription.className = 'card-offer-picker__rewards-description';
    rewardsDescription.textContent = card.rewardsDescription;
    content.appendChild(rewardsDescription);
  }

  if (card?.joiningFee) {
    const joiningFee = document.createElement('p');
    joiningFee.className = 'card-offer-picker__fee';
    joiningFee.textContent = card.joiningFee;
    content.appendChild(joiningFee);
  }

  if (card?.applicationAmount) {
    const applicationAmount = document.createElement('p');
    applicationAmount.className = 'card-offer-picker__amount';
    applicationAmount.textContent = card.applicationAmount;
    content.appendChild(applicationAmount);
  }

  return content;
}

function updateSelectedState(fieldDiv) {
  fieldDiv.querySelectorAll('.radio-wrapper').forEach((wrapper) => {
    const input = wrapper.querySelector('input');
    wrapper.classList.toggle('is-selected', Boolean(input?.checked));
  });
}

function decorateCards(fieldDiv, fieldModel) {
  fieldDiv.classList.add('card-offer-picker');

  [...fieldDiv.querySelectorAll('.radio-wrapper')].forEach((wrapper, index) => {
    const input = wrapper.querySelector('input');
    if (!input) return;

    wrapper.classList.add('card-offer-picker__item');

    wrapper.innerHTML = '';
    input.classList.add('card-offer-picker__input');
    wrapper.appendChild(input);
    wrapper.appendChild(createCardMarkup(fieldModel, input, index));

    wrapper.onclick = (event) => {
      if (event.target !== input) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };
  });

  updateSelectedState(fieldDiv);
}

export default function decorate(fieldDiv, fieldModel, formId) {
  decorateCards(fieldDiv, fieldModel);

  fieldDiv.addEventListener('change', (event) => {
    event.stopPropagation();

    if (event.target?.value !== undefined) {
      fieldModel.value = event.target.value;
      updateSelectedState(fieldDiv);
    }
  });

  subscribe(fieldDiv, formId, (div, model) => {
    model.subscribe((e) => {
      const changes = e?.payload?.changes || [];
      changes.forEach((change) => {
        if (['enum', 'enumNames', 'value', 'cardCatalogKey'].includes(change.propertyName)) {
          decorateCards(div, model);
          updateSelectedState(div);
        }
      });
    });
  });
}
