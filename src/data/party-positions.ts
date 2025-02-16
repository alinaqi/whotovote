export interface PartyPosition {
  name: string;
  color: string;
  textColor: string;
  manifestoPdf: string;
  positions: {
    [key: string]: string;
  };
  fullPositions: {
    [key: string]: {
      title: string;
      description: string;
    }[];
  };
}

export const POSITION_CATEGORIES = {
  MIGRATION: 'Migration/Immigration',
  ISLAM: 'Islam',
  TAX: 'Tax Policy',
  ENERGY: 'Energy Policy',
  FOREIGN: 'Foreign Policy',
  SEX_ED: 'Sex Education/LGBTQ+'
} as const;

export type PositionCategory = typeof POSITION_CATEGORIES[keyof typeof POSITION_CATEGORIES];

export const partyPositions: PartyPosition[] = [
  {
    name: 'CDU',
    color: '#000000',
    textColor: '#ffffff',
    manifestoPdf: '/cdu.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Controlled immigration focusing on skilled labor',
      [POSITION_CATEGORIES.ISLAM]: 'Recognizes Islam with integration focus',
      [POSITION_CATEGORIES.TAX]: 'Corporate tax cuts and solidarity levy abolition',
      [POSITION_CATEGORIES.ENERGY]: 'Balanced energy mix including nuclear',
      [POSITION_CATEGORIES.FOREIGN]: 'Strong NATO and EU support',
      [POSITION_CATEGORIES.SEX_ED]: 'Supports LGBTQ+ rights and comprehensive education'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Advocates for controlled immigration, emphasizing skilled labor; supports stricter asylum policies and efficient deportation processes.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'Recognizes Islam as part of German society but calls for measures to ensure integration and adherence to constitutional values.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Proposes tax cuts, including capping corporate taxes at 25%, abolishing the solidarity levy, and reducing income tax.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Supports a balanced energy mix, including renewable energy and a potential return to nuclear power to ensure energy security and affordability.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Strongly supports NATO and the EU; advocates for increased defense spending and a firm stance against Russian aggression.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Supports comprehensive sex education; upholds LGBTQ+ rights, including same-sex marriage.'
        }
      ]
    }
  },
  {
    name: 'SPD',
    color: '#E3000F',
    textColor: '#ffffff',
    manifestoPdf: '/spd.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Regulated immigration with integration focus',
      [POSITION_CATEGORIES.ISLAM]: 'Promotes interfaith dialogue',
      [POSITION_CATEGORIES.TAX]: 'Tax relief for low/middle income',
      [POSITION_CATEGORIES.ENERGY]: 'Phase out coal and nuclear',
      [POSITION_CATEGORIES.FOREIGN]: 'Diplomatic solutions focus',
      [POSITION_CATEGORIES.SEX_ED]: 'Strong LGBTQ+ rights support'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Supports regulated immigration with a focus on integration; opposes asylum procedures in third countries and emphasizes humanitarian responsibilities.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'Recognizes Islam as part of German society; promotes interfaith dialogue and anti-discrimination measures.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Focuses on tax relief for low and middle-income households; proposes reducing VAT on groceries and increasing taxes on higher incomes and inheritances.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Committed to phasing out coal and nuclear energy; invests in renewable energy and infrastructure to achieve climate goals.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Proposes cautious foreign policy; supports diplomatic solutions and balanced relations, including with Russia and China.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Advocates for inclusive sex education; strongly supports LGBTQ+ rights and anti-discrimination laws.'
        }
      ]
    }
  },
  {
    name: 'Greens',
    color: '#46962b',
    textColor: '#ffffff',
    manifestoPdf: '/greens.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Open immigration with human rights focus',
      [POSITION_CATEGORIES.ISLAM]: 'Supports multicultural society',
      [POSITION_CATEGORIES.TAX]: 'Higher taxes on wealth',
      [POSITION_CATEGORIES.ENERGY]: 'Rapid renewable transition',
      [POSITION_CATEGORIES.FOREIGN]: 'Human rights and environment focus',
      [POSITION_CATEGORIES.SEX_ED]: 'Strong LGBTQ+ rights advocacy'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Supports open immigration policies with a focus on human rights; advocates for fair asylum procedures and opposes deportations to unsafe countries.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'Recognizes Islam as part of Germany\'s multicultural society; promotes religious freedom and anti-discrimination efforts.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Proposes tax reforms to increase taxes on high incomes and wealth; supports a billionaire tax to fund social and environmental programs.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Strongly advocates for renewable energy; aims for rapid decarbonization and opposes nuclear energy; supports subsidies for low-income households during the green transition.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Emphasizes human rights and environmental issues in foreign policy; supports strong EU integration and aid to developing countries.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Advocates for comprehensive sex education; strongly supports LGBTQ+ rights, including same-sex marriage and anti-discrimination measures.'
        }
      ]
    }
  },
  {
    name: 'FDP',
    color: '#ffed00',
    textColor: '#000000',
    manifestoPdf: '/fdp.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Points-based immigration system',
      [POSITION_CATEGORIES.ISLAM]: 'Emphasizes individual rights',
      [POSITION_CATEGORIES.TAX]: 'Tax cuts and system simplification',
      [POSITION_CATEGORIES.ENERGY]: 'Market-based energy solutions',
      [POSITION_CATEGORIES.FOREIGN]: 'Strong transatlantic alliance',
      [POSITION_CATEGORIES.SEX_ED]: 'Supports individual freedoms'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Supports skilled immigration to address labor shortages; advocates for a points-based immigration system similar to Canada\'s.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'Recognizes Islam as part of German society; emphasizes individual rights and religious freedoms.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Advocates for tax cuts, especially for middle-income earners; proposes simplifying the tax system and reducing bureaucratic hurdles for businesses.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Supports innovation in energy, including renewable sources; promotes market-based solutions and technological advancements for energy efficiency.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Advocates for a strong transatlantic alliance; supports free trade and a proactive role in international organizations like the EU and UN.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Supports comprehensive sex education; upholds individual freedoms and rights, including those of the LGBTQ+ community.'
        }
      ]
    }
  },
  {
    name: 'Die Linke',
    color: '#BE3075',
    textColor: '#ffffff',
    manifestoPdf: '/dielinke.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Open borders policy',
      [POSITION_CATEGORIES.ISLAM]: 'Promotes secular diversity',
      [POSITION_CATEGORIES.TAX]: 'Higher taxes on wealth',
      [POSITION_CATEGORIES.ENERGY]: '100% renewable energy',
      [POSITION_CATEGORIES.FOREIGN]: 'Pacifist approach',
      [POSITION_CATEGORIES.SEX_ED]: 'Strong LGBTQ+ advocacy'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Advocates for open borders and the right to asylum; opposes deportations and supports the regularization of undocumented migrants.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'Recognizes Islam as part of Germany\'s diverse society; opposes discrimination and promotes secularism.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Proposes higher taxes on the wealthy and large corporations; supports increased public spending on social programs and infrastructure.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Strongly opposes nuclear and coal energy; advocates for 100% renewable energy and public ownership of energy utilities.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Promotes a pacifist foreign policy; opposes military interventions and advocates for disarmament and non-alignment.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Supports inclusive sex education; strongly advocates for LGBTQ+ rights and gender equality measures.'
        }
      ]
    }
  },
  {
    name: 'AfD',
    color: '#009EE0',
    textColor: '#ffffff',
    manifestoPdf: '/afd.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Net-zero immigration policy',
      [POSITION_CATEGORIES.ISLAM]: 'Opposes Islamic practices',
      [POSITION_CATEGORIES.TAX]: 'Significant tax reductions',
      [POSITION_CATEGORIES.ENERGY]: 'Supports fossil fuels',
      [POSITION_CATEGORIES.FOREIGN]: 'National interests priority',
      [POSITION_CATEGORIES.SEX_ED]: 'Opposes early sex education'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Advocates for strict immigration controls, including net-zero immigration; opposes asylum for individuals without identification and supports mass deportations.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'States that Islam does not belong to Germany; calls for bans on Islamic practices like the burqa and restrictions on mosque constructions.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Proposes significant tax reductions, including abolishing inheritance and wealth taxes; supports a simplified tax system with upper limits on taxes and duties.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Opposes Germany\'s progressive climate policies; supports the use of fossil fuels and a break from the Eurozone in favor of the Deutsche Mark.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Advocates for a foreign policy that prioritizes national interests; opposes sanctions on Russia and supports stronger ties with countries outside the EU.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Opposes early sexual education and gender mainstreaming; does not support same-sex marriage, favoring civil unions instead.'
        }
      ]
    }
  },
  {
    name: 'BSW',
    color: '#9B2242',
    textColor: '#ffffff',
    manifestoPdf: '/bsw.pdf',
    positions: {
      [POSITION_CATEGORIES.MIGRATION]: 'Strict immigration control with social focus',
      [POSITION_CATEGORIES.ISLAM]: 'Secular state emphasis',
      [POSITION_CATEGORIES.TAX]: 'Higher taxes on wealthy, support for lower income',
      [POSITION_CATEGORIES.ENERGY]: 'Affordable energy focus',
      [POSITION_CATEGORIES.FOREIGN]: 'Peace-oriented diplomacy',
      [POSITION_CATEGORIES.SEX_ED]: 'Traditional values with tolerance'
    },
    fullPositions: {
      [POSITION_CATEGORIES.MIGRATION]: [
        {
          title: 'Immigration Policy',
          description: 'Advocates for stricter immigration controls while maintaining humanitarian obligations; supports limiting economic migration and focusing on genuine asylum seekers.'
        }
      ],
      [POSITION_CATEGORIES.ISLAM]: [
        {
          title: 'Religious Integration',
          description: 'Emphasizes secular state principles while respecting religious freedoms; supports integration requirements and opposes religious extremism.'
        }
      ],
      [POSITION_CATEGORIES.TAX]: [
        {
          title: 'Tax Reform',
          description: 'Supports higher taxation of wealthy individuals and large corporations; advocates for social welfare programs and protection of lower-income groups.'
        }
      ],
      [POSITION_CATEGORIES.ENERGY]: [
        {
          title: 'Energy Strategy',
          description: 'Prioritizes affordable energy access; supports pragmatic energy policy including temporary use of conventional sources while transitioning to renewables.'
        }
      ],
      [POSITION_CATEGORIES.FOREIGN]: [
        {
          title: 'International Relations',
          description: 'Advocates for peace-oriented diplomacy; supports de-escalation with Russia, critical of NATO expansion, and emphasizes German economic interests.'
        }
      ],
      [POSITION_CATEGORIES.SEX_ED]: [
        {
          title: 'Social Policy',
          description: 'Balances traditional values with tolerance; supports basic rights while being critical of what they term "excessive identity politics".'
        }
      ]
    }
  }
]; 
