const https = require('https');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Get project root directory
const PROJECT_ROOT = process.cwd();
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const CONF_PATH = path.join(PROJECT_ROOT, 'user-data', 'conf.yml');

// Load sync source URL from config or use defaults
function getSyncSourceUrl() {
  try {
    if (fs.existsSync(CONF_PATH)) {
      const confContent = fs.readFileSync(CONF_PATH, 'utf8');
      const conf = yaml.load(confContent);
      if (conf && conf.appConfig && conf.appConfig.syncSourceUrl) {
        return conf.appConfig.syncSourceUrl;
      }
    }
  } catch (error) {
    console.warn('Warning: Could not read syncSourceUrl from config:', error.message);
  }

  // Fallback to default (hardcoded)
  return 'https://nav.eooce.com';
}

const SYNC_BASE_URL = getSyncSourceUrl();
const MENUS_URL = `${SYNC_BASE_URL}/api/menus`;
const CARDS_API_BASE = `${SYNC_BASE_URL}/api/cards`;

// Helper function to fetch data from a URL
function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
            return;
          }
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

// Transform API card to conf.yml item format
function transformCard(card) {
  return {
    title: card.title,
    description: card.desc || undefined,
    icon: card.display_logo || card.logo_url || 'favicon',
    url: card.url
  };
}

// Check if two items are the same (by title - so user can modify URL without duplicates)
function isSameItem(item1, item2) {
  return item1.title === item2.title;
}

// Check if an item already exists in a list
function itemExists(item, itemList) {
  return itemList.some(existing => isSameItem(existing, item));
}

// Merge items: keep existing + add new ones from remote
function mergeItems(localItems, remoteItems) {
  const merged = [...localItems]; // Keep all local items

  for (const remoteItem of remoteItems) {
    if (!itemExists(remoteItem, localItems)) {
      merged.push(remoteItem);
      console.log(`    [+] 新增: ${remoteItem.title}`);
    }
  }

  return merged;
}

async function sync() {
  try {
    console.log('='.repeat(60));
    console.log('🔄 开始自动同步远程导航数据');
    console.log('='.repeat(60));

    // 1. Fetch Menus from remote
    console.log(`\n📡 获取远程菜单: ${MENUS_URL}`);
    const menus = await fetchData(MENUS_URL);
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(DATA_DIR, 'menus.json'), JSON.stringify(menus, null, 2));

    // 2. Fetch all remote sections
    const remoteSections = [];

    for (const menu of menus) {
      // Fetch main menu items
      const mainUrl = `${CARDS_API_BASE}/${menu.id}`;
      try {
        const mainCards = await fetchData(mainUrl);
        if (mainCards && mainCards.length > 0) {
          remoteSections.push({
            name: menu.name,
            items: mainCards.map(transformCard)
          });
        }
      } catch (err) {
        console.error(`获取 ${menu.name} 失败:`, err.message);
      }

      // Fetch submenu items
      if (menu.subMenus && menu.subMenus.length > 0) {
        for (const subMenu of menu.subMenus) {
          const subUrl = `${CARDS_API_BASE}/${menu.id}?subMenuId=${subMenu.id}`;
          try {
            const subCards = await fetchData(subUrl);
            if (subCards && subCards.length > 0) {
              remoteSections.push({
                name: `${menu.name} - ${subMenu.name}`,
                items: subCards.map(transformCard)
              });
            }
          } catch (err) {
            console.error(`获取 ${menu.name} - ${subMenu.name} 失败:`, err.message);
          }
        }
      }
    }

    console.log(`\n📦 远程共有 ${remoteSections.length} 个分类`);

    // 3. 保存远程数据到 data/synced_sections.json
    const syncedDataPath = path.join(DATA_DIR, 'synced_sections.json');
    fs.writeFileSync(syncedDataPath, JSON.stringify(remoteSections, null, 2));

    // 4. Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ 同步完成!');
    console.log('='.repeat(60));
    console.log(`📊 统计:`);
    console.log(`   - 远程分类数: ${remoteSections.length}`);
    console.log(`   - 保存位置: data/synced_sections.json`);
    console.log(`   - 您的自定义配置 (user-data/conf.yml) 不受影响 ✅`);
    console.log(`\n💡 提示: 应用启动时会自动合并远程数据和您的自定义配置`);
    console.log(`   - 您可以在 user-data/conf.yml 中覆盖任何远程卡片的URL或其他属性`);
    console.log(`   - 您的自定义分类和覆盖不会被同步覆盖`);

  } catch (error) {
    console.error('同步失败:', error);
  }
}

sync();
