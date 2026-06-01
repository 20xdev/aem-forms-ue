import { subscribe } from '../../rules/index.js';

function getDisplayLabel(fieldModel, input, index) {
  const enumNames = fieldModel?.enumNames || [];
  const display = enumNames[index];

  if (typeof display === 'string') return display;
  if (display?.name) return display.name;
  if (input?.value) return input.value;

  return `Option ${index + 1}`;
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
    wrapper.classList.add('card-offer-picker__item');

    const input = wrapper.querySelector('input');
    if (!input) return;

    let label = wrapper.querySelector('label');
    if (!label) {
      label = document.createElement('label');
      wrapper.appendChild(label);
    }

    label.textContent = getDisplayLabel(fieldModel, input, index);

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
        if (['enum', 'enumNames', 'value'].includes(change.propertyName)) {
          decorateCards(div, model);
          updateSelectedState(div);
        }
      });
    });
  });
}
