import {
  Action,
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { ICourse, LoadingState } from "./types";
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

interface Entity<T> {
  loadingState: LoadingState;
  entities: T;
  error: string | undefined;
}

interface CoreState {
  schools: Entity<{ [schoolCode: string]: { [s: string]: string } }>;
  courses: Entity<{
    [subjectCode: string]: { [deptCourseId: string]: ICourse };
  }>;
  subjects: Entity<{ [s: string]: { [s: string]: { [s: string]: string } } }>;
}

const initialEntity = {
  loadingState: LoadingState.Loading,
  entities: {},
  error: undefined
};

const initialState: CoreState = {
  schools: { ...initialEntity },
  courses: { ...initialEntity },
  subjects: { ...initialEntity }
};

interface GetSubjectPayload {
  subjects: {
    [schoolCode: string]: { [subjectCode: string]: { [s: string]: string } };
  };
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
    getSchoolsSuccess(
      state,
      action: PayloadAction<{ [s: string]: { [s: string]: string } }>
    ) {
      console.log("ACTION");
      console.log(action);
      state.schools.loadingState = LoadingState.Success;
      state.schools.entities = action.payload;
    },
    getSchoolsFailure(state, action: PayloadAction<string>) {
      state.schools.error = action.payload;
    },
    getSubjectsPending(state) {
      state.subjects.loadingState = LoadingState.Loading;
    },
    getSubjectsSuccess(state, action: PayloadAction<GetSubjectPayload>) {
      state.subjects.entities = action.payload.subjects;
      state.subjects.loadingState = LoadingState.Success;
    },
    getSubjectsFailure(state, action: PayloadAction<string>) {
      state.subjects.loadingState = LoadingState.Failed;
      state.subjects.error = action.payload;
    },
    getCoursesPending(state) {
      state.courses.loadingState = LoadingState.Loading;
    },
    getCoursesSuccess(state, action: PayloadAction<GetCoursesPayload>) {
      const { year, season, schoolCode, subjectCode, courses } = action.payload;
      state.courses.entities[
        `${year}-${season}-${subjectCode}-${schoolCode}`
      ] = courses;
      state.courses.loadingState = LoadingState.Success;
    },
    getCoursesFailure(state, action: PayloadAction<string>) {
      state.courses.loadingState = LoadingState.Failed;
      state.courses.error = action.payload;
    },
    startLoading(
      state,
      action: PayloadAction<"courses" | "subjects" | "schools">
    ) {
      state[action.payload].loadingState = LoadingState.Loading;
    },
    finishLoading(
      state,
      action: PayloadAction<"courses" | "subjects" | "schools">
    ) {
      state[action.payload].loadingState = LoadingState.Success;
    }
  }
});

const {
  getSchoolsSuccess,
  getSchoolsFailure,
  getSubjectsPending,
  getSubjectsSuccess,
  getSubjectsFailure,
  getCoursesPending,
  getCoursesSuccess,
  getCoursesFailure,
  finishLoading
} = coreSlice.actions;

export const getSchools = (): AppThunk => async (dispatch, getState) => {
  const {
    core: { schools }
  } = getState();
  if (Object.entries(schools.entities).length === 0) {
    try {
      const res = await fetch(`${API_URL}/schools`);
      const schools = await res.json();
      dispatch(getSchoolsSuccess(schools));
    } catch (e) {
      dispatch(getSchoolsFailure(e.toString()));
    }
  } else {
    dispatch(finishLoading("schools"));
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
  if (!(code in subjects.entities)) {
    try {
      dispatch(getSubjectsPending());
      const res = await fetch(`${API_URL}/subjects?school=${code}`);
      const subjects = await res.json();
      dispatch(getSubjectsSuccess({ subjects, code }));
    } catch (err) {
      dispatch(getSubjectsFailure(err.toString()));
    }
  } else {
    dispatch(finishLoading("subjects"));
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
  if (
    courses.entities[`${year}-${season}-${subjectCode}-${schoolCode}`] ===
    undefined
  ) {
    try {
      dispatch(getCoursesPending());
      const res = await fetch(
        `${API_URL}/${year}/${season}/${schoolCode}/${subjectCode}?full=true`
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
