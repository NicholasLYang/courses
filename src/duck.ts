/*
Assigning types to values
*/
import {
  configureStore,
  combineReducers,
  Action,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { ICourse, ISchool, ISubject, LoadingState } from "./types";
import { API_URL } from "./constants";

// Hot Loading setup
//@ts-ignore
if (process.env.NODE_ENV === "development" && module.hot) {
  //@ts-ignore
  module.hot.accept("./duck", () => {
    const newRootReducer = require("./duck").rootReducer;
    store.replaceReducer(newRootReducer);
  });
}

interface CoreState {
  loadingState: LoadingState;
  schools: { [s: string]: {[s: string] : string} };
  courses: { [s: string]: { [code: string]: ICourse } };
  subjects: { [s: string]: { [s: string]: {[s: string] : string} } };
  error: string | undefined;
}

const initialState: CoreState = {
  loadingState: LoadingState.Loading,
  schools: {},
  courses: {},
  subjects: {},
  error: undefined
};

interface GetSubjectPayload {
  subjects: { [schoolCode: string]: { [subjectCode: string]: {[s : string] : string} } };
  code: string;
}

interface GetCoursesPayload {
  courses: { [s: string]: ICourse };
  year: string;
  season: string;
  schoolCode: string;
  subjectCode: string;
}

const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    getSchoolsSuccess(state, action: PayloadAction<{ [s: string]: {[s: string] : string} }>) {
      state.loadingState = LoadingState.Success;
      state.schools = action.payload;
    },
    getSchoolsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getSubjectsSuccess(state, action: PayloadAction<GetSubjectPayload>) {
      state.subjects = action.payload.subjects;
      state.loadingState = LoadingState.Success;
    },
    getSubjectsFailure(state, action: PayloadAction<string>) {
      state.loadingState = LoadingState.Failed;
      state.error = action.payload;
    },
    getCoursesSuccess(state, action: PayloadAction<GetCoursesPayload>) {
      const { year, season, schoolCode, subjectCode, courses } = action.payload;
      state.courses[`${year}-${season}-${subjectCode}-${schoolCode}`] = courses;
      state.loadingState = LoadingState.Success;
    },
    getCoursesFailure(state, action: PayloadAction<string>) {
      state.loadingState = LoadingState.Failed;
      state.error = action.payload;
    },
    startLoading(state) {
      state.loadingState = LoadingState.Loading;
    },
    finishLoading(state) {
      state.loadingState = LoadingState.Success;
    }
  }
});

const {
  getSchoolsSuccess,
  getSchoolsFailure,
  getSubjectsSuccess,
  getSubjectsFailure,
  getCoursesSuccess,
  getCoursesFailure,
  startLoading,
  finishLoading
} = coreSlice.actions;

export const getSchools = (): AppThunk => async (dispatch, getState) => {
  const {
    core: { schools }
  } = getState();
  if (Object.entries(schools).length === 0) {
    try {
      const res = await fetch(`${API_URL}/schools`);
      const schools = await res.json();
      dispatch(getSchoolsSuccess(schools));
    } catch (e) {
      dispatch(getSchoolsFailure(e.toString()));
    }
  } else {
    dispatch(finishLoading());
  }
};

export const getSubjects = (code: string | undefined): AppThunk => async (
  dispatch,
  getState
) => {
  if (code === undefined) {
    dispatch(getSubjectsFailure("Did not provide valid school code"));
    return;
  }
  const {
    core: { subjects }
  } = getState();
  if (!(code in subjects)) {
    try {
      dispatch(startLoading());
      const res = await fetch(`${API_URL}/subjects?school=${code}`);
      const subjects = await res.json();
      dispatch(getSubjectsSuccess({ subjects, code }));
    } catch (err) {
      dispatch(getSubjectsFailure(err.toString()));
    }
  } else {
    dispatch(finishLoading());
  }
};

export const getCourses = (
  year: string,
  season: string,
  schoolCode: string,
  subjectCode: string
): AppThunk => async (dispatch, getState) => {
  const {
    core: { courses }
  } = getState();
  if (courses[`${year}-${season}-${subjectCode}-${schoolCode}`] === undefined) {
    try {
      dispatch(startLoading());
      const res = await fetch(
        `${API_URL}/${year}/${season}/${schoolCode}/${subjectCode}`
      );
      const requestPayload = await res.json();
      const courses: { [s: string]: ICourse } = {};
      for (const course of requestPayload) {
        courses[course.deptCourseId] = course;
      }
      const payload = { subjectCode, schoolCode, year, season, courses };
      dispatch(getCoursesSuccess(payload));
    } catch (err) {
      dispatch(getCoursesFailure(err.toString()));
    }
  }
};

export { finishLoading };

export const rootReducer = combineReducers({
  core: coreSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer
});
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
