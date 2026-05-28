import { createSlice } from "@reduxjs/toolkit"

interface AssignmentState {
  assignments: any[]
  currentAssignment: any | null
  loading: boolean
}

const initialState: AssignmentState = {
  assignments: [],
  currentAssignment: null,
  loading: false,
}

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload
    },

    addAssignment: (state, action) => {
      state.assignments.unshift(action.payload)
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setCurrentAssignment: (state, action) => {
      state.currentAssignment = action.payload
    },
    updateAssignmentStatus: (
  state,
  action
) => {
  const {
    assignmentId,
    status,
    assignment,
  } = action.payload

  const index =
    state.assignments.findIndex(
      (a: any) =>
        a._id === assignmentId
    )

  if (index !== -1) {
    state.assignments[
      index
    ].status = status

    if (assignment) {
      state.assignments[
        index
      ] = assignment
    }
  }
},
  },
})

export const {
  setAssignments,
  addAssignment,
  setLoading,
  setCurrentAssignment,
  updateAssignmentStatus,
} = assignmentSlice.actions

export default assignmentSlice.reducer