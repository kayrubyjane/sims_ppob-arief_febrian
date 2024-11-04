import {
     UPDATE_PROFILE,
     UPDATE_PROFILE_SUCCESS,
     UPDATE_PROFILE_FAILURE,
     UPDATE_PROFILE_IMAGE,
     UPDATE_PROFILE_IMAGE_SUCCESS,
     UPDATE_PROFILE_IMAGE_FAILURE,
     LOGOUT,
     LOGIN,
     LOGIN_SUCCESS,
     LOGIN_FAILURE,
     GET_PROFILE,
     GET_PROFILE_SUCCESS,
     GET_PROFILE_FAILURE,
     FETCH_BALANCE,
     FETCH_BALANCE_SUCCESS,
     FETCH_BALANCE_FAILURE,
     REGISTER,
     REGISTER_SUCCESS,
     REGISTER_FAILURE,
} from "./../types/actionTypes";

const initialState = {
     token: localStorage.getItem("token") || null,
     profile: {
          namaDepan: "",
          namaBelakang: "",
          email: "",
          profilePicture: "",
     },
     saldo: 0,
     loading: false,
     error: null,
     success: null,
};

const authReducer = (state = initialState, action) => {
     switch (action.type) {
          case LOGIN:
          case GET_PROFILE:
          case FETCH_BALANCE:
          case UPDATE_PROFILE:
               return { ...state, loading: true, error: null, success: null };
          case UPDATE_PROFILE_IMAGE:
               return { ...state, loading: true, error: null };

          case LOGIN_SUCCESS:
               localStorage.setItem("token", action.payload.token)
               return {
                    ...state,
                    loading: false,
                    token: action.payload.token,
                    profile: action.payload.profile,
                    error: null,
               };

          case LOGIN_FAILURE:
               return { ...state, loading: false, error: action.error };

          case REGISTER:
               return { ...state, loading: true, error: null, success: null };

          case REGISTER_SUCCESS:
               return { ...state, loading: false, success: action.payload, error: null };

          case REGISTER_FAILURE:
               return { ...state, loading: false, error: action.error };

          case GET_PROFILE_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    profile: {
                         email: action.payload.email,
                         namaDepan: action.payload.first_name,
                         namaBelakang: action.payload.last_name,
                         profilePicture: action.payload.profile_image,
                    },
                    token: action.payload.token || state.token,
                    error: null,
               };

          case GET_PROFILE_FAILURE:
               return { ...state, loading: false, error: action.error };

          case FETCH_BALANCE_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    saldo: action.payload,
                    error: null,
               };

          case FETCH_BALANCE_FAILURE:
               return { ...state, loading: false, error: action.error };


          case UPDATE_PROFILE_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    profile: {
                         ...state.profile,
                         namaDepan: action.payload.first_name,
                         namaBelakang: action.payload.last_name,
                    },
                    success: "Profil berhasil diperbarui",
                    error: null,
               };

          case UPDATE_PROFILE_FAILURE:
               return { ...state, loading: false, error: action.error, success: null };

          case UPDATE_PROFILE_IMAGE_SUCCESS:
               return {
                    ...state,
                    loading: false,
                    profile: {
                         ...state.profile,
                         profilePicture: action.payload.profilePicture,
                    },
                    error: null,
               };

          case UPDATE_PROFILE_IMAGE_FAILURE:
               return { ...state, loading: false, error: action.error };

          case LOGOUT:
               localStorage.removeItem("token");
               return { ...state, token: null };

          default:
               return state;
     }
};

export default authReducer;
