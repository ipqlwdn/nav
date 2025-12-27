/* eslint-disable no-console */
const { filterSyncedData } = require('../src/utils/ConfigFilter');

// Mock synced sections (远程同步的数据)
const syncedSections = [
  {
    name: 'Search',
    icon: 'search-icon.png',
    items: [
      {
        title: 'Google', url: 'https://google.com', icon: 'google.png', description: 'Search engine',
      },
      { title: 'Bing', url: 'https://bing.com', icon: 'bing.png' },
    ],
  },
  {
    name: 'Social',
    items: [
      { title: 'Twitter', url: 'https://twitter.com', icon: 'twitter.png' },
    ],
  },
];

console.log('='.repeat(60));
console.log('测试配置过滤逻辑');
console.log('='.repeat(60));

// Test 1: 完全相同的配置应该被完全过滤掉
console.log('\n--- 测试 1: 未修改的配置 ---');
const config1 = {
  appConfig: { theme: 'dark' },
  sections: JSON.parse(JSON.stringify(syncedSections)), // Deep copy
};
const filtered1 = filterSyncedData(config1, syncedSections);
console.log('输入sections数:', config1.sections.length);
console.log('输出sections数:', filtered1.sections.length);
console.log('预期: 0 (所有内容都与同步数据相同，应被过滤)');
console.log('结果:', filtered1.sections.length === 0 ? '✅ PASS' : '❌ FAIL');

// Test 2: 修改了URL的条目应该被保留
console.log('\n--- 测试 2: 修改了URL ---');
const config2 = {
  appConfig: { theme: 'dark' },
  sections: [
    {
      name: 'Search',
      items: [
        {
          title: 'Google', url: 'https://google.hk', icon: 'google.png', description: 'Search engine',
        }, // URL modified
        { title: 'Bing', url: 'https://bing.com', icon: 'bing.png' }, // Same as synced
      ],
    },
  ],
};
const filtered2 = filterSyncedData(config2, syncedSections);
console.log('输入items数:', config2.sections[0].items.length);
console.log('输出items数:', filtered2.sections[0]?.items?.length || 0);
console.log('预期: 1 (只保留修改了URL的Google)');
console.log('结果:', filtered2.sections[0]?.items?.length === 1
    && filtered2.sections[0].items[0].url === 'https://google.hk' ? '✅ PASS' : '❌ FAIL');

// Test 3: 完全自定义的分类和条目应该被保留
console.log('\n--- 测试 3: 自定义分类 ---');
const config3 = {
  appConfig: { theme: 'dark' },
  sections: [
    {
      name: 'My Custom',
      items: [
        { title: 'My Site', url: 'https://mysite.com', icon: 'custom.png' },
      ],
    },
  ],
};
const filtered3 = filterSyncedData(config3, syncedSections);
console.log('输入sections数:', config3.sections.length);
console.log('输出sections数:', filtered3.sections.length);
console.log('预期: 1 (自定义分类应该完整保留)');
console.log('结果:', filtered3.sections.length === 1
    && filtered3.sections[0].name === 'My Custom' ? '✅ PASS' : '❌ FAIL');

// Test 4: 混合场景
console.log('\n--- 测试 4: 混合场景 ---');
const config4 = {
  appConfig: { theme: 'dark' },
  sections: [
    {
      name: 'Search',
      items: [
        {
          title: 'Google', url: 'https://google.hk', icon: 'google.png', description: 'Search engine',
        }, // Modified
        { title: 'Bing', url: 'https://bing.com', icon: 'bing.png' }, // Same, should be filtered
        { title: 'DuckDuckGo', url: 'https://ddg.gg', icon: 'ddg.png' }, // Custom
      ],
    },
    {
      name: 'Social',
      items: [
        { title: 'Twitter', url: 'https://twitter.com', icon: 'twitter.png' }, // Same, should be filtered
      ],
    },
    {
      name: 'My Custom',
      items: [
        { title: 'My Site', url: 'https://mysite.com', icon: 'custom.png' },
      ],
    },
  ],
};
const filtered4 = filterSyncedData(config4, syncedSections);
console.log('输入:');
console.log('  - Search分类: 3个条目');
console.log('  - Social分类: 1个条目 (与同步相同)');
console.log('  - My Custom分类: 1个条目 (自定义)');
console.log('\n输出:');
console.log('  - Sections总数:', filtered4.sections.length);
if (filtered4.sections.find(s => s.name === 'Search')) {
  console.log('  - Search分类items数:', filtered4.sections.find(s => s.name === 'Search').items.length);
}
if (filtered4.sections.find(s => s.name === 'Social')) {
  console.log('  - Social分类存在:', '是');
} else {
  console.log('  - Social分类存在:', '否');
}
if (filtered4.sections.find(s => s.name === 'My Custom')) {
  console.log('  - My Custom分类items数:', filtered4.sections.find(s => s.name === 'My Custom').items.length);
}

const expectedSections = 2; // Search (2 items) + My Custom (1 item), Social should be filtered
const searchItems = filtered4.sections.find(s => s.name === 'Search')?.items?.length || 0;
const customExists = !!filtered4.sections.find(s => s.name === 'My Custom');
const socialFiltered = !filtered4.sections.find(s => s.name === 'Social');

console.log('\n预期:');
console.log('  - 2个分类 (Search + My Custom)');
console.log('  - Search有2个items (Google修改版 + DuckDuckGo自定义)');
console.log('  - Social被过滤 (完全相同)');
console.log('  - My Custom完整保留');

console.log('\n结果:', filtered4.sections.length === expectedSections
    && searchItems === 2
    && customExists
    && socialFiltered ? '✅ PASS' : '❌ FAIL');

console.log(`\n${'='.repeat(60)}`);
console.log('测试完成');
console.log('='.repeat(60));
