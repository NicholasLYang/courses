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
import { delay } from "./utils";

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
  schools: { [s: string]: ISchool };
  courses: { [s: string]: ICourse[] };
  error: string | undefined;
}

const initialState: CoreState = {
  loadingState: LoadingState.Loading,
  schools: {},
  courses: {},
  error: undefined
};

interface GetSubjectPayload {
  subjects: { [s: string]: ISubject };
  code: string;
}

interface GetCoursesPayload {
  courses: ICourse[];
  schoolCode: string;
  subjectCode: string;
}

const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    getSchoolsSuccess(state, action: PayloadAction<{ [s: string]: ISchool }>) {
      state.loadingState = LoadingState.Success;
      state.schools = action.payload;
    },
    getSchoolsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    getSubjectsSuccess(state, action: PayloadAction<GetSubjectPayload>) {
      state.schools[action.payload.code].subjects = action.payload.subjects;
      state.loadingState = LoadingState.Success;
    },
    getSubjectsFailure(state, action: PayloadAction<string>) {
      state.loadingState = LoadingState.Failed;
      state.error = action.payload;
    },
    getCoursesSuccess(state, action: PayloadAction<GetCoursesPayload>) {
      const { schoolCode, subjectCode, courses } = action.payload;
      state.courses[`${subjectCode}-${schoolCode}`] = courses;
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
    // Just to mess with Albert
    await delay(500 + Math.random() * 500);
    try {
      const res = await fetch(`${API_URL}/schools`);
      const payload = await res.json();
      const schools: { [s: string]: ISchool } = {};
      for (const school of payload) {
        schools[school.code] = {
          name: school.name,
          code: school.code,
          subjects: {}
        };
      }
      dispatch(getSchoolsSuccess(schools));
    } catch (e) {
      dispatch(getSchoolsFailure(e.toString()));
    }
  } else {
    dispatch(finishLoading());
  }
};

export const getSubjects = (code: string): AppThunk => async (
  dispatch,
  getState
) => {
  const {
    core: { schools }
  } = getState();
  if (Object.entries(schools[code].subjects).length === 0) {
    try {
      dispatch(startLoading());
      // Hehe
      await delay(500 + Math.random() * 500);
      const res = await fetch(`${API_URL}/subjects?school=${code}`);
      const payload = await res.json();
      const subjects: { [s: string]: ISubject } = {};
      for (const subject of payload) {
        subjects[subject.subject] = { name: subject.name };
      }
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
  if (courses[`${subjectCode}-${schoolCode}`] === undefined) {
    try {
      dispatch(startLoading());
      const res = await fetch(
        `${API_URL}/${year}/${season}/${schoolCode}/${subjectCode}`
      );
      const courses = await res.json();
      const payload = { subjectCode, schoolCode, courses };
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
