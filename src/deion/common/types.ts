import { Face } from "facesjs";
import { MouseEvent } from "react";
import { Context } from "bbgm-router";
import processInputs from "../worker/api/processInputs";
import views from "../worker/views";

export type Env = {
	enableLogging: boolean;
	heartbeatID: string;
	useSharedWorker: boolean;
};

declare global {
	interface Window {
		TriggerPrompt: any;
		bbgm: any; // Just for debugging
		bbgmAds: any;
		bbgmVersion: string;
		bbgmVersionUI: string;
		bbgmVersionWorker: string;
		bugsnagClient: any;
		enableLogging: boolean;
		getTheme: (theme?: "light" | "dark") => string;
		googleAnalyticsID: string;
		heartbeatID: string;
		themeCSSLink: HTMLLinkElement;
		useSharedWorker: boolean;
		withGoodUI: () => void;
		withGoodWorker: () => void;
	}

	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test";
			SPORT: "basketball" | "football";
		}
	}
}

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type View<T extends keyof typeof views> = Exclude<
	ThenArg<ReturnType<typeof views[T]>>,
	void | { redirectUrl: string }
>;

export type ViewInput<T extends keyof typeof processInputs> = Exclude<
	ReturnType<typeof processInputs[T]>,
	{ redirectUrl: string }
>;

export type AchievementWhen =
	| "afterAwards"
	| "afterFired"
	| "afterPlayoffs"
	| "afterRegularSeason";

export type Achievement = {
	slug: string;
	name: string;
	category: string;
	desc: string;
	check?: () => Promise<boolean>;
	when?: AchievementWhen;
};

export type AllStarPlayer = {
	injured?: true;
	pid: number;
	tid: number;
	name: string;
};

export type AllStars = {
	season: number;
	teamNames: [string, string];
	teams: [AllStarPlayer[], AllStarPlayer[]];
	remaining: AllStarPlayer[];
	finalized: boolean;
};

export type CompositeWeights<RatingKey = string> = {
	[key: string]: {
		ratings: (RatingKey | number)[];
		weights?: number[];
		skill?: {
			label: string;
			cutoff?: number;
		};
	};
};

// Not exact because https://github.com/facebook/flow/issues/2386 - same thing elsewhere
export type Conditions = {
	hostID?: number;
};

export type DraftLotteryResultArray = {
	tid: number;
	originalTid: number;
	chances: number;
	pick?: number;
	won: number;
	lost: number;
	tied: number;
}[];

export type DraftLotteryResult = {
	season: number;
	draftType?: "nba1994" | "nba2019";
	result: DraftLotteryResultArray;
};

export type DraftPickWithoutDpid = {
	tid: number;
	originalTid: number;
	round: number;
	pick: number;
	// 0 if not set
	season: number | "fantasy";
};

export type DraftPick = {
	dpid: number;
} & DraftPickWithoutDpid;

export type EventBBGM = any;

export type Game = {
	att: number;
	clutchPlays?: string[];
	gid: number;
	lost: {
		tid: number;
		pts: number;
	};
	playoffs: boolean;
	overtimes: number;
	scoringSummary?: any;
	season: number;
	teams: [any, any];
	won: {
		tid: number;
		pts: number;
	};
};

export type GamePlayer = any;

export type GameResults = any;

export type GameAttributesNonLeague = { lid: undefined };

export type GameAttributesLeague = {
	aiTrades: boolean;
	allStarGame: boolean;
	autoDeleteOldBoxScores: boolean;
	brotherRate: number;
	budget: boolean;
	confs: { cid: number; name: string }[];
	easyDifficultyInPast: boolean;
	daysLeft: number;
	defaultStadiumCapacity: number;
	difficulty: number;
	divs: { cid: number; did: number; name: string }[];
	draftType: "nba1994" | "nba2019" | "noLottery" | "random";
	foulsNeededToFoulOut: number;
	foulRateFactor: number;
	gameOver: boolean;
	godMode: boolean;
	godModeInPast: boolean;
	gracePeriodEnd: number;
	hardCap: boolean;
	homeCourtAdvantage: number;
	injuryRate: number;
	leagueName: string;
	lid: number;
	luxuryPayroll: number;
	luxuryTax: number;
	maxContract: number;
	maxRosterSize: number;
	minContract: number;
	minPayroll: number;
	minRosterSize: number;
	names?: Names;
	nextPhase?: Phase;
	numDraftRounds: number;
	numGames: number;
	numGamesPlayoffSeries: number[];
	numPlayoffByes: number;
	numTeams: number;
	numSeasonsFutureDraftPicks: number;
	phase: Phase;
	playersRefuseToNegotiate: boolean;
	quarterLength: number;
	salaryCap: number;
	season: number;
	sonRate: number;
	startingSeason: number;
	stopOnInjury: boolean;
	stopOnInjuryGames: number;
	teamAbbrevsCache: string[];
	teamNamesCache: string[];
	teamRegionsCache: string[];
	ties: boolean;
	tragicDeathRate: number;
	userTid: number;
	userTids: number[];
};

export type GameAttributes = GameAttributesNonLeague | GameAttributesLeague;

export type GameAttributeKey = keyof GameAttributesLeague;

export type GameAttribute = {
	key: GameAttributeKey;
	value: any;
};

export type GameProcessed = {
	gid: number;
	home: boolean;
	oppPts: number;
	oppTid: number;
	oppAbbrev: string;
	overtime: string;
	result: "W" | "L" | "T";
	tid?: number;
	pts: number;
};

export type GameProcessedCompleted = {
	gid: number;
	overtime: string;
	result: "W" | "L" | "T";
	score: string;
	teams: [any, any];
};

export type League = {
	lid?: number;
	name: string;
	tid: number;
	phaseText: string;
	teamName: string;
	teamRegion: string;
	heartbeatID?: string;
	heartbeatTimestamp?: number;
	difficulty?: number;
	starred?: boolean;
	created?: Date;
	lastPlayed?: Date;
};

export type Locks = {
	drafting: boolean;
	gameSim: boolean;
	newPhase: boolean;
	stopGameSim: boolean;
};

export type LockName = "drafting" | "newPhase" | "gameSim" | "stopGameSim";

export type LogEventType =
	| "achievement"
	| "ageFraud"
	| "award"
	| "changes"
	| "draft"
	| "error"
	| "freeAgent"
	| "gameLost"
	| "gameTied"
	| "gameWon"
	| "hallOfFame"
	| "healed"
	| "healedList"
	| "info"
	| "injured"
	| "injuredList"
	| "playerFeat"
	| "playoffs"
	| "reSigned"
	| "refuseToSign"
	| "release"
	| "retired"
	| "screenshot"
	| "success"
	| "trade"
	| "tragedy"
	| "upgrade";

export type LogEventSaveOptions = {
	type: LogEventType;
	text: string;
	pids?: number[];
	tids?: number[];
};

export type LogEventShowOptions = {
	extraClass?: string;
	persistent: boolean;
	text: string;
	type: string;
};

export type OwnerMood = {
	money: number;
	playoffs: number;
	wins: number;
};

export type MessageWithoutMid = {
	from: string;
	read: boolean;
	text: string;
	year: number;
	subject?: string;
	ownerMoods?: OwnerMood[];
};

export type Message = {
	mid: number;
} & MessageWithoutMid;

export type MenuItemLink = {
	type: "link";
	active?: (a?: string) => boolean;
	league?: true;
	godMode?: true;
	nonLeague?: true;
	onClick?: (a: MouseEvent) => void | false | Promise<void | false>; // Return false to leave sidebar open
	path?: string | (number | string)[];
	text:
		| Exclude<React.ReactNode, null | undefined | number | boolean>
		| {
				side: Exclude<React.ReactNode, null | undefined | number | boolean>;
				top: Exclude<React.ReactNode, null | undefined | number | boolean>;
		  };
};

export type MenuItemHeader = {
	type: "header";
	long: string;
	short: string;
	league?: true;
	nonLeague?: true;
	children: MenuItemLink[];
};

export type Names = {
	first: {
		[key: string]: [string, number][];
	};
	last: {
		[key: string]: [string, number][];
	};
};

export type Negotiation = {
	pid: number;
	tid: number;
	resigning: boolean;
};

export type Option = {
	id: string;
	label: string;
	url?: string;
};

export type LocalStateUI = {
	gold?: boolean;
	godMode: boolean;
	hasViewedALeague: boolean;
	lid?: number;
	leagueName: string;
	phase: number;
	phaseText: string;
	playMenuOptions: Option[];
	popup: boolean;
	season: number;
	showNagModal: boolean;
	sidebarOpen: boolean;
	startingSeason: number;
	statusText: string;
	teamAbbrevsCache: string[];
	teamNamesCache: string[];
	teamRegionsCache: string[];
	userTid: number;
	userTids: number[];
	username?: string;
	viewInfo?: {
		Component: any;
		id: string;
		inLeague: boolean;
		context: Context;
		cb: (a?: Error) => void;
	};
	title?: string;
	hideNewWindow: boolean;
	jumpTo: boolean;
	jumpToSeason?: number;
	dropdownExtraParam?: number | string;
	dropdownView?: string;
	dropdownFields?: {
		[key: string]: number | string;
	};
	moreInfoAbbrev?: string;
	moreInfoSeason?: number;
};

export type PartialTopMenu = {
	email: string;
	goldCancelled: boolean;
	goldUntil: number;
	username: string;
};

export type Phase = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PhaseReturn = [string | undefined, UpdateEvents];

export type PlayerContract = {
	amount: number;
	exp: number;
};

export type PlayerFeat = {
	fid?: number;
	pid: number;
	name: string;
	pos: string;
	season: number;
	tid: number;
	oppTid: number;
	playoffs: boolean;
	gid: number;
	stats: any;
	won: boolean;
	score: string;
	overtimes: number;
};

export type PlayerFiltered = any;

export type PlayerInjury = {
	gamesRemaining: number;
	type: string;
};
type PlayerSalary = {
	amount: number;
	season: number;
};

// ***p stats can be undefined
export type PlayerStats = any;

export type RelativeType = "brother" | "father" | "son";

export type Relative = {
	type: RelativeType;
	pid: number;
	name: string;
};

export type MinimalPlayerRatings = {
	ovr: number;
	pot: number;
	fuzz: number;
	pos: string;
	skills: string[];
	season: number;
	ovrs: any;
	pots: any;
	injuryIndex?: number;
	hgt: number;
	stre: number;
	spd: number;
	endu: number;
};

export type PlayerWithoutPid<PlayerRatings = any> = {
	awards: {
		season: number;
		type: string;
	}[];
	born: {
		year: number;
		loc: string;
	};
	college: string;
	contract: PlayerContract;
	diedYear?: number;
	draft: {
		round: number;
		pick: number;
		tid: number;
		originalTid: number;
		year: number;
		pot: number;
		ovr: number;
		skills: string[];
	};
	face: Face;
	firstName: string;
	freeAgentMood: number[];
	gamesUntilTradable: number;
	hgt: number;
	hof: boolean;
	imgURL: string;
	injury: PlayerInjury;
	injuries: {
		season: number;
		games: number;
		type: string;
		ovrDrop?: number;
		potDrop?: number;
	}[];
	lastName: string;
	pos?: string;
	// Only in players from custom league files
	ptModifier: number;
	ratings: PlayerRatings[];
	relatives: Relative[];
	retiredYear: number;
	rosterOrder: number;
	salaries: PlayerSalary[];
	stats: PlayerStats[];
	statsTids: number[];
	tid: number;
	value: number;
	valueNoPot: number;
	valueFuzz: number;
	valueNoPotFuzz: number;
	valueWithContract: number;
	watch: boolean;
	weight: number;
	yearsFreeAgent: number;
}; // Spread rather than intersection because we need it to be recognized as exact.
// https://flow.org/en/docs/types/unions/#toc-disjoint-unions-with-exact-types
// https://github.com/facebook/flow/issues/4946

export type Player<PlayerRatings = any> = {
	pid: number;
} & PlayerWithoutPid<PlayerRatings>;

export type PlayerStatType = "per36" | "perGame" | "totals";

export type PlayersPlusOptions = {
	season?: number;
	tid?: number;
	attrs?: string[];
	ratings?: string[];
	stats?: string[];
	playoffs?: boolean;
	regularSeason?: boolean;
	showNoStats?: boolean;
	showRookies?: boolean;
	showRetired?: boolean;
	fuzz?: boolean;
	oldStats?: boolean;
	numGamesRemaining?: number;
	statType?: PlayerStatType;
};

export type PlayerNames = Names & {
	countries: [string, number][];
};

export type Local = {
	autoPlaySeasons: number;
	fantasyDraftResults: Player<any>[];
	goldUntil: number;
	leagueLoaded: boolean;
	phaseText: string;
	playerNames?: PlayerNames;
	playingUntilEndOfRound: boolean;
	statusText: string;
	unviewedSeasonSummary: boolean;
	reset?: () => void;
};

export type PlayoffSeriesTeam = {
	abbrev?: string;
	cid: number;
	imgURL?: string;
	pts?: number;
	// undefined means game hasn't happened yet
	region?: string;
	regularSeason?: {
		won: number;
		lost: number;
		tied?: number;
	};
	seed: number;
	tid: number;
	winp: number;
	won: number;
};

export type PlayoffSeries = {
	season: number;
	currentRound: number;
	series: {
		home: PlayoffSeriesTeam;
		away?: PlayoffSeriesTeam;
	}[][];
};

export type ContractInfo = {
	pid: number;
	firstName: string;
	lastName: string;
	skills: string[];
	pos: string;
	injury: PlayerInjury;
	amount: number;
	exp: number;
	released: boolean;
	watch: boolean;
};

export type ReleasedPlayer = {
	rid: number;
	pid: number;
	tid: number;
	contract: PlayerContract;
};

export type ReleasedPlayerWithoutRid = {
	pid: number;
	tid: number;
	contract: PlayerContract;
};

export type ScheduleGame = {
	gid?: number;
	awayTid: number;
	homeTid: number;
};

export type SortOrder = "asc" | "desc";

export type SortType =
	| "currency"
	| "draftPick"
	| "lastTen"
	| "name"
	| "number"
	| "record";

type BudgetItem = {
	amount: number;
	rank: number;
};

export type Team = {
	tid: number;
	cid: number;
	did: number;
	region: string;
	name: string;
	abbrev: string;
	imgURL?: string;
	budget: Record<
		"ticketPrice" | "scouting" | "coaching" | "health" | "facilities",
		BudgetItem
	>;
	strategy: "contending" | "rebuilding";
	depth?: {
		QB: number[];
		RB: number[];
		WR: number[];
		TE: number[];
		OL: number[];
		DL: number[];
		LB: number[];
		CB: number[];
		S: number[];
		K: number[];
		P: number[];
		KR: number[];
		PR: number[];
	};
	colors: [string, string, string];
};

export type TeamBasic = {
	tid: number;
	cid: number;
	did: number;
	region: string;
	name: string;
	abbrev: string;
	pop: number;
	popRank?: number;
	imgURL?: string;
	colors: [string, string, string];
};

export type TeamAttr = string;

export type TeamSeasonAttr = string;

export type TeamStatAttr = string;

export type TeamStatType = "perGame" | "totals";

export type TeamFiltered = any;

export type TeamSeason = {
	tid: number;
	season: number;
	gp: number;
	gpHome: number;
	att: number;
	cash: number;
	won: number;
	lost: number;
	tied: number;
	wonHome: number;
	lostHome: number;
	tiedHome: number;
	wonAway: number;
	lostAway: number;
	tiedAway: number;
	wonDiv: number;
	lostDiv: number;
	tiedDiv: number;
	wonConf: number;
	lostConf: number;
	tiedConf: number;
	lastTen: (-1 | 0 | 1)[];
	streak: number;
	playoffRoundsWon: number;
	// -1: didn't make playoffs. 0: lost in first round. ... N: won championship
	hype: number;
	pop: number;
	stadiumCapacity: number;
	revenues: {
		luxuryTaxShare: BudgetItem;
		merch: BudgetItem;
		sponsor: BudgetItem;
		ticket: BudgetItem;
		nationalTv: BudgetItem;
		localTv: BudgetItem;
	};
	expenses: {
		salary: BudgetItem;
		luxuryTax: BudgetItem;
		minTax: BudgetItem;
		scouting: BudgetItem;
		coaching: BudgetItem;
		health: BudgetItem;
		facilities: BudgetItem;
	};
	payrollEndOfSeason: number;
	ownerMood?: OwnerMood;
};

// opp stats (except Blk) can be undefined
export type TeamStats = any;

export type TradePickValues = {
	[key: string]: number[];
};
type TradeSummaryTeam = {
	name: string;
	payrollAfterTrade: number;
	payrollBeforeTrade: number;
	picks: {
		dpid: number;
		desc: string;
	}[];
	total: number;
	trade: PlayerFiltered[];
};

export type TradeSummary = {
	teams: [TradeSummaryTeam, TradeSummaryTeam];
	warning: null | string;
};

export type TradeTeam = {
	dpids: number[];
	dpidsExcluded: number[];
	pids: number[];
	pidsExcluded: number[];
	tid: number;
	warning?: string | null;
};

export type TradeTeams = [TradeTeam, TradeTeam];

export type Trade = {
	rid: 0;
	teams: TradeTeams;
};

export type UpdateEvents = (
	| "account"
	| "firstRun"
	| "g.userTids"
	| "gameAttributes"
	| "gameSim"
	| "leagues"
	| "lock.gameSim"
	| "newPhase"
	| "playerMovement"
	| "teamFinances"
	| "watchList"
)[];

export type WorkerOverridesConstants = {
	COMPOSITE_WEIGHTS: CompositeWeights;
	PLAYER_STATS_TABLES: {
		[key: string]: {
			name: string;
			onlyShowIf?: string[];
			stats: string[];
			superCols?: any[];
		};
	};
	RATINGS: any[];
	POSITION_COUNTS: {
		[key: string]: number;
	};
	POSITIONS: any[];
	TEAM_STATS_TABLES: {
		[key: string]: {
			name: string;
			stats: string[];
			superCols?: any[];
		};
	};
	TIME_BETWEEN_GAMES: string;
};

export type WorkerOverridesCore = {
	GameSim: any;
	player: {
		checkStatisticalFeat?: (
			p: GamePlayer,
		) =>
			| {
					[key: string]: number;
			  }
			| undefined;
		developSeason?: (ratings: any, age: number, coachingRank?: number) => void;
		genRatings?: (season: number, scoutingRank: number) => any;
		genWeight?: (hgt: number, stre: number) => number;
		getDepthPlayers?: <
			T extends {
				pid: number;
			}
		>(
			depth: {
				QB: number[];
				RB: number[];
				WR: number[];
				TE: number[];
				OL: number[];
				DL: number[];
				LB: number[];
				CB: number[];
				S: number[];
				K: number[];
				P: number[];
				KR: number[];
				PR: number[];
			},
			players: T[],
		) => {
			QB: T[];
			RB: T[];
			WR: T[];
			TE: T[];
			OL: T[];
			DL: T[];
			LB: T[];
			CB: T[];
			S: T[];
			K: T[];
			P: T[];
			KR: T[];
			PR: T[];
		};
		heightToRating?: (heightInInches: number) => number;
		madeHof?: (p: Player | PlayerWithoutPid) => boolean;
		ovr?: (a: any, pos?: any) => number;
		pos?: (a: any) => string;
		processStats?: (
			ps: PlayerStats,
			stats: string[],
			statType: PlayerStatType,
			bornYear: number,
		) => any;
		stats?: {
			derived: string[];
			raw: string[];
		};
	};
	season: {
		doAwards?: (conditions: Conditions) => Promise<void>;
		newSchedule?: (teams: Team[]) => [number, number][];
	};
	team: {
		ovr?: (
			players: {
				ratings: {
					ovr: number;
					pos: string;
				};
			}[],
		) => number;
		processStats?: (
			ts: TeamStats,
			stats: TeamStatAttr[],
			playoffs: boolean,
			statType: TeamStatType,
		) => any;
		rosterAutoSort?: (
			tid: number,
			onlyNewPlayers?: boolean,
			pos?: any,
		) => Promise<void>;
		stats?: {
			derived: string[];
			raw: string[];
		};
	};
};

export type WorkerOverridesUtil = {
	achievements: Achievement[];
	advStats: () => Promise<void>;
	changes: {
		date: string;
		msg: string;
	}[];
};
