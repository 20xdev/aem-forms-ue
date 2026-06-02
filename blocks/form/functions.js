const baseUrl = 'https://silly-show-door-translator.trycloudflare.com/api';

/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
* Masks the first 5 digits of the mobile number with *
* @param {*} mobileNumber
* @returns {string} returns the mobile number with first 5 digits masked
*/
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }
  const value = mobileNumber.toString();
  // Mask first 5 digits and keep the rest
  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}

/**
 * @name sendOtp
 * @param {object} mobile
 * @param {object} ssn
 * @param {object} sessionId
 * @param {object} maskedMobile
 * @param {object} attemptsLeft
 * @param {object} expiresInSeconds
 * @param {object} otpMessage
 * @param {scope} scope
 * @returns {string}
 */
function sendOtp(
  mobile,
  ssn,
  sessionId,
  maskedMobile,
  attemptsLeft,
  expiresInSeconds,
  otpMessage,
) {
  fetch(`${baseUrl}/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mobile: mobile.value,
      ssn: ssn.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      sessionId.value = data.sessionId || '';
      maskedMobile.value = data.maskedMobile || '';
      attemptsLeft.value = data.attemptsLeft || '';
      expiresInSeconds.value = data.expiresInSeconds || '';
      if (otpMessage) otpMessage.value = `OTP sent to ${data.maskedMobile}`;
    })
    .catch(() => {
      if (otpMessage) otpMessage.value = 'Failed to send OTP.';
    });

  return 'Sending OTP...';
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber, sendOtp,
};
