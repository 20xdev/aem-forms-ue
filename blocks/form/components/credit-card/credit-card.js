import { createOptimizedPicture } from '../../../../scripts/aem.js';
import { subscribe } from '../../rules/index.js';

function createCard(fieldDiv, enums) {
  fieldDiv.querySelectorAll('.radio-wrapper').forEach((radioWrapper, index) => {
    if (enums[index]?.name) {
      let label = radioWrapper.querySelector('label');
      if (!label) {
        label = document.createElement('label');
        radioWrapper.appendChild(label);
      }
      label.textContent = enums[index].name;
    }

    radioWrapper.querySelector('input').dataset.index = index;

    const image = createOptimizedPicture(
      enums[index]?.image || 'https://main--aem-forms-ue--20xdev.aem.page/icons/card-placeholder.png',
      'card-image',
    );
    radioWrapper.appendChild(image);
  });
}

export default async function decorate(fieldDiv, fieldJson, parentElement, formId) {
  fieldDiv.classList.add('credit-card');
  createCard(fieldDiv, fieldJson.enum || []);

  subscribe(fieldDiv, formId, (element, fieldModel) => {
    fieldModel.subscribe((e) => {
      const { payload } = e;
      payload?.changes?.forEach((change) => {
        if (change?.propertyName === 'enum') {
          createCard(fieldDiv, change.currentValue);
        }
      });
    });

    fieldDiv.addEventListener('change', (e) => {
      e.stopPropagation();
      const value = fieldModel.enum?.[parseInt(e.target.dataset.index, 10)];
      fieldModel.value = value?.name;
    });
  });

  return fieldDiv;
}
