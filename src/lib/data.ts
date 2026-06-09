import type { Question, Unit, VocabWord } from "./types";

export const vocabWords: VocabWord[] = [
  word("asset", "资产", "A resource owned or controlled by a company that is expected to provide future economic benefit.", "Accounting Basics", "Beginner", "Cash is an asset on the balance sheet.", ["resource", "property"], "Do not confuse an asset with revenue; revenue is earned during a period."),
  word("liability", "负债", "A present obligation that a company is expected to settle in the future.", "Accounting Basics", "Beginner", "A bank loan is recorded as a liability.", ["obligation", "debt"], "A liability is not an expense, although paying it may involve cash outflow."),
  word("equity", "所有者权益", "The owners' residual interest in assets after liabilities are deducted.", "Accounting Basics", "Beginner", "Retained earnings increase equity.", ["capital", "net assets"], "Equity is not the same as cash."),
  word("revenue", "收入", "Income earned from normal business activities such as selling goods or services.", "Accounting Basics", "Beginner", "Subscription fees are revenue for a software company.", ["sales", "turnover"], "Revenue is before deducting expenses; profit is after."),
  word("expense", "费用", "A cost incurred to generate revenue or run the business.", "Accounting Basics", "Beginner", "Rent and salaries are common expenses.", ["cost", "charge"], "An expense is not always paid immediately in cash."),
  word("profit", "利润", "The amount left after expenses are deducted from revenue.", "Accounting Basics", "Beginner", "Higher costs reduced the company's profit.", ["earnings", "income"], "Profit is different from revenue and cash flow."),

  word("audit", "审计", "An independent examination of financial information or controls.", "Audit Basics", "Beginner", "The audit team reviewed invoices and contracts.", ["inspection", "assurance"], "An audit provides reasonable assurance, not a guarantee."),
  word("evidence", "证据", "Information used by auditors to support their conclusions.", "Audit Basics", "Beginner", "Bank confirmations are strong audit evidence.", ["support", "documentation"], "Evidence must be relevant and reliable."),
  word("materiality", "重要性", "The threshold at which an error could influence users' decisions.", "Audit Basics", "Intermediate", "The auditor set materiality before testing began.", ["significance", "threshold"], "Materiality is judgment-based, not a fixed percentage for every audit."),
  word("internal control", "内部控制", "Processes designed to reduce risk and support reliable reporting.", "Audit Basics", "Intermediate", "Segregation of duties is an internal control.", ["control environment", "procedure"], "Controls reduce risk but do not eliminate it."),
  word("sampling", "抽样", "Testing a subset of items to draw conclusions about a population.", "Audit Basics", "Intermediate", "The auditor used sampling to test expense claims.", ["sample selection", "population"], "Sampling risk remains because not every item is tested."),
  word("misstatement", "错报", "An error or omission in financial information.", "Audit Basics", "Intermediate", "The team found a material misstatement in revenue.", ["error", "omission"], "Misstatements may be caused by error or fraud."),

  word("balance sheet", "资产负债表", "A statement showing assets, liabilities, and equity at a point in time.", "Business English Core", "Beginner", "The balance sheet showed strong cash reserves.", ["statement of financial position"], "It is a point-in-time statement, unlike the income statement."),
  word("income statement", "利润表", "A statement showing revenue, expenses, and profit over a period.", "Business English Core", "Beginner", "The income statement reported a net loss.", ["profit and loss", "P&L"], "It does not directly show cash movements."),
  word("cash flow statement", "现金流量表", "A statement explaining cash inflows and outflows during a period.", "Business English Core", "Intermediate", "The cash flow statement separated operating and financing cash flows.", ["statement of cash flows"], "Profit can be positive while operating cash flow is weak."),
  word("receivable", "应收款", "An amount owed to a company by customers or other parties.", "Business English Core", "Beginner", "The receivable was collected after 45 days.", ["accounts receivable", "debtor"], "Receivable means money to be received, not paid."),
  word("payable", "应付款", "An amount a company owes to suppliers or other parties.", "Business English Core", "Beginner", "The payable is due next month.", ["accounts payable", "creditor"], "Payable means money owed by the company."),
  word("inventory", "存货", "Goods held for sale or materials used in production.", "Business English Core", "Beginner", "Slow-moving inventory may need a write-down.", ["stock", "goods"], "Inventory is an asset until sold or written down."),

  word("substantive testing", "实质性测试", "Audit procedures designed to detect material misstatements in balances or transactions.", "Advanced Audit / Assurance", "Advanced", "Substantive testing included confirming receivables.", ["detail testing", "substantive procedures"], "It is different from testing whether controls operate effectively."),
  word("control testing", "控制测试", "Audit work that evaluates whether internal controls are designed and operating effectively.", "Advanced Audit / Assurance", "Advanced", "Control testing covered purchase approval workflows.", ["test of controls"], "Passing control testing may reduce, not remove, substantive testing."),
  word("going concern", "持续经营", "The assumption that an entity can continue operating for the foreseeable future.", "Advanced Audit / Assurance", "Advanced", "Debt covenant breaches raised going concern concerns.", ["continuity", "viability"], "It is an assumption about future operation, not current profitability only."),
  word("audit opinion", "审计意见", "The auditor's conclusion on whether financial statements are fairly presented.", "Advanced Audit / Assurance", "Advanced", "The company received an unmodified audit opinion.", ["auditor's report", "opinion"], "An unmodified opinion does not mean the business is risk-free."),
  word("analytical procedures", "分析程序", "Evaluations of financial information through relationships, trends, and expectations.", "Advanced Audit / Assurance", "Intermediate", "Analytical procedures compared margin trends across quarters.", ["ratio analysis", "trend analysis"], "They can identify risk but may not provide enough evidence alone."),
  word("working papers", "审计工作底稿", "Documents that record audit work performed, evidence obtained, and conclusions reached.", "Advanced Audit / Assurance", "Intermediate", "The manager reviewed the working papers.", ["audit files", "documentation"], "Working papers support the audit opinion; they are not client reports."),

  word("bond", "债券", "A debt security in which an issuer promises payments to investors.", "CFA / Finance Basics", "Beginner", "The government issued a ten-year bond.", ["fixed income", "debt instrument"], "A bond is debt, not ownership equity."),
  word("yield", "收益率", "The return an investor earns on a security, often expressed as a percentage.", "CFA / Finance Basics", "Intermediate", "Bond prices fell as yields rose.", ["return", "rate"], "Yield and coupon are related but not always equal."),
  word("duration", "久期", "A measure of a bond's sensitivity to interest-rate changes.", "CFA / Finance Basics", "Advanced", "Long-duration bonds are more sensitive to rate changes.", ["interest-rate sensitivity"], "Duration is not simply the bond's maturity."),
  word("portfolio", "投资组合", "A collection of investments held by an investor or fund.", "CFA / Finance Basics", "Beginner", "The portfolio includes bonds and equities.", ["holdings", "allocation"], "A portfolio can contain many asset classes."),
  word("volatility", "波动率", "The degree of variation in an asset's price or return.", "CFA / Finance Basics", "Intermediate", "High volatility makes returns less predictable.", ["risk", "fluctuation"], "Volatility is not the same as permanent loss."),
  word("liquidity", "流动性", "How easily an asset can be bought or sold without large price impact.", "CFA / Finance Basics", "Intermediate", "Treasury bills usually have high liquidity.", ["marketability", "cashability"], "Liquidity is about ease of trading, not profitability."),

  word("inflation", "通货膨胀", "A general rise in prices that reduces purchasing power.", "Market Vocabulary", "Beginner", "Inflation increased household costs.", ["price growth", "CPI"], "Inflation is a broad price trend, not one product becoming expensive."),
  word("interest rate", "利率", "The cost of borrowing money or the return on lending money.", "Market Vocabulary", "Beginner", "The central bank raised the interest rate.", ["borrowing cost", "policy rate"], "Interest rate changes affect bonds, loans, and currencies."),
  word("recession", "经济衰退", "A significant decline in economic activity across the economy.", "Market Vocabulary", "Intermediate", "Demand weakened during the recession.", ["downturn", "contraction"], "A recession is broader than one company's poor performance."),
  word("central bank", "中央银行", "An institution that manages monetary policy and financial stability.", "Market Vocabulary", "Beginner", "The central bank signaled a slower pace of rate hikes.", ["monetary authority"], "A central bank is not a commercial bank."),
  word("earnings", "盈利", "A company's profit, often reported quarterly or annually.", "Market Vocabulary", "Intermediate", "The share price rose after strong earnings.", ["profit", "net income"], "Earnings are not the same as revenue."),
  word("acquisition", "收购", "A transaction in which one company buys another company or asset.", "Market Vocabulary", "Intermediate", "The acquisition expanded the group's market share.", ["takeover", "purchase"], "An acquisition differs from organic growth.")
];

export const units: Unit[] = [
  unit("unit-accounting", "Accounting Basics", "Accounting Basics", "Beginner", 1, ["asset", "liability", "equity", "revenue", "expense", "profit"]),
  unit("unit-audit", "Audit Basics", "Audit Basics", "Intermediate", 2, ["audit", "evidence", "materiality", "internal control", "sampling", "misstatement"]),
  unit("unit-statements", "Financial Statements", "Business English Core", "Beginner", 3, ["balance sheet", "income statement", "cash flow statement", "receivable", "payable", "inventory"]),
  unit("unit-advanced-audit", "Advanced Audit", "Advanced Audit / Assurance", "Advanced", 4, ["substantive testing", "control testing", "going concern", "audit opinion", "analytical procedures", "working papers"]),
  unit("unit-cfa", "CFA Finance Basics", "CFA / Finance Basics", "Intermediate", 5, ["bond", "yield", "duration", "portfolio", "volatility", "liquidity"]),
  unit("unit-market", "Market Vocabulary", "Market Vocabulary", "Intermediate", 6, ["inflation", "interest rate", "recession", "central bank", "earnings", "acquisition"])
];

export const questions: Question[] = [
  q("q-acc-1", "unit-accounting", "asset", "meaning-mcq", "What does \"asset\" mean?", ["liability", "resource owned by a company", "cost of running a business", "owners' claim only"], "resource owned by a company", "An asset is a resource controlled by a company that should bring future benefit."),
  q("q-acc-2", "unit-accounting", "liability", "context-mcq", "The company has a legal obligation to repay a bank loan. This is recorded as a ______.", ["revenue", "liability", "equity", "dividend"], "liability", "A loan payable is a present obligation, so it is a liability."),
  q("q-acc-3", "unit-accounting", "equity", "reverse-mcq", "Which word means the owners' residual interest after liabilities are deducted?", ["expense", "equity", "asset", "revenue"], "equity", "Equity equals assets minus liabilities."),
  q("q-acc-4", "unit-accounting", "revenue", "similar-distinction", "Which word best describes money earned from selling goods or services?", ["revenue", "profit", "cash", "equity"], "revenue", "Revenue is earned from sales before deducting expenses."),
  q("q-acc-5", "unit-accounting", "expense", "context-mcq", "Rent, salaries, and utilities are usually recorded as ______.", ["assets", "expenses", "equity", "receivables"], "expenses", "Expenses are costs incurred to operate the business or generate revenue."),
  q("q-acc-6", "unit-accounting", "profit", "reverse-mcq", "Which word means the amount left after expenses are deducted from revenue?", ["profit", "liability", "asset", "sampling"], "profit", "Profit is the remaining income after expenses."),
  q("q-acc-7", "unit-accounting", "liability", "meaning-mcq", "What does \"liability\" mean?", ["a present obligation", "a customer invoice", "sales income", "cash in bank"], "a present obligation", "Liabilities are obligations the company must settle."),
  q("q-acc-8", "unit-accounting", "asset", "similar-distinction", "Which item is most likely an asset?", ["bank loan", "cash", "salary cost", "tax expense"], "cash", "Cash is a resource owned by the company."),
  q("q-acc-9", "unit-accounting", "revenue", "context-mcq", "A consulting firm bills clients for services performed. The amount billed is usually ______.", ["revenue", "liability", "expense", "equity"], "revenue", "Fees earned from services are revenue."),
  q("q-acc-10", "unit-accounting", "expense", "reverse-mcq", "Which word means a cost incurred to operate the business?", ["asset", "expense", "profit", "equity"], "expense", "An expense is a business cost for the reporting period."),

  q("q-aud-1", "unit-audit", "audit", "meaning-mcq", "What is an audit?", ["a sales forecast", "an independent examination", "a tax payment", "a loan agreement"], "an independent examination", "An audit independently examines information or controls."),
  q("q-aud-2", "unit-audit", "evidence", "context-mcq", "The auditor inspected invoices to support the recorded expense. The invoices are audit ______.", ["materiality", "evidence", "sampling", "opinion"], "evidence", "Evidence supports audit conclusions."),
  q("q-aud-3", "unit-audit", "materiality", "reverse-mcq", "Which word means the threshold at which an error could influence users' decisions?", ["misstatement", "materiality", "internal control", "working papers"], "materiality", "Materiality is based on whether users' decisions may be affected."),
  q("q-aud-4", "unit-audit", "internal control", "similar-distinction", "Which term describes procedures designed to reduce reporting risk?", ["internal control", "audit opinion", "inventory", "duration"], "internal control", "Internal controls help prevent or detect errors."),
  q("q-aud-5", "unit-audit", "sampling", "context-mcq", "Instead of checking every invoice, the auditor tested a selected subset. This is ______.", ["sampling", "profit", "acquisition", "liquidity"], "sampling", "Sampling means testing part of a population."),
  q("q-aud-6", "unit-audit", "misstatement", "meaning-mcq", "What does \"misstatement\" mean in audit?", ["price movement", "error or omission", "owner investment", "cash collection"], "error or omission", "A misstatement is incorrect or missing financial information."),
  q("q-aud-7", "unit-audit", "evidence", "reverse-mcq", "Which word means information used to support audit conclusions?", ["evidence", "revenue", "yield", "expense"], "evidence", "Audit evidence is the support for the auditor's conclusion."),
  q("q-aud-8", "unit-audit", "materiality", "context-mcq", "A tiny rounding error is unlikely to affect investor decisions, so it may be below ______.", ["materiality", "liquidity", "equity", "inventory"], "materiality", "Errors below materiality are less likely to affect decisions."),
  q("q-aud-9", "unit-audit", "internal control", "meaning-mcq", "What is an internal control?", ["a price index", "a risk-reducing process", "a debt security", "a profit target"], "a risk-reducing process", "Internal controls are processes that reduce operational or reporting risks."),
  q("q-aud-10", "unit-audit", "sampling", "similar-distinction", "Which term best fits testing 40 customer balances out of 2,000?", ["sampling", "recession", "payable", "duration"], "sampling", "Testing a subset of balances is sampling."),

  q("q-fs-1", "unit-statements", "balance sheet", "meaning-mcq", "What does a balance sheet show?", ["assets, liabilities, and equity at a point in time", "only cash paid during the month", "sales calls made by staff", "market share changes"], "assets, liabilities, and equity at a point in time", "The balance sheet presents financial position at a specific date."),
  q("q-fs-2", "unit-statements", "income statement", "context-mcq", "Revenue, expenses, and net profit are reported on the ______.", ["balance sheet", "income statement", "purchase order", "bond certificate"], "income statement", "The income statement reports performance over a period."),
  q("q-fs-3", "unit-statements", "cash flow statement", "reverse-mcq", "Which statement explains cash inflows and outflows during a period?", ["cash flow statement", "balance sheet", "audit opinion", "portfolio"], "cash flow statement", "The cash flow statement focuses on cash movement."),
  q("q-fs-4", "unit-statements", "receivable", "similar-distinction", "A customer owes the company for goods already delivered. This is a ______.", ["payable", "receivable", "liability", "expense"], "receivable", "A receivable is money owed to the company."),
  q("q-fs-5", "unit-statements", "payable", "context-mcq", "The company owes a supplier for materials purchased on credit. This is a ______.", ["payable", "receivable", "revenue", "portfolio"], "payable", "A payable is an amount the company owes."),
  q("q-fs-6", "unit-statements", "inventory", "meaning-mcq", "What is inventory?", ["goods held for sale", "interest paid to a bank", "owners' residual claim", "a completed audit file"], "goods held for sale", "Inventory is goods or materials held for sale or production."),
  q("q-fs-7", "unit-statements", "balance sheet", "reverse-mcq", "Which term means the statement of financial position?", ["income statement", "balance sheet", "sampling", "yield"], "balance sheet", "The balance sheet is also called the statement of financial position."),
  q("q-fs-8", "unit-statements", "cash flow statement", "similar-distinction", "Profit is positive, but cash collections are weak. Which statement helps explain the cash issue?", ["cash flow statement", "audit opinion", "income statement", "central bank"], "cash flow statement", "The cash flow statement explains cash inflows and outflows."),
  q("q-fs-9", "unit-statements", "receivable", "meaning-mcq", "What does \"receivable\" mean?", ["money owed to the company", "money the company owes", "goods held for sale", "market price volatility"], "money owed to the company", "Receivables are amounts expected to be collected."),
  q("q-fs-10", "unit-statements", "payable", "reverse-mcq", "Which word means an amount owed by the company to another party?", ["payable", "receivable", "asset", "revenue"], "payable", "A payable is an obligation to pay another party."),

  q("q-aa-1", "unit-advanced-audit", "substantive testing", "meaning-mcq", "What is substantive testing designed to detect?", ["material misstatements", "stock price changes", "loan interest only", "staff attendance"], "material misstatements", "Substantive testing looks for material misstatements in accounts or transactions."),
  q("q-aa-2", "unit-advanced-audit", "control testing", "context-mcq", "The auditor checks whether purchase approvals operated throughout the year. This is ______.", ["control testing", "substantive testing", "yield analysis", "inventory counting"], "control testing", "Control testing evaluates whether controls operate effectively."),
  q("q-aa-3", "unit-advanced-audit", "going concern", "reverse-mcq", "Which term means the assumption that an entity can continue operating for the foreseeable future?", ["going concern", "audit evidence", "duration", "recession"], "going concern", "Going concern is about the entity's ability to continue operations."),
  q("q-aa-4", "unit-advanced-audit", "audit opinion", "similar-distinction", "Which term describes the auditor's conclusion in the auditor's report?", ["audit opinion", "internal control", "earnings", "liquidity"], "audit opinion", "The audit opinion communicates the auditor's conclusion."),
  q("q-aa-5", "unit-advanced-audit", "analytical procedures", "context-mcq", "The audit team compares gross margin trends against expectations. This is an example of ______.", ["analytical procedures", "sampling", "acquisition", "control testing only"], "analytical procedures", "Analytical procedures use trends and relationships to evaluate information."),
  q("q-aa-6", "unit-advanced-audit", "working papers", "meaning-mcq", "What are audit working papers?", ["audit documentation", "shares purchased by auditors", "customer marketing plans", "bank interest rates"], "audit documentation", "Working papers document audit work, evidence, and conclusions."),
  q("q-aa-7", "unit-advanced-audit", "substantive testing", "reverse-mcq", "Which phrase means procedures such as confirming receivables to detect misstatement?", ["substantive testing", "central banking", "portfolio allocation", "equity funding"], "substantive testing", "Confirming balances is a substantive procedure."),
  q("q-aa-8", "unit-advanced-audit", "going concern", "context-mcq", "Severe cash shortages create doubt about whether the company can continue operating. This is a ______ issue.", ["going concern", "materiality", "receivable", "yield"], "going concern", "Going concern issues relate to the ability to continue operations."),
  q("q-aa-9", "unit-advanced-audit", "analytical procedures", "meaning-mcq", "What are analytical procedures?", ["evaluations using trends and relationships", "payments to suppliers", "shares owned by founders", "a bond's legal contract"], "evaluations using trends and relationships", "Analytical procedures compare recorded amounts with expectations."),
  q("q-aa-10", "unit-advanced-audit", "working papers", "similar-distinction", "Which item should record audit evidence obtained and conclusions reached?", ["working papers", "income statement", "market index", "customer invoice only"], "working papers", "Working papers are the audit file documentation."),

  q("q-cfa-1", "unit-cfa", "bond", "meaning-mcq", "What is a bond?", ["a debt security", "an audit document", "a sales invoice", "a company expense"], "a debt security", "A bond is a form of borrowing by the issuer."),
  q("q-cfa-2", "unit-cfa", "yield", "context-mcq", "Bond prices fell as market ______ rose.", ["yields", "inventories", "misstatements", "payables"], "yields", "Bond prices and yields generally move in opposite directions."),
  q("q-cfa-3", "unit-cfa", "duration", "reverse-mcq", "Which word measures a bond's sensitivity to interest-rate changes?", ["duration", "liquidity", "portfolio", "materiality"], "duration", "Duration measures interest-rate sensitivity."),
  q("q-cfa-4", "unit-cfa", "portfolio", "similar-distinction", "Which term describes a collection of investments held by an investor?", ["portfolio", "liability", "audit opinion", "payable"], "portfolio", "A portfolio is a group of investments."),
  q("q-cfa-5", "unit-cfa", "volatility", "meaning-mcq", "What does volatility describe?", ["variation in price or return", "money owed to suppliers", "income from sales", "audit documentation"], "variation in price or return", "Volatility measures how much returns or prices fluctuate."),
  q("q-cfa-6", "unit-cfa", "liquidity", "context-mcq", "An asset that can be sold quickly with little price impact has high ______.", ["liquidity", "duration", "materiality", "equity"], "liquidity", "Liquidity is ease of buying or selling without large price impact."),
  q("q-cfa-7", "unit-cfa", "yield", "meaning-mcq", "What does yield usually express?", ["investment return as a percentage", "audit error threshold", "goods held for sale", "a company takeover"], "investment return as a percentage", "Yield expresses return, commonly as a percentage."),
  q("q-cfa-8", "unit-cfa", "bond", "reverse-mcq", "Which word means a debt instrument issued to investors?", ["bond", "asset", "recession", "evidence"], "bond", "A bond is a debt instrument."),
  q("q-cfa-9", "unit-cfa", "volatility", "similar-distinction", "A stock moves sharply up and down every week. Which term best describes this?", ["volatility", "liquidity", "revenue", "sampling"], "volatility", "Large price swings indicate high volatility."),
  q("q-cfa-10", "unit-cfa", "portfolio", "context-mcq", "The fund's ______ includes equities, bonds, and cash.", ["portfolio", "misstatement", "payable", "opinion"], "portfolio", "A portfolio contains multiple investments."),

  q("q-mkt-1", "unit-market", "inflation", "meaning-mcq", "What is inflation?", ["a general rise in prices", "a company purchase", "an audit conclusion", "a supplier debt"], "a general rise in prices", "Inflation means broad price increases that reduce purchasing power."),
  q("q-mkt-2", "unit-market", "interest rate", "context-mcq", "The central bank raised the ______ to cool inflation.", ["interest rate", "inventory", "receivable", "audit opinion"], "interest rate", "Central banks often adjust interest rates to influence inflation."),
  q("q-mkt-3", "unit-market", "recession", "reverse-mcq", "Which word means a significant decline in economic activity?", ["recession", "acquisition", "earnings", "yield"], "recession", "A recession is a broad economic downturn."),
  q("q-mkt-4", "unit-market", "central bank", "similar-distinction", "Which institution manages monetary policy?", ["central bank", "audit committee", "supplier", "investment portfolio"], "central bank", "A central bank manages monetary policy and financial stability."),
  q("q-mkt-5", "unit-market", "earnings", "meaning-mcq", "What do earnings usually mean in market news?", ["company profit", "cash paid to suppliers", "items held for sale", "audit samples"], "company profit", "Earnings usually refer to company profit."),
  q("q-mkt-6", "unit-market", "acquisition", "context-mcq", "One company bought another to expand market share. This transaction is an ______.", ["acquisition", "expense", "inflation", "internal control"], "acquisition", "An acquisition happens when one company buys another."),
  q("q-mkt-7", "unit-market", "interest rate", "meaning-mcq", "What is an interest rate?", ["cost of borrowing or return on lending", "error in financial statements", "goods for resale", "owner's residual claim"], "cost of borrowing or return on lending", "Interest rates represent borrowing costs or lending returns."),
  q("q-mkt-8", "unit-market", "inflation", "similar-distinction", "Consumer prices rise across food, rent, and transport. Which term best fits?", ["inflation", "duration", "materiality", "profit"], "inflation", "Broad price increases across the economy are inflation."),
  q("q-mkt-9", "unit-market", "earnings", "context-mcq", "The company reported stronger quarterly ______ than analysts expected.", ["earnings", "sampling", "payables", "controls"], "earnings", "Quarterly earnings are a common measure of company profit."),
  q("q-mkt-10", "unit-market", "acquisition", "reverse-mcq", "Which word means buying another company or business?", ["acquisition", "recession", "liquidity", "expense"], "acquisition", "An acquisition is a purchase of another company or asset.")
];

export const questionTypeLabels: Record<Question["questionType"], string> = {
  "meaning-mcq": "Meaning MCQ",
  "context-mcq": "Context MCQ",
  "reverse-mcq": "Reverse MCQ",
  "similar-distinction": "Similar-word Distinction"
};

export function getUnit(unitId: string) {
  return units.find((unitItem) => unitItem.id === unitId);
}

export function getWord(wordId: string) {
  return vocabWords.find((item) => item.id === wordId);
}

export function getQuestionsForUnit(unitId: string) {
  return questions.filter((question) => question.unitId === unitId);
}

function word(
  wordId: string,
  chineseMeaning: string,
  englishDefinition: string,
  category: VocabWord["category"],
  difficulty: VocabWord["difficulty"],
  exampleSentence: string,
  relatedWords: string[],
  commonMistake: string
): VocabWord {
  return { id: wordId, word: wordId, chineseMeaning, englishDefinition, category, difficulty, exampleSentence, relatedWords, commonMistake };
}

function unit(id: string, title: string, category: Unit["category"], difficulty: Unit["difficulty"], orderIndex: number, wordIds: string[]): Unit {
  return { id, title, category, difficulty, orderIndex, wordIds };
}

function q(
  id: string,
  unitId: string,
  vocabWordId: string,
  questionType: Question["questionType"],
  questionText: string,
  options: string[],
  correctAnswer: string,
  explanation: string
): Question {
  return { id, unitId, vocabWordId, questionType, questionText, options, correctAnswer, explanation };
}
