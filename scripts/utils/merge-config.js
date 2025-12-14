const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const PROJECT_ROOT = process.cwd();
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const SYNCED_DATA_PATH = path.join(DATA_DIR, 'synced_sections.json');
const USER_CONF_PATH = path.join(PROJECT_ROOT, 'user-data', 'conf.yml');

/**
 * Merge synced remote data with user customizations
 * Priority: user-data/conf.yml > data/synced_sections.json
 * 
 * @returns {Object} Merged configuration object
 */
function mergeConfigurations() {
    // 1. Load remote synced data (base data)
    let syncedSections = [];
    if (fs.existsSync(SYNCED_DATA_PATH)) {
        try {
            const syncedContent = fs.readFileSync(SYNCED_DATA_PATH, 'utf8');
            syncedSections = JSON.parse(syncedContent);
        } catch (error) {
            console.error('Error loading synced data:', error.message);
        }
    }

    // 2. Load user configuration
    let userConf = {
        sections: []
    };
    if (fs.existsSync(USER_CONF_PATH)) {
        try {
            const userContent = fs.readFileSync(USER_CONF_PATH, 'utf8');
            userConf = yaml.load(userContent) || { sections: [] };
        } catch (error) {
            console.error('Error loading user config:', error.message);
        }
    }

    // 3. Merge logic
    const mergedSections = [];
    const processedSectionNames = new Set();

    // First: Process user config sections (highest priority)
    if (userConf.sections && userConf.sections.length > 0) {
        for (const userSection of userConf.sections) {
            const syncedSection = syncedSections.find(s => s.name === userSection.name);

            if (syncedSection) {
                // Section exists in both: merge items
                processedSectionNames.add(userSection.name);
                const mergedItems = mergeSectionItems(syncedSection.items || [], userSection.items || []);
                mergedSections.push({
                    ...syncedSection,  // Base data from sync
                    ...userSection,    // User overrides (icon, etc.)
                    items: mergedItems
                });
            } else {
                // Section only in user config: completely custom section
                mergedSections.push(userSection);
            }
        }
    }

    // Second: Add unprocessed synced sections
    for (const syncedSection of syncedSections) {
        if (!processedSectionNames.has(syncedSection.name)) {
            mergedSections.push(syncedSection);
        }
    }

    return {
        ...userConf,  // Preserve other config (appConfig, pageInfo, etc.)
        sections: mergedSections
    };
}

/**
 * Merge items within a section
 * User items override synced items (matched by title)
 * 
 * @param {Array} syncedItems - Items from synced data
 * @param {Array} userItems - Items from user config
 * @returns {Array} Merged items array
 */
function mergeSectionItems(syncedItems, userItems) {
    const mergedItems = [];
    const processedTitles = new Set();

    // First: Process user items (highest priority)
    if (userItems && userItems.length > 0) {
        for (const userItem of userItems) {
            // User item can override synced item or be completely new
            processedTitles.add(userItem.title);
            mergedItems.push(userItem);
        }
    }

    // Second: Add synced items that weren't overridden
    if (syncedItems && syncedItems.length > 0) {
        for (const syncedItem of syncedItems) {
            if (!processedTitles.has(syncedItem.title)) {
                mergedItems.push(syncedItem);
            }
        }
    }

    return mergedItems;
}

module.exports = { mergeConfigurations };
