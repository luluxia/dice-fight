export const chars = [
  {
    name: '战士',
    desc: '擅长进攻，同时也具备防御能力',
    pic: 'char_03',
    background: 'bg-gradient-to-br from-rose-500 to-sky-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '攻击', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '攻击', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准攻击', value: 3, desc: '造成3点伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准攻击', value: 3, desc: '造成3点伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准攻击', value: 3, desc: '造成3点伤害' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准格挡', value: 6, desc: '获得6点护盾' },
    ]
  },
  {
    name: '弓箭手',
    desc: '专注于输出，能打出高效伤害，但命中率略低',
    pic: 'char_02',
    background: 'bg-rose-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '射击', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '射击', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准射击', value: 6, desc: '造成6点伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准射击', value: 6, desc: '造成6点伤害' },
      { type: 'empty', background: 'bg-gray-400', name: '未命中' },
      { type: 'empty', background: 'bg-gray-400', name: '未命中' },
    ]
  },
  {
    name: '重甲兵',
    desc: '擅长防御，同时也具备进攻能力',
    pic: 'char_07',
    background: 'bg-gradient-to-br from-rose-500 to-sky-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '攻击', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '攻击', desc: '造成伤害' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准格挡', value: 3, desc: '获得3点护盾' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准格挡', value: 3, desc: '获得3点护盾' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准格挡', value: 6, desc: '获得6点护盾' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准格挡', value: 6, desc: '获得6点护盾' },
    ]
  },
  {
    name: '法师',
    desc: '擅长输出与防御，但偶尔会施法失败',
    pic: 'char_04',
    background: 'bg-gradient-to-br from-rose-500 to-sky-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '飞弹', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准飞弹', value: 6, desc: '造成6点伤害' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '护盾术', desc: '获得护盾' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准护盾术', value: 6, desc: '获得6点护盾' },
      { type: 'empty', background: 'bg-gray-400', name: '施法失败' },
      { type: 'empty', background: 'bg-gray-400', name: '施法失败' },
    ]
  },
  {
    name: '牧师',
    desc: '擅长治疗，同时也具备进攻能力',
    pic: 'char_12',
    background: 'bg-gradient-to-br from-rose-500 to-amber-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '圣光', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准圣光', value: 4, desc: '造成4点伤害' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准治疗', value: 4, desc: '恢复4点生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准治疗', value: 4, desc: '恢复4点生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准治疗', value: 6, desc: '恢复6点生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准治疗', value: 6, desc: '恢复6点生命' },
    ]
  },
  {
    name: '医师',
    desc: '擅长治疗，但是缺乏进攻能力',
    pic: 'char_11',
    background: 'bg-gradient-to-br from-rose-500 to-amber-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准小刀突刺', value: 4, desc: '造成4点伤害' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '医治', desc: '恢复生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准医治', value: 4, desc: '恢复4点生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准医治', value: 4, desc: '恢复4点生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准医治', value: 6, desc: '恢复6点生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准医治', value: 6, desc: '恢复6点生命' },
    ]
  },
  {
    name: '大魔导师',
    desc: '兼顾输出与防御，喜欢稳扎稳打',
    pic: 'char_20',
    background: 'bg-gradient-to-br from-rose-500 to-sky-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '飞弹', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准飞弹', value: 3, desc: '造成3点伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准飞弹', value: 4, desc: '造成4点伤害' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '护盾术', desc: '获得护盾' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准护盾术', value: 3, desc: '获得3点护盾' },
      { type: 'shield', pic: 'shield', background: 'bg-sky-400', name: '精准护盾术', value: 4, desc: '获得4点护盾' },
    ]
  },
  {
    name: '树精',
    desc: '兼顾输出与治疗，但由于行动缓慢，偶尔会失误',
    pic: 'char_33',
    background: 'bg-gradient-to-br from-rose-500 to-amber-500',
    actions: [
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '树根缠绕', desc: '造成伤害' },
      { type: 'attack', pic: 'sword', background: 'bg-rose-400', name: '精准树根缠绕', value: 6, desc: '造成6点伤害' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '再生', desc: '恢复生命' },
      { type: 'heart', pic: 'hearts', background: 'bg-amber-400', name: '精准再生', value: 6, desc: '恢复6点生命' },
      { type: 'empty', background: 'bg-gray-400', name: '施法失败' },
      { type: 'empty', background: 'bg-gray-400', name: '施法失败' },
    ]
  }
]
