import { createOptimizedPicture } from '../../../../scripts/aem.js';
import { subscribe } from '../../rules/index.js';

function renderCard(radioWrapper, data, label) {
  const input = radioWrapper.querySelector('input');
  radioWrapper.innerHTML = '';
  radioWrapper.appendChild(input);

  const header = document.createElement('div');
  header.className = 'card-header';
  const name = document.createElement('h3');
  name.className = 'card-name';
  name.textContent = label;
  const tagline = document.createElement('p');
  tagline.className = 'card-tagline';
  tagline.textContent = data?.tagline || '';
  header.appendChild(name);
  header.appendChild(tagline);

  const image = createOptimizedPicture(data?.image || '', label);
  image.classList.add('card-image');

  const details = document.createElement('ul');
  details.className = 'card-details';
  [data?.rewardsRate, data?.rewardsDescription, data?.joiningFee].forEach((line) => {
    if (line) {
      const li = document.createElement('li');
      li.textContent = line;
      details.appendChild(li);
    }
  });

  const amount = document.createElement('div');
  amount.className = 'card-amount';
  amount.innerHTML = `<span>Application amount</span><strong>${data?.applicationAmount || ''}</strong>`;

  radioWrapper.appendChild(header);
  radioWrapper.appendChild(image);
  radioWrapper.appendChild(details);
  radioWrapper.appendChild(amount);
}

function buildCards(fieldDiv, enums, enumNames, catalog) {
  const catalogById = (catalog || []).reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  fieldDiv.querySelectorAll('.radio-wrapper').forEach((radioWrapper, index) => {
    const enumValue = enums[index];
    const enumLabel = enumNames?.[index] || enumValue;
    radioWrapper.querySelector('input').dataset.index = index;
    renderCard(radioWrapper, catalogById[enumValue], enumLabel);
  });
}

export default async function decorate(fieldDiv, fieldJson, parentElement, formId) {
  console.log('credit-card fieldJson:', JSON.stringify(fieldJson, null, 2));
  fieldDiv.classList.add('credit-card');
  const catalog = fieldJson.properties?.['fd:cardCatalog'] || [];
  buildCards(fieldDiv, fieldJson.enum || [], fieldJson.enumNames || [], catalog);

  subscribe(fieldDiv, formId, (element, fieldModel) => {
    fieldModel.subscribe((e) => {
      const { payload } = e;
      payload?.changes?.forEach((change) => {
        if (change?.propertyName === 'enum') {
          buildCards(
            fieldDiv,
            change.currentValue,
            fieldModel.enumNames,
            fieldModel.properties?.['fd:cardCatalog'] || catalog,
          );
        }
      });
    });

    fieldDiv.addEventListener('change', (e) => {
      e.stopPropagation();
      const idx = parseInt(e.target.dataset.index, 10);
      fieldModel.value = fieldModel.enum?.[idx];
    });
  });

  return fieldDiv;
}
