
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { mergeConfigurations } = require('./mock_merge_config');

// Setup mock directories
const TEST_DIR = path.join(__dirname, 'mock_env');
const USER_DATA = path.join(TEST_DIR, 'user-data');
const DATA_DIR = path.join(TEST_DIR, 'data');

if (!fs.existsSync(USER_DATA)) fs.mkdirSync(USER_DATA, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Mock process.cwd to point to TEST_DIR for the merge logic to work?
// merge-config.js uses process.cwd(). We need to patch it or run from TEST_DIR.
// Easier to override the paths in merge-config.js, but we can't easily.
// Let's monkey-patch process.cwd
const originalCwd = process.cwd();
process.cwd = () => TEST_DIR;

// 1. Initial State
console.log('--- Step 1: Initial Sync ---');
const initialSyncData = [
    {
        name: 'Search',
        items: [
            { title: 'Google', url: 'https://google.com', icon: 'google.png' },
            { title: 'Bing', url: 'https://bing.com', icon: 'bing.png' }
        ]
    }
];
fs.writeFileSync(path.join(DATA_DIR, 'synced_sections.json'), JSON.stringify(initialSyncData));

// User has no config initially
if (fs.existsSync(path.join(USER_DATA, 'conf.yml'))) fs.unlinkSync(path.join(USER_DATA, 'conf.yml'));

// Check Merge
let merged = mergeConfigurations();
console.log('Merged (Fresh):', JSON.stringify(merged.sections.map(s => ({ name: s.name, items: s.items.map(i => i.title) })), null, 2));

// 2. User User Modifies "Google" and Adds "My Cat"
console.log('\n--- Step 2: User Saves Config ---');
// User modifies Google URL in UI. The UI mocks this by taking merged data and modifying it.
let uiConfig = JSON.parse(JSON.stringify(merged));
uiConfig.sections[0].items[0].url = 'https://google.hk'; // Modified
uiConfig.sections.push({
    name: 'My Custom',
    items: [{ title: 'My Site', url: 'https://mysite.com' }]
});

// Save to conf.yml (Current implementation saves EVERYTHING)
const yamlStr = yaml.dump(uiConfig);
fs.writeFileSync(path.join(USER_DATA, 'conf.yml'), yamlStr);
console.log('Saved conf.yml with merged content + modifications.');

// 3. Remote Update
console.log('\n--- Step 3: Remote Content Updates ---');
const updatedSyncData = [
    {
        name: 'Search',
        items: [
            { title: 'Google', url: 'https://google.com', icon: 'new_google_icon.png' }, // Icon updated remote
            { title: 'Bing', url: 'https://bing.com/new', icon: 'bing.png' }, // URL updated remote
            { title: 'DuckDuckGo', url: 'https://ddg.gg' } // New item
        ]
    }
];
fs.writeFileSync(path.join(DATA_DIR, 'synced_sections.json'), JSON.stringify(updatedSyncData));

// 4. Merge Again (User Refresh)
console.log('\n--- Step 4: Verify Merge after Update ---');
merged = mergeConfigurations();

const googleItem = merged.sections.find(s => s.name === 'Search').items.find(i => i.title === 'Google');
const bingItem = merged.sections.find(s => s.name === 'Search').items.find(i => i.title === 'Bing');
const ddgItem = merged.sections.find(s => s.name === 'Search').items.find(i => i.title === 'DuckDuckGo');
const customItem = merged.sections.find(s => s.name === 'My Custom');

console.log('Google URL (Expect https://google.hk):', googleItem.url);
console.log('Google Icon (Expect new_google_icon.png IF merged correctly, but stale conf might block it):', googleItem.icon);
console.log('Bing URL (Expect https://bing.com/new IF updated, but stale conf has old URL):', bingItem.url);
console.log('DDG Exists? (Expect Yes):', !!ddgItem);
console.log('My Custom Exists? (Expect Yes):', !!customItem);

// Cleanup
process.cwd = () => originalCwd;
