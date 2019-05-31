// @flow
// type definitions. This should be safe to import everywhere
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import BottomProgress from './views/Mapper/BottomProgress';

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

// projects all have the same structure
export type ProjectType = {
    contributors: number,
    created: number,
    image: string,
    isFeatured: boolean,
    lookFor: string,
    name: string,
    projectDetails: string,
    projectId: string,
    projectType: ?number,
    progress: number,
    state: number,
    tileServer: {
        apiKey: string,
        name: string,
        url: string,
    },
};

export type ProjectMapType = { [project_id: string]: ProjectType };

// tasks have a different shape for each project type
// we define a type for each to avoid all sorts of optional
// attributes in the objects, which make typing a bit useless

// used only by projects of type LEGACY_PROJECT (type 1)
export type BuiltAreaTaskType = {
    groupId: number,
    projectId: string,
    taskId: string,
    taskX: number,
    taskY: number,
    url: string,
}

// used only by projects of type BUILDING_FOOTPRINTS (type 2)
export type BuildingFootprintTaskType = {
    groupId: number,
    geojson: { type: string, coordinates: { [number]: Polygon }},
    projectId: string,
    taskId: string,
}

// used only by projects of type CHANGE_DETECTION
export type ChangeDetectionTaskType = {
    groupId: number,
    projectId: string,
    taskId: string,
    taskX: number,
    taskY: number,
    urlA: string,
    urlB: string,
}

export type TaskType =
    | BuiltAreaTaskType
    | BuildingFootprintTaskType
    | ChangeDetectionTaskType

export type TaskMapType = { [task_id: string]: TaskType };

// groups also have a different task content for each project type

type GenericGroupType<T> = {
    groupId: number,
    neededCount: number,
    numberOfTasks: number,
    projectId: string,
    tasks: Array<T>,
    zoomLevel: number,
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
}

export type BuiltAreaGroupType = GenericGroupType<BuiltAreaTaskType>;
export type BuildingFootprintGroupType = GenericGroupType<BuildingFootprintTaskType>;
export type ChangeDetectionGroupType = GenericGroupType<ChangeDetectionTaskType>;

export type GroupType =
    | BuiltAreaGroupType
    | BuildingFootprintGroupType
    | ChangeDetectionGroupType

export type GroupMapType = { [group_id: string]: GroupType };

// results should all look the same

export type ResultType = {
    groupId: number,
    projectId: string,
    resultId: string,
    result: number,
}

export type ResultMapType = { [string]: ResultType };

// internal app types

export type Mapper = {
    closeTilePopup: () => void,
    openTilePopup: (any) => void,
    progress: BottomProgress,
    project: ProjectType,
}

// redux types

export type UIState = {
    welcomeCompleted: boolean,
};

export type State = {
    +firebase?: {},
    +results?: ResultMapType,
    +ui?: UIState,
};
