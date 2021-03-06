// @flow
// type definitions. This should be safe to import everywhere
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import BottomProgress from './common/BottomProgress';

// geographic types

export type Point = [number, number];

export type Polygon = Array<Point>;

export type BBOX = [number, number, number, number];

export type Tile = [number, number, number];

// dependencies types

export type NavigationProp = NavigationScreenProp<NavigationState>;

/*
 * types related to firebase data
 *
 * These type definitions should match the format seen
 * in the firebase database and the docs at
 * https://mapswipe-workers.readthedocs.io/en/dev/diagrams.html
 */

export type CategoriesType = {
    [cat_id: string]: {
        pre: string,
        post_correct: string,
        post_wrong: string,
    },
};

export type TileServerType = {
    apiKey: string,
    credits: string,
    name: string,
    url: string,
    wmtsLayerName: ?string,
};

// TODO: separate out a type for tutorial projects, which include a few more attributes
export type SingleImageryProjectType = {
    categories: ?CategoriesType,
    contributorCount: number,
    created: number,
    // example images shown on the first screen of the tutorial
    exampleImage1: string,
    exampleImage2: string,
    image: string,
    isFeatured: boolean,
    lookFor: string,
    maxTasksPerUser: ?number,
    name: string,
    projectDetails: string,
    projectId: string,
    // FIXME: we should use constants here, somehow flow is not happy with them
    projectType: 1 | 2 | 4,
    progress: number,
    status: string,
    tileServer: TileServerType,
    tileServerB: ?TileServerType,
    tutorialId: string,
    zoomLevel: number,
};

export type ChangeDetectionProjectType = {
    categories: ?CategoriesType,
    contributorCount: number,
    created: number,
    image: string,
    isFeatured: boolean,
    lookFor: string,
    maxTasksPerUser: ?number,
    name: string,
    projectDetails: string,
    projectId: string,
    projectType: 3,
    progress: number,
    status: string,
    tileServerA: TileServerType,
    tileServerB: TileServerType,
};

// projects all have the same structure
export type ProjectType = SingleImageryProjectType | ChangeDetectionProjectType;

export type ProjectMapType = { [project_id: string]: ProjectType };

// tasks have a different shape for each project type
// we define a type for each to avoid all sorts of optional
// attributes in the objects, which make typing a bit useless

// used only by projects of type LEGACY_PROJECT (type 1)
export type BuiltAreaTaskType = {
    groupId: string,
    projectId: string,
    referenceAnswer: ?number,
    screens: ?string, // only found in tutorial projects
    taskId: string,
    taskX: number,
    taskY: number,
    url: string,
    urlB: string,
};

// used only by projects of type BUILDING_FOOTPRINTS (type 2)
export type BuildingFootprintTaskType = {
    groupId: string,
    geojson: { type: string, coordinates: { [number]: Polygon } },
    projectId: string,
    taskId: string,
};

// used only by projects of type CHANGE_DETECTION
export type ChangeDetectionTaskType = {
    category: ?string,
    groupId: string,
    projectId: string,
    referenceAnswer: ?number,
    taskId: string,
    urlA: string,
    urlB: string,
};

export type TaskType =
    | BuiltAreaTaskType
    | BuildingFootprintTaskType
    | ChangeDetectionTaskType;

export type TaskMapType = { [task_id: string]: TaskType };

// groups also have a different task content for each project type

type GenericGroupType<T> = {
    groupId: string,
    neededCount: number,
    numberOfTasks: number,
    projectId: string,
    tasks: Array<T>,
    zoomLevel: number,
    xMax: number,
    xMin: number,
    yMax: number,
    yMin: number,
};

export type BuiltAreaGroupType = GenericGroupType<BuiltAreaTaskType>;
export type BuildingFootprintGroupType = GenericGroupType<BuildingFootprintTaskType>;
export type ChangeDetectionGroupType = GenericGroupType<ChangeDetectionTaskType>;

export type GroupType =
    | BuiltAreaGroupType
    | BuildingFootprintGroupType
    | ChangeDetectionGroupType;

export type GroupMapType = { [group_id: string]: GroupType };

// results should all look the same

export type ResultType = {
    groupId: string,
    projectId: string,
    resultId: string,
    result: number,
};

export type ResultMapType = { [string]: ResultType };

// user profiles
export type UserContributionsToProject = {
    groupContributionCount: number,
    taskContributionCount: number,
};

export type UserContributionsMap = {
    // string below is the projectId
    [string]: UserContributionsToProject,
};

export type UserProfile = {
    contributions: UserContributionsMap,
    projectContributionCount: number,
    taskContributionCount: number,
};

// internal app types

export type Mapper = {
    closeTilePopup: () => void,
    openTilePopup: (any) => void,
    progress: BottomProgress,
    project: ProjectType,
};

export type LanguageData = {
    code: string, // two letter code, like 'en', 'de', etc...
    name: string, // the name of the language in itself 'english', 'Français', 'Español'...
};

export type TranslationFunction = (string, ?Object) => string;

// redux types

export type UIState = {
    hasSeenTutorial: ?Array<boolean>,
    welcomeCompleted: boolean,
};

export type State = {
    +firebase?: {},
    +results?: ResultMapType,
    +ui?: UIState,
};

// each step of the tutorial must have the following shape

export type TutorialContent = {
    title: string,
    description: string,
    icon: string,
};
