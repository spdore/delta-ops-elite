
import { Operator, PricingTier } from './types';

export const MISSIONS = [
  {
    id: 'srv-01',
    title: '代肝 // ASSET GRINDING',
    subtitle: '资源托管',
    desc: '全天候账号托管服务。无论是曼德尔砖搬运、武器等级速刷，还是藏身处设施升级，我们将高效完成枯燥的积累过程，让您上线即享受满配战斗。',
    icon: 'Database',
    features: ['武器满级', '哈夫币积累', '任务清理']
  },
  {
    id: 'srv-02',
    title: '陪玩 // TACTICAL CO-OP',
    subtitle: '战术陪练',
    desc: '拒绝“坐牢”体验。由高KD打手一对一指导，提供实时战术决策、身法教学及地图理解。不仅仅是赢，更是为了让您掌握制胜法则。',
    icon: 'Users',
    features: ['实时教学', '情绪价值', '战术配合']
  },
  {
    id: 'srv-03',
    title: '护航 // VIP PROTECTION',
    subtitle: '绝对防御',
    desc: '最高级别的安全保障。多名顶尖打手组队护送，为您构建移动的铜墙铁壁。无论是携带红卡撤离还是完成高难任务，确保您毫发无伤。',
    icon: 'Shield',
    features: ['全装保驾', '优先撤离', '百分百安全']
  }
];

export const OPERATORS: Operator[] = [
  {
    id: 'op-01',
    name: 'Ghost',
    role: '突击 / 侦察',
    kd: 4.5,
    winRate: '88%',
    specialty: '烽火地带摸金专家',
    image: 'https://images.unsplash.com/photo-1542261777421-24d2d263306b?q=80&w=800&auto=format&fit=crop', // Updated to bearded tactical operator
    rank: 'S1 巅峰',
    description: '前特种作战群突击手，擅长在极度混乱的战局中快速定位高价值目标。拥有超乎常人的听声辨位能力，被誉为“长弓溪谷的幽灵”。如果你想在不被察觉的情况下带出红卡，他是唯一选择。',
    mainWeapons: ['RCX-Spear', 'MP5'],
    tacticalStyle: ['隐秘潜入', '精确猎杀', '高价值搜寻'],
    radarStats: { aim: 95, survival: 90, support: 60, awareness: 100 }
  },
  {
    id: 'op-02',
    name: 'Viper',
    role: '支援 / 医疗',
    kd: 3.2,
    winRate: '92%',
    specialty: '全面战场顶级指挥',
    image: 'https://images.unsplash.com/photo-1585589266882-1c641b619224?q=80&w=800&auto=format&fit=crop', // Hand holding Pistol
    rank: 'S1 传奇',
    description: '退役战地军医，拥有极强的战局阅读能力。她不仅仅是移动的医疗站，更是整个小队的大脑。在她的指挥下，即便身陷重围也能全身而退。擅长利用烟雾和地形拉扯敌人。',
    mainWeapons: ['M4A1', 'Vector'],
    tacticalStyle: ['战术指挥', '快速救援', '防线构筑'],
    radarStats: { aim: 75, survival: 85, support: 100, awareness: 95 }
  },
  {
    id: 'op-03',
    name: 'Shadow',
    role: '狙击 / 渗透',
    kd: 5.1,
    winRate: '85%',
    specialty: '单人四排灭队王',
    image: 'https://images.unsplash.com/photo-1595208925768-e44837860471?q=80&w=800&auto=format&fit=crop', // Sniper Rifle Focus
    rank: 'S1 巅峰',
    description: '一名独来独往的狙击专家，目前的最高击杀记录保持者。当你听到枪声时，通常已经倒地了。擅长远距离架枪封锁和清理高威胁目标，能为队伍创造绝对安全的推进路线。',
    mainWeapons: ['AWM', 'G18C'],
    tacticalStyle: ['超远距离', '架枪封锁', '一击必杀'],
    radarStats: { aim: 100, survival: 80, support: 50, awareness: 90 }
  },
  {
    id: 'op-04',
    name: 'Titan',
    role: '工程 / 防御',
    kd: 3.8,
    winRate: '90%',
    specialty: '载具杀手',
    image: 'https://images.unsplash.com/photo-1563811771046-ba085d71d183?q=80&w=800&auto=format&fit=crop', // Heavy Gear / Soldier
    rank: 'S1 宗师',
    description: '重火力爱好者，精通各类载具驾驶与反载具作战。如果有他在队里，无论是敌人的坦克还是直升机都将变成废铁。他是队伍最坚实的盾牌，也是最狂暴的火力输出点。',
    mainWeapons: ['PKM', 'RPG-7'],
    tacticalStyle: ['火力压制', '载具破坏', '据点防守'],
    radarStats: { aim: 80, survival: 95, support: 70, awareness: 75 }
  }
];

export const PRICING: PricingTier[] = [
  {
    id: 'tier-3',
    name: '传奇领袖',
    price: '¥168/局',
    originalPrice: '¥200/局',
    discountLabel: '限时特惠',
    features: ['职业选手/顶流主播', '统治级战场宰治力', '定制化战术方案', '100% 游戏体验'],
    color: 'border-delta-gold',
    description: '尊贵的私人定制服务。由现役职业选手或顶流技术主播提供服务，根据您的需求制定专属战术，享受电影主角般的战场待遇。',
    serviceLevel: 'CLASSIFIED // 绝密档案',
    equipmentPolicy: '无限供给 / 顶级配置',
    exclusivePerks: ['明星选手陪玩', '专属战术定制', '精彩时刻剪辑', '语音频道VIP位']
  },
  {
    id: 'tier-2',
    name: '精英专家',
    price: '¥150/局',
    recommended: true,
    features: ['KD 5.0+ 强力打手', '高价值区域争夺', '战术指挥与协同', '包撤离/包装备'],
    color: 'border-delta-green',
    description: '针对高价值战利品争夺设计的服务。打手拥有极强的个人能力，能够主导战场节奏，带您深入行政楼等高危区域搜刮红卡和机密情报。',
    serviceLevel: 'TACTICAL // 战术专家',
    equipmentPolicy: '包含战损补偿',
    exclusivePerks: ['红箱子优先权', 'BOSS击杀保障', '撤离失败退款']
  },
  {
    id: 'tier-1',
    name: '战术干员',
    price: '¥120/局',
    features: ['KD 3.0+ 实战经验', '熟悉全地图点位', '基础物资搜集', '听从指挥'],
    color: 'border-blue-500/50',
    description: '进阶玩家的首选。陪玩具备扎实的枪法和意识，能够在交火中提供有效支援，清理普通AI和一般玩家威胁，确保任务物品的安全带出。',
    serviceLevel: 'COMBAT // 战斗支援',
    equipmentPolicy: '自理 / 蓝紫装建议',
    exclusivePerks: ['任务协助完成', '危险区域探路', '侧翼火力掩护']
  }
];

export const FEATURES = [
  { title: "极速响应", desc: "下单即玩，无需等待" },
  { title: "纯净绿玩", desc: "严格审核，拒绝科技" },
  { title: "战损包赔", desc: "意外撤离失败全额赔付" },
  { title: "战术教学", desc: "授人以鱼不如授人以渔" },
];
