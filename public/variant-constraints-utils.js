/**
 * Variant Constraints Utility
 * 
 * Utility functies voor het werken met variant constraints
 * Laad dit bestand in je HTML: <script src="variant-constraints-utils.js"></script>
 */

let variantConstraints = null;

/**
 * Laad de constraints configuratie
 * @returns {Promise<Object>} De constraints configuratie
 */
async function loadVariantConstraints() {
  if (variantConstraints) {
    return variantConstraints;
  }
  
  try {
    const response = await fetch('variant-constraints.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    variantConstraints = await response.json();
    return variantConstraints;
  } catch (error) {
    console.error('Fout bij het laden van variant constraints:', error);
    return null;
  }
}

/**
 * Haal constraints op voor een specifieke variant
 * @param {string} type - Het type: 'raam', 'deur', of 'glas'
 * @param {string} variant - De variant naam (bijv. 'draaikiep', 'deur_buiten')
 * @returns {Promise<Object|null>} De constraints voor deze variant of null
 */
async function getVariantConstraints(type, variant) {
  const constraints = await loadVariantConstraints();
  if (!constraints || !constraints[type] || !constraints[type][variant]) {
    return null;
  }
  return constraints[type][variant];
}

/**
 * Valideer afmetingen voor een variant
 * @param {string} type - Het type: 'raam', 'deur', of 'glas'
 * @param {string} variant - De variant naam
 * @param {number} breedte - De breedte in millimeters
 * @param {number} hoogte - De hoogte in millimeters
 * @returns {Promise<{valid: boolean, errors: string[]}>} Validatie resultaat
 */
async function validateVariantDimensions(type, variant, breedte, hoogte) {
  const constraints = await getVariantConstraints(type, variant);
  
  if (!constraints) {
    // Geen constraints gedefinieerd, alles is toegestaan
    return { valid: true, errors: [] };
  }
  
  const errors = [];
  
  // Valideer breedte
  if (constraints.minBreedte !== null && breedte < constraints.minBreedte) {
    errors.push(`Minimale breedte is ${constraints.minBreedte}mm (huidig: ${breedte}mm)`);
  }
  
  if (constraints.maxBreedte !== null && breedte > constraints.maxBreedte) {
    errors.push(`Maximale breedte is ${constraints.maxBreedte}mm (huidig: ${breedte}mm)`);
  }
  
  // Valideer hoogte
  if (constraints.minHoogte !== null && hoogte < constraints.minHoogte) {
    errors.push(`Minimale hoogte is ${constraints.minHoogte}mm (huidig: ${hoogte}mm)`);
  }
  
  if (constraints.maxHoogte !== null && hoogte > constraints.maxHoogte) {
    errors.push(`Maximale hoogte is ${constraints.maxHoogte}mm (huidig: ${hoogte}mm)`);
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Haal alle beschikbare varianten op voor een type
 * @param {string} type - Het type: 'ramen', 'deuren', of 'glas'
 * @returns {Promise<string[]>} Array met variant namen
 */
async function getAvailableVariants(type) {
  const constraints = await loadVariantConstraints();
  if (!constraints || !constraints[type]) {
    return [];
  }
  return Object.keys(constraints[type]);
}

/**
 * Haal de opmerking op voor een variant
 * @param {string} type - Het type: 'raam', 'deur', of 'glas'
 * @param {string} variant - De variant naam
 * @returns {Promise<string|null>} De opmerking of null
 */
async function getVariantNote(type, variant) {
  const constraints = await getVariantConstraints(type, variant);
  return constraints ? constraints.opmerking : null;
}

/**
 * Reset de cached constraints (handig voor development)
 */
function resetVariantConstraints() {
  variantConstraints = null;
}

// Export voor gebruik in modules (als je modules gebruikt)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadVariantConstraints,
    getVariantConstraints,
    validateVariantDimensions,
    getAvailableVariants,
    getVariantNote,
    resetVariantConstraints
  };
}

