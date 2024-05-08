const statementLabels = {
    METRO: 'METRO',
    INTERNAL_TRANSACTION: 'INTERNAL_TRANSACTION',
    OZON: 'OZON',
    PYATEROCHKA: 'PYATEROCHKA',
    MAGNIT: 'MAGNIT',
    BYSTRONOM: 'BYSTRONOM',
    CASHBACK: 'CASHBACK',
    PHONE_INCOME: 'PHONE_INCOME',
    PHONE_EXPENSE: 'PHONE_EXPENSE',
    SBP_INCOME: 'SBP_INCOME',
    SBP_EXPENSE: 'SBP_EXPENSE',
    SMS_COMMISSION: 'SMS_COMMISSION',
    BEELINE: 'BEELINE',
    SALARY: 'SALARY',
    GAZPROMNEFT: 'GAZPROMNEFT',
    SHAWARMA: 'SHAWARMA',
    WATER_BOTTLE: 'WATER_BOTTLE',
    WIFI: 'WIFI',
    CONFECTIONERY: 'CONFECTIONERY',
    BOOSTY: 'BOOSTY',
    SKURATOV: 'SKURATOV',
    CHASHKA_KOFE: 'CHASHKA_KOFE',
    LIME: 'LIME',
    BEGET: 'BEGET',
    LAVKA_ZDOROVYA: 'LAVKA_ZDOROVYA',
    COFFEE_DALI: 'COFFEE_DALI',
    BRISTOL: 'BRISTOL',
    VILKA_LOZHKA: 'VILKA_LOZHKA',
    RUSSKIE_BLINY: 'RUSSKIE_BLINY'
};

module.exports = {
    statuses: {
        FORBIDDEN: 'FORBIDDEN',
        UNAUTHORIZED: 'UNAUTHORIZED',
        BAD_REQUEST: 'BAD_REQUEST',
        INTERNAL: 'INTERNAL'
    },
    statementLabels,
    categoryLabels: {
        FOOD: [
            statementLabels.METRO,
            statementLabels.PYATEROCHKA,
            statementLabels.MAGNIT,
            statementLabels.BYSTRONOM,
            statementLabels.WATER_BOTTLE,
            statementLabels.LAVKA_ZDOROVYA,
            statementLabels.BRISTOL
        ],
        CLOTHES: [
            statementLabels.LIME
        ],
        CAFES: [
            statementLabels.VILKA_LOZHKA
        ],
        STREET_FOOD: [
            statementLabels.SHAWARMA,
            statementLabels.RUSSKIE_BLINY
        ],
        COFFEE_SWEETS: [
            statementLabels.CONFECTIONERY,
            statementLabels.SKURATOV,
            statementLabels.CHASHKA_KOFE,
            statementLabels.COFFEE_DALI
        ],
        GASOLINE: [statementLabels.GAZPROMNEFT],
        OZON: [statementLabels.OZON],
        SALARY: [statementLabels.SALARY],
        TECH_EXPENSES: [
            statementLabels.WIFI,
            statementLabels.BOOSTY,
            statementLabels.BEELINE,
            statementLabels.BEGET
        ],
        INTERNAL: [statementLabels.INTERNAL_TRANSACTION],
        INCOME_TRANSACTION: [
            statementLabels.PHONE_INCOME, 
            statementLabels.CASHBACK,
            statementLabels.SBP_INCOME
        ],
        EXPENSE_TRANSACTION: [
            statementLabels.PHONE_EXPENSE,
            statementLabels.SMS_COMMISSION,
            statementLabels.SBP_EXPENSE
        ]
    },
    labelOptions: [
        {
            substring: 'METRO STORE',
            label: statementLabels.METRO
        },
        {
            substring: 'BEGET',
            label: statementLabels.BEGET
        },
        {
            substring: 'BRISTOL',
            label: statementLabels.BRISTOL
        },
        {
            substring: 'RUSSKIE BLINY',
            label: statementLabels.RUSSKIE_BLINY
        },
        {
            substring: 'Пришел перевод:',
            label: statementLabels.PHONE_INCOME
        },
        {
            substring: 'PYATEROCHKA',
            label: statementLabels.PYATEROCHKA
        },
        {
            substring: 'Coffee Dali',
            label: statementLabels.COFFEE_DALI
        },
        {
            substring: 'VILKA-LOZHKA',
            label: statementLabels.VILKA_LOZHKA
        },
        {
            substring: 'Оплата услуг в пользу Билайн Мобайл',
            label: statementLabels.BEELINE
        },
        {
            substring: 'MAGNIT',
            label: statementLabels.MAGNIT
        },
        {
            substring: 'LAVKA ZDOROVYA VESENNI',
            label: statementLabels.LAVKA_ZDOROVYA
        },
        {
            substring: 'BYSTRONOM',
            label: statementLabels.BYSTRONOM
        },
        {
            substring: ' LIME ',
            label: statementLabels.LIME
        },
        {
            substring: 'IP SANGINOV FT',
            label: statementLabels.SHAWARMA
        },
        {
            substring: 'IP MIZIKIN',
            label: statementLabels.CONFECTIONERY
        },
        {
            substring: 'CHASHKA KOFE',
            label: statementLabels.CHASHKA_KOFE
        },
        {
            substring: 'Перевод собственных средств',
            label: statementLabels.INTERNAL_TRANSACTION
        },
        {
            substring: 'Перевод на номер 0079618476363',
            label: statementLabels.OZON
        },
        {
            substring: 'Кэшбэк за',
            label: statementLabels.CASHBACK
        },
        {
            substring: 'Комиссия за СМС-Банк',
            label: statementLabels.SMS_COMMISSION
        },
        {
            substring: 'Перевод с номера 0079618476363',
            label: statementLabels.SALARY
        },
        {
            substring: 'GAZPROMNEFT',
            label: statementLabels.GAZPROMNEFT
        },
        {
            substring: 'NOVOTELEKOM NOVOSIBIRSK',
            label: statementLabels.WIFI
        },
        {
            substring: 'BOOSTY',
            label: statementLabels.BOOSTY
        },
        {
            substring: 'SKURATOV COFFEE',
            label: statementLabels.SKURATOV
        },
        {
            substring: 'BORJOMI NOVOSIBIRSK',
            label: statementLabels.WATER_BOTTLE
        }
    ]
}