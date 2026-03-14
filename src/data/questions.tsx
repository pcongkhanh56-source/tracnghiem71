import React from 'react';

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  explanation: string;
  svg?: React.ReactNode;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  statements: { text: string; isTrue: boolean }[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  correctAnswer: string;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | ShortAnswerQuestion;

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateQuestions = (): Question[] => {
  // mc1
  const mc1 = getRandomItem([
    {d1: 12, n2: -2, d2: 3, ans: -8},
    {d1: 15, n2: -2, d2: 5, ans: -6},
    {d1: 10, n2: -3, d2: 5, ans: -6},
    {d1: 14, n2: -3, d2: 2, ans: -21},
    {d1: 16, n2: -3, d2: 4, ans: -12},
  ]);

  // mc2
  const mc2 = getRandomItem([
    {d1: 2, d2: 3, sum: 10, x: 4, y: 6},
    {d1: 3, d2: 4, sum: 14, x: 6, y: 8},
    {d1: 2, d2: 5, sum: 14, x: 4, y: 10},
    {d1: 3, d2: 5, sum: 16, x: 6, y: 10},
  ]);

  // mc4
  const mc4 = getRandomItem([
    {x: 5, y: 15, k: 3},
    {x: 4, y: 20, k: 5},
    {x: 6, y: 12, k: 2},
    {x: 3, y: 12, k: 4},
  ]);

  // mc5
  const mc5 = getRandomItem([
    {x: 4, y: 6, a: 24},
    {x: 3, y: 8, a: 24},
    {x: 5, y: 4, a: 20},
    {x: 2, y: 9, a: 18},
  ]);

  // mc6
  const mc6 = getRandomItem([
    {a: 50, b: 70, p: 60},
    {a: 60, b: 80, p: 40},
    {a: 45, b: 65, p: 70},
    {a: 55, b: 75, p: 50},
  ]);

  // mc8
  const mc8 = getRandomItem([
    {a: 60, b: 50, c: 70},
    {a: 70, b: 40, c: 70},
    {a: 50, b: 80, c: 50},
    {a: 65, b: 45, c: 70},
  ]);

  // mc9
  const mc9 = getRandomItem([
    {ab: 5, bc: 7, df: 6, p: 18},
    {ab: 4, bc: 6, df: 5, p: 15},
    {ab: 6, bc: 8, df: 7, p: 21},
    {ab: 3, bc: 5, df: 4, p: 12},
  ]);

  // mc12
  const mc12 = getRandomItem([
    {a: 70, b: 55},
    {a: 50, b: 65},
    {a: 80, b: 50},
    {a: 40, b: 70},
  ]);

  // tf1
  const tf1 = getRandomItem([
    {x1: 2, y1: 6, y2: 12, x2_wrong: 36},
    {x1: 4, y1: 12, y2: 15, x2_wrong: 45},
    {x1: -2, y1: -6, y2: 9, x2_wrong: 27},
    {x1: 5, y1: 15, y2: -12, x2_wrong: -36},
  ]);

  // sa1
  const sa1 = getRandomItem([
    {d1: 15, n2: 2, d2: 5, ans: 6},
    {d1: 12, n2: 3, d2: 4, ans: 9},
    {d1: 10, n2: 4, d2: 5, ans: 8},
    {d1: 14, n2: 3, d2: 7, ans: 6},
  ]);

  // sa2
  const sa2 = getRandomItem([
    {h1: 8, w2: 4, ans: 2},
    {h1: 6, w2: 3, ans: 2},
    {h1: 10, w2: 5, ans: 2},
    {h1: 12, w2: 4, ans: 3},
  ]);

  // sa3
  const sa3 = getRandomItem([
    {d1: 4, d2: 6, d3: 8, diff: 2, ans: 6},
    {d1: 3, d2: 4, d3: 6, diff: 2, ans: 8},
    {d1: 2, d2: 3, d3: 4, diff: 4, ans: 12},
  ]);

  // sa4
  const sa4 = getRandomItem([
    {min: 10, max: 14, ans: 5, x: 3},
    {min: 13, max: 17, ans: 6, x: 4},
    {min: 16, max: 20, ans: 7, x: 5},
  ]);

  return [
    {
      id: 'mc1',
      type: 'multiple-choice',
      text: `Cho tỉ lệ thức $\\frac{x}{${mc1.d1}} = \\frac{${mc1.n2}}{${mc1.d2}}$. Giá trị của $x$ là:`,
      options: [
        `$${mc1.ans}$`,
        `$${-mc1.ans}$`,
        `$${mc1.ans - 10}$`,
        `$${mc1.ans + 10}$`
      ],
      correctAnswer: `$${mc1.ans}$`,
      explanation: `Áp dụng tính chất tỉ lệ thức: $x \\cdot ${mc1.d2} = ${mc1.d1} \\cdot (${mc1.n2}) \\Rightarrow ${mc1.d2}x = ${mc1.d1 * mc1.n2} \\Rightarrow x = ${mc1.ans}$.`
    },
    {
      id: 'mc2',
      type: 'multiple-choice',
      text: `Cho $\\frac{x}{${mc2.d1}} = \\frac{y}{${mc2.d2}}$ và $x + y = ${mc2.sum}$. Giá trị của $x$ và $y$ là:`,
      options: [
        `$x = ${mc2.x}, y = ${mc2.y}$`,
        `$x = ${mc2.y}, y = ${mc2.x}$`,
        `$x = ${mc2.x - 1}, y = ${mc2.y + 1}$`,
        `$x = ${mc2.x + 1}, y = ${mc2.y - 1}$`
      ],
      correctAnswer: `$x = ${mc2.x}, y = ${mc2.y}$`,
      explanation: `Áp dụng tính chất dãy tỉ số bằng nhau: $\\frac{x}{${mc2.d1}} = \\frac{y}{${mc2.d2}} = \\frac{x+y}{${mc2.d1}+${mc2.d2}} = \\frac{${mc2.sum}}{${mc2.d1 + mc2.d2}} = ${mc2.sum / (mc2.d1 + mc2.d2)}$. Suy ra $x = ${mc2.d1} \\cdot ${mc2.sum / (mc2.d1 + mc2.d2)} = ${mc2.x}$ và $y = ${mc2.d2} \\cdot ${mc2.sum / (mc2.d1 + mc2.d2)} = ${mc2.y}$.`
    },
    {
      id: 'mc3',
      type: 'multiple-choice',
      text: 'Nếu $\\frac{a}{b} = \\frac{c}{d}$ thì đẳng thức nào sau đây đúng?',
      options: [
        '$a \\cdot c = b \\cdot d$',
        '$a \\cdot d = b \\cdot c$',
        '$a + d = b + c$',
        '$a - b = c - d$'
      ],
      correctAnswer: '$a \\cdot d = b \\cdot c$',
      explanation: 'Theo tính chất cơ bản của tỉ lệ thức, tích trung tỉ bằng tích ngoại tỉ: $a \\cdot d = b \\cdot c$.'
    },
    {
      id: 'mc4',
      type: 'multiple-choice',
      text: `Cho biết $x$ và $y$ là hai đại lượng tỉ lệ thuận. Khi $x = ${mc4.x}$ thì $y = ${mc4.y}$. Hệ số tỉ lệ $k$ của $y$ đối với $x$ là:`,
      options: [
        `${mc4.k}`,
        `$\\frac{1}{${mc4.k}}$`,
        `${mc4.k * 2}`,
        `${mc4.x * mc4.y}`
      ],
      correctAnswer: `${mc4.k}`,
      explanation: `Vì $y$ tỉ lệ thuận với $x$ nên $y = kx$. Thay $x = ${mc4.x}, y = ${mc4.y}$ ta được ${mc4.y} = k \\cdot ${mc4.x} \\Rightarrow k = ${mc4.k}.`
    },
    {
      id: 'mc5',
      type: 'multiple-choice',
      text: `Cho biết $x$ và $y$ là hai đại lượng tỉ lệ nghịch. Khi $x = ${mc5.x}$ thì $y = ${mc5.y}$. Hệ số tỉ lệ $a$ là:`,
      options: [
        `$\\frac{${mc5.x}}{${mc5.y}}$`,
        `$\\frac{${mc5.y}}{${mc5.x}}$`,
        `${mc5.a}`,
        `${mc5.a * 2}`
      ],
      correctAnswer: `${mc5.a}`,
      explanation: `Vì $x$ và $y$ tỉ lệ nghịch nên $x \\cdot y = a$. Thay $x = ${mc5.x}, y = ${mc5.y}$ ta được $a = ${mc5.x} \\cdot ${mc5.y} = ${mc5.a}$.`
    },
    {
      id: 'mc6',
      type: 'multiple-choice',
      text: `Cho $\\Delta ABC = \\Delta MNP$. Biết $\\widehat{A} = ${mc6.a}^\\circ, \\widehat{B} = ${mc6.b}^\\circ$. Số đo $\\widehat{P}$ là:`,
      options: [
        `$${mc6.p}^\\circ$`,
        `$${mc6.a}^\\circ$`,
        `$${mc6.b}^\\circ$`,
        `$${mc6.a + mc6.b}^\\circ$`
      ],
      correctAnswer: `$${mc6.p}^\\circ$`,
      explanation: `Vì $\\Delta ABC = \\Delta MNP$ nên $\\widehat{C} = \\widehat{P}$. Trong $\\Delta ABC$, ta có $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - (${mc6.a}^\\circ + ${mc6.b}^\\circ) = ${mc6.p}^\\circ$. Vậy $\\widehat{P} = ${mc6.p}^\\circ$.`
    },
    {
      id: 'mc7',
      type: 'multiple-choice',
      text: 'Trong một tam giác, độ dài một cạnh bao giờ cũng:',
      options: [
        'Lớn hơn tổng độ dài hai cạnh còn lại.',
        'Nhỏ hơn hiệu độ dài hai cạnh còn lại.',
        'Lớn hơn hiệu và nhỏ hơn tổng độ dài hai cạnh còn lại.',
        'Bằng tổng độ dài hai cạnh còn lại.'
      ],
      correctAnswer: 'Lớn hơn hiệu và nhỏ hơn tổng độ dài hai cạnh còn lại.',
      explanation: 'Theo bất đẳng thức tam giác, trong một tam giác, độ dài một cạnh luôn lớn hơn hiệu và nhỏ hơn tổng độ dài của hai cạnh còn lại.'
    },
    {
      id: 'mc8',
      type: 'multiple-choice',
      text: `Cho $\\Delta ABC$ có $\\widehat{A} = ${mc8.a}^\\circ$, $\\widehat{B} = ${mc8.b}^\\circ$. Số đo $\\widehat{C}$ là:`,
      svg: (
        <svg viewBox="0 0 200 150" className="w-48 h-36 mx-auto my-4">
          <polygon points="20,130 180,130 80,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="75" y="15" fill="currentColor" fontSize="14">A</text>
          <text x="10" y="140" fill="currentColor" fontSize="14">B</text>
          <text x="185" y="140" fill="currentColor" fontSize="14">C</text>
          <path d="M 70 38 A 20 20 0 0 0 90 38" fill="none" stroke="currentColor" />
          <text x="70" y="55" fill="currentColor" fontSize="10">{mc8.a}°</text>
          <path d="M 40 130 A 20 20 0 0 0 35 115" fill="none" stroke="currentColor" />
          <text x="45" y="120" fill="currentColor" fontSize="10">{mc8.b}°</text>
        </svg>
      ),
      options: [
        `$${mc8.c}^\\circ$`,
        `$${mc8.c + 10}^\\circ$`,
        `$${mc8.a}^\\circ$`,
        `$${mc8.b}^\\circ$`
      ],
      correctAnswer: `$${mc8.c}^\\circ$`,
      explanation: `Trong $\\Delta ABC$, ta có $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$. Suy ra $\\widehat{C} = 180^\\circ - (${mc8.a}^\\circ + ${mc8.b}^\\circ) = ${mc8.c}^\\circ$.`
    },
    {
      id: 'mc9',
      type: 'multiple-choice',
      text: `Cho $\\Delta ABC = \\Delta DEF$. Biết $AB = ${mc9.ab}\\text{cm}, BC = ${mc9.bc}\\text{cm}, DF = ${mc9.df}\\text{cm}$. Chu vi $\\Delta DEF$ là:`,
      svg: (
        <svg viewBox="0 0 300 120" className="w-64 h-28 mx-auto my-4">
          <polygon points="10,100 90,100 40,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="35" y="15" fill="currentColor" fontSize="12">A</text>
          <text x="0" y="110" fill="currentColor" fontSize="12">B</text>
          <text x="95" y="110" fill="currentColor" fontSize="12">C</text>
          <text x="15" y="60" fill="currentColor" fontSize="10">{mc9.ab}</text>
          <text x="50" y="115" fill="currentColor" fontSize="10">{mc9.bc}</text>

          <polygon points="160,100 240,100 190,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="185" y="15" fill="currentColor" fontSize="12">D</text>
          <text x="150" y="110" fill="currentColor" fontSize="12">E</text>
          <text x="245" y="110" fill="currentColor" fontSize="12">F</text>
          <text x="220" y="60" fill="currentColor" fontSize="10">{mc9.df}</text>
        </svg>
      ),
      options: [
        `$${mc9.p}\\text{cm}$`,
        `$${mc9.p - 1}\\text{cm}$`,
        `$${mc9.p - 2}\\text{cm}$`,
        `$${mc9.p - 3}\\text{cm}$`
      ],
      correctAnswer: `$${mc9.p}\\text{cm}$`,
      explanation: `Vì $\\Delta ABC = \\Delta DEF$ nên các cạnh tương ứng bằng nhau: $DE = AB = ${mc9.ab}\\text{cm}$, $EF = BC = ${mc9.bc}\\text{cm}$. Chu vi $\\Delta DEF = DE + EF + DF = ${mc9.ab} + ${mc9.bc} + ${mc9.df} = ${mc9.p}\\text{cm}$.`
    },
    {
      id: 'mc10',
      type: 'multiple-choice',
      text: 'Cho $\\Delta MNP$ và $\\Delta HIK$ có $MN = HI, \\widehat{M} = \\widehat{H}$. Cần thêm điều kiện gì để $\\Delta MNP = \\Delta HIK$ theo trường hợp cạnh - góc - cạnh?',
      svg: (
        <svg viewBox="0 0 300 120" className="w-64 h-28 mx-auto my-4">
          <polygon points="10,100 90,100 40,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="35" y="15" fill="currentColor" fontSize="12">M</text>
          <text x="0" y="110" fill="currentColor" fontSize="12">N</text>
          <text x="95" y="110" fill="currentColor" fontSize="12">P</text>
          <path d="M 35 30 A 15 15 0 0 0 45 30" fill="none" stroke="currentColor" />
          <line x1="20" y1="60" x2="30" y2="60" stroke="currentColor" strokeWidth="2" />

          <polygon points="160,100 240,100 190,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="185" y="15" fill="currentColor" fontSize="12">H</text>
          <text x="150" y="110" fill="currentColor" fontSize="12">I</text>
          <text x="245" y="110" fill="currentColor" fontSize="12">K</text>
          <path d="M 185 30 A 15 15 0 0 0 195 30" fill="none" stroke="currentColor" />
          <line x1="170" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      options: [
        '$MP = HK$',
        '$NP = IK$',
        '$\\widehat{N} = \\widehat{I}$',
        '$\\widehat{P} = \\widehat{K}$'
      ],
      correctAnswer: '$MP = HK$',
      explanation: 'Để hai tam giác bằng nhau theo trường hợp cạnh - góc - cạnh (c-g-c), ta cần hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia. Đã có $MN = HI$ và $\\widehat{M} = \\widehat{H}$, cần thêm cạnh kề với góc M và H là $MP = HK$.'
    },
    {
      id: 'mc11',
      type: 'multiple-choice',
      text: 'Tam giác cân là tam giác có:',
      options: [
        'Ba cạnh bằng nhau',
        'Hai cạnh bằng nhau',
        'Ba góc nhọn',
        'Một góc vuông'
      ],
      correctAnswer: 'Hai cạnh bằng nhau',
      explanation: 'Theo định nghĩa, tam giác cân là tam giác có hai cạnh bằng nhau.'
    },
    {
      id: 'mc12',
      type: 'multiple-choice',
      text: `Cho $\\Delta ABC$ cân tại $A$, biết $\\widehat{A} = ${mc12.a}^\\circ$. Số đo góc ở đáy là:`,
      svg: (
        <svg viewBox="0 0 150 150" className="w-36 h-36 mx-auto my-4">
          <polygon points="75,20 20,130 130,130" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="70" y="15" fill="currentColor" fontSize="14">A</text>
          <text x="10" y="140" fill="currentColor" fontSize="14">B</text>
          <text x="135" y="140" fill="currentColor" fontSize="14">C</text>
          <path d="M 65 40 A 15 15 0 0 0 85 40" fill="none" stroke="currentColor" />
          <text x="65" y="55" fill="currentColor" fontSize="10">{mc12.a}°</text>
          <line x1="40" y1="75" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="70" x2="110" y2="75" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      options: [
        `$${mc12.b}^\\circ$`,
        `$${mc12.a}^\\circ$`,
        `$${(180 - mc12.a) / 2 - 10}^\\circ$`,
        `$${180 - mc12.a}^\\circ$`
      ],
      correctAnswer: `$${mc12.b}^\\circ$`,
      explanation: `Vì $\\Delta ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C}$. Ta có $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ \\Rightarrow 2\\widehat{B} = 180^\\circ - ${mc12.a}^\\circ = ${180 - mc12.a}^\\circ \\Rightarrow \\widehat{B} = ${mc12.b}^\\circ$.`
    },

    // --- TRUE/FALSE (2 questions, 4 statements each) ---
    {
      id: 'tf1',
      type: 'true-false',
      text: 'Cho $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k = 3$. Các khẳng định sau đúng hay sai?',
      statements: [
        { text: 'Công thức liên hệ là $y = 3x$.', isTrue: true },
        { text: '$x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ $k = 3$.', isTrue: false },
        { text: `Khi $x = ${tf1.x1}$ thì $y = ${tf1.y1}$.`, isTrue: true },
        { text: `Khi $y = ${tf1.y2}$ thì $x = ${tf1.x2_wrong}$.`, isTrue: false }
      ],
      explanation: `a) Đúng vì $y = kx = 3x$.\nb) Sai vì $x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ $\\frac{1}{k} = \\frac{1}{3}$.\nc) Đúng vì $y = 3 \\cdot (${tf1.x1}) = ${tf1.y1}$.\nd) Sai vì ${tf1.y2} = 3x \\Rightarrow x = ${tf1.y2 / 3}$.`
    },
    {
      id: 'tf2',
      type: 'true-false',
      text: 'Cho hai tam giác $ABC$ và $DEF$. Các khẳng định sau đúng hay sai?',
      svg: (
        <svg viewBox="0 0 300 120" className="w-64 h-28 mx-auto my-4">
          <polygon points="10,100 90,100 40,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="35" y="15" fill="currentColor" fontSize="12">A</text>
          <text x="0" y="110" fill="currentColor" fontSize="12">B</text>
          <text x="95" y="110" fill="currentColor" fontSize="12">C</text>

          <polygon points="160,100 240,100 190,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="185" y="15" fill="currentColor" fontSize="12">D</text>
          <text x="150" y="110" fill="currentColor" fontSize="12">E</text>
          <text x="245" y="110" fill="currentColor" fontSize="12">F</text>
        </svg>
      ),
      statements: [
        { text: 'Nếu $AB = DE, BC = EF, AC = DF$ thì $\\Delta ABC = \\Delta DEF$.', isTrue: true },
        { text: 'Nếu $AB = DE, \\widehat{B} = \\widehat{E}, BC = EF$ thì $\\Delta ABC = \\Delta DEF$.', isTrue: true },
        { text: 'Nếu $\\widehat{A} = \\widehat{D}, AB = DE, \\widehat{B} = \\widehat{E}$ thì $\\Delta ABC = \\Delta DEF$.', isTrue: true },
        { text: 'Nếu $AB = DE, BC = EF, \\widehat{C} = \\widehat{F}$ thì $\\Delta ABC = \\Delta DEF$.', isTrue: false }
      ],
      explanation: 'a) Đúng (trường hợp cạnh - cạnh - cạnh).\nb) Đúng (trường hợp cạnh - góc - cạnh).\nc) Đúng (trường hợp góc - cạnh - góc).\nd) Sai vì góc C và F không phải là góc xen giữa hai cạnh tương ứng.'
    },

    // --- SHORT ANSWER (4 questions) ---
    {
      id: 'sa1',
      type: 'short-answer',
      text: `Tìm $x$ trong tỉ lệ thức: $\\frac{x}{${sa1.d1}} = \\frac{${sa1.n2}}{${sa1.d2}}$.`,
      correctAnswer: `${sa1.ans}`,
      explanation: `Từ $\\frac{x}{${sa1.d1}} = \\frac{${sa1.n2}}{${sa1.d2}} \\Rightarrow x = \\frac{${sa1.d1} \\cdot ${sa1.n2}}{${sa1.d2}} = ${sa1.ans}$.`
    },
    {
      id: 'sa2',
      type: 'short-answer',
      text: `Một công nhân làm một công việc hết ${sa2.h1} giờ. Hỏi ${sa2.w2} công nhân (với cùng năng suất) làm công việc đó hết bao nhiêu giờ?`,
      correctAnswer: `${sa2.ans}`,
      explanation: `Số công nhân và thời gian hoàn thành công việc là hai đại lượng tỉ lệ nghịch. Gọi $x$ là thời gian ${sa2.w2} công nhân làm xong. Ta có $1 \\cdot ${sa2.h1} = ${sa2.w2} \\cdot x \\Rightarrow x = ${sa2.ans}$ (giờ).`
    },
    {
      id: 'sa3',
      type: 'short-answer',
      text: `Ba đội máy san đất làm ba khối lượng công việc như nhau. Đội thứ nhất hoàn thành công việc trong ${sa3.d1} ngày, đội thứ hai trong ${sa3.d2} ngày và đội thứ ba trong ${sa3.d3} ngày. Hỏi đội thứ nhất có bao nhiêu máy (có cùng năng suất), biết rằng đội thứ nhất có nhiều hơn đội thứ hai ${sa3.diff} máy?`,
      correctAnswer: `${sa3.ans}`,
      explanation: `Gọi số máy của ba đội lần lượt là $x, y, z$. Vì khối lượng công việc như nhau nên số máy và số ngày là hai đại lượng tỉ lệ nghịch: $${sa3.d1}x = ${sa3.d2}y = ${sa3.d3}z$ hay $\\frac{x}{${sa3.d2}} = \\frac{y}{${sa3.d1}}$. Theo đề bài $x - y = ${sa3.diff}$. Áp dụng tính chất dãy tỉ số bằng nhau: $\\frac{x}{${sa3.d2}} = \\frac{y}{${sa3.d1}} = \\frac{x-y}{${sa3.d2}-${sa3.d1}} = \\frac{${sa3.diff}}{${sa3.d2 - sa3.d1}} = ${sa3.diff / (sa3.d2 - sa3.d1)}$. Suy ra $x = ${sa3.d2} \\cdot ${sa3.diff / (sa3.d2 - sa3.d1)} = ${sa3.ans}$ (máy).`
    },
    {
      id: 'sa4',
      type: 'short-answer',
      text: `Cho $\\Delta ABC$ có độ dài ba cạnh là ba số nguyên liên tiếp (đơn vị cm). Biết chu vi tam giác lớn hơn ${sa4.min}cm và nhỏ hơn ${sa4.max}cm. Tính độ dài cạnh lớn nhất của tam giác đó.`,
      correctAnswer: `${sa4.ans}`,
      explanation: `Gọi độ dài 3 cạnh là $x, x+1, x+2$ ($x \\in \\mathbb{Z}^+$). Chu vi là $x + x+1 + x+2 = 3x+3$. Theo đề bài: $${sa4.min} < 3x+3 < ${sa4.max} \\Rightarrow ${sa4.min - 3} < 3x < ${sa4.max - 3}$. Vì $x$ nguyên nên $3x = ${sa4.x * 3} \\Rightarrow x = ${sa4.x}$. Ba cạnh là ${sa4.x}, ${sa4.x + 1}, ${sa4.x + 2}. Cạnh lớn nhất là ${sa4.ans}.`
    }
  ];
};
